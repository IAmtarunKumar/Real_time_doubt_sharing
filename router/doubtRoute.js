const express = require("express");
const Doubt = require("../model/doubtRequest");
const verifyToken = require("../config/middleware/verifyToken");

const route = express.Router();

// Show all doubt history of login user
route.get("/doubtHistory", verifyToken, async (req, res) => {
  try {
    console.log("email", req.user.foundUser.email);
    const userDoubts = await Doubt.find({
      studentEmail: req.user.foundUser.email,
    }).sort({ timestamp: -1 });
    return res.status(200).send(userDoubts);
  } catch (error) {
    return res.status(500).send("Internal Server Error.");
  }
});

// Get all students doubt
route.get("/allUserDoubt", async (req, res) => {
  try {
    // const email = req.user.foundUser.email;
    const allDoubts = await Doubt.find();
    if (!allDoubts || allDoubts.length === 0) {
      return res.status(404).send("No doubts were found");
    }
    return res.status(200).send(allDoubts);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error.message}`);
  }
});

// Create a Doubt
route.post("/create", verifyToken, async (req, res) => {
  const {
    studentName,
    studentEmail,
    doubtSubject,
    classGrade,
    language,
    tutorEmail,
    status,
  } = req.body;
  try {
    const currentTime = Date.now();

    const email = req.user.foundUser.email;
    const name = req.user.foundUser.name;
    console.log(email, name);
    const newDoubt = new Doubt({
      studentEmail: email,
      studentName: name,
      doubtSubject,
      classGrade,
      status,
      timestamp: currentTime,
      language,
      tutorEmail,
    });
    await newDoubt.save();
    res.status(201).json("Doubt posted successfully");
  } catch (error) {
    res.status(500).send(`Internal Server Error: ${error.message}`);
  }
});

// Update Doubt
route.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;

  try {
    const updatedDoubt = await Doubt.findByIdAndUpdate(id, payload, {
      new: true,
    });
    if (!updatedDoubt) {
      return res.status(404).send("Doubt not found");
    }
    return res.status(200).send("Doubt updated successfully");
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error.message}`);
  }
});

// Delete doubt
route.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedDoubt = await Doubt.findByIdAndRemove(id);
    if (!deletedDoubt) {
      return res.status(404).send("Doubt not found");
    }
    return res.status(200).send("Doubt deleted successfully");
  } catch (error) {
    console.error("Error deleting a doubt:", error.message);
    return res.status(500).send(`Internal Server Error: ${error.message}`);
  }
});
module.exports = route;
