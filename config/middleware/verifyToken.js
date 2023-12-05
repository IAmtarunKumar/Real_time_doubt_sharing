const jwt = require("jsonwebtoken");
const BlacklistModel = require("../../model/blacklist.model");
const dotenv = require("dotenv");
dotenv.config();

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    // Check if the token is blacklisted
    const blackListCheck = await BlacklistModel.findOne({ token });

    if (blackListCheck) {
      return res.status(401).send({ msg: "Please log in first" });
    }

    // Verify the JWT token
    jwt.verify(token, process.env.jwtSecretKey, (err, decoded) => {
      if (err) {
        console.error(err);
        return res.status(401).send({ msg: "Invalid token" });
      } else {
        // Attach the decoded payload to the request object
        req.user = decoded;
        next();
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Internal Server Error ${error.message}`);
  }
};

module.exports = verifyToken;
