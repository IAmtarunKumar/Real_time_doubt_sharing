const express = require("express");
const TutorAvailability = require("../model/tutorAvailability");
const cron = require("node-cron");
const verifyToken = require("../config/middleware/verifyToken");

const route = express.Router();

// Polling Function [its update timeStamp every 3 second by call this api by frontend]

route.get("/lastPingTimeUpdate", verifyToken, async (req, res) => {
  try {
    const tutorEmail = req.user.foundUser.email;

    const currentTime = Date.now();
    await TutorAvailability.updateMany(
      { tutorEmail: tutorEmail },
      { $set: { lastPingTime: currentTime } }
    );

    return res.status(200).send("Successful updated last ping time of tutor");
  } catch (error) {
    return res.status(500).send(`Internal Server Error ${error.message}`);

  }
});

// CRON job to count Real-time online tutor
cron.schedule("* * * * * *", async () => {
  try {
    // const currentTime = Date.now();
    const onlineTutors = await TutorAvailability.find({
      lastPingTime: { $gte: Date.now() - 3000 },
    });

    console.log(`Real-time available tutors: ${onlineTutors.length}`);
  } catch (error) {
    console.error("Error counting online tutors:", error);
  }
});

module.exports = route;
