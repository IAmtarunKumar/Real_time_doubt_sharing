const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const BlacklistModel = require("../model/blacklist.model");
const User = require("../model/user");
const TutorAvailability = require("../model/tutorAvailability");
const verifyToken = require("../config/middleware/verifyToken");

const route = express.Router();

route.get("/", verifyToken, async (req, res) => {
  try {
    const email = req.user.foundUser.email;
    console.log("Email", email);
    const loginUserData = await User.findOne({ email });
    return res.status(200).send(loginUserData);
  } catch (error) {
    return res.status(500).send(`Internal server error ${error.message}`);
  }
});
route.get("/allUsers", verifyToken, async (req, res) => {
  try {
    const allUsers = await User.find();
    return res.status(200).send(allUsers);
  } catch (error) {
    return res.status(500).send(`Internal server error ${error.message}`);
  }
});

// Register
route.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      type,
      language,
      subjectExpertise,
      classGrade,
    } = req.body;

    console.log("tutor name", name);

    if (type === "tutor") {
      const currentTime = Date.now();
      const tutorAvailabilityData = new TutorAvailability({
        tutorName: name,
        tutorEmail: email,
        language,
        subjectExpertise,
        lastPingTime: currentTime,
      });

      await tutorAvailabilityData.save();
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      type,
      language,
      subjectExpertise,
      classGrade,
    });
    await user.save();

    return res.status(200).send("User register successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Internal Server Error ${error.message}`);
  }
});

// Login
route.post("/login", verifyToken, async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(401).send({ msg: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, foundUser.password);

    if (isPasswordValid) {
      const token = jwt.sign({ foundUser }, process.env.jwtSecretKey, {
        expiresIn: "3600000000",
      });

      return res.status(200).send({ msg: "Login successful", token });
    } else {
      return res.status(401).send({ msg: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Internal Server Error ${error.message}`);
  }
});

// Logout
route.post("/logout", async (req, res) => {
  try {
    const token = req.headers.authorization;

    const blacklistedToken = new BlacklistModel({ token });
    await blacklistedToken.save();

    return res.status(200).send({ msg: "Logout successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Internal Server Error ${error.message}`);
  }
});

module.exports = route;
