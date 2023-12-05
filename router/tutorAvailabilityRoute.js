const express = require("express");
const TutorAvailability = require("../model/tutorAvailability");
const cron = require("node-cron");
const verifyToken = require("../config/middleware/verifyToken");

const route = express.Router();

// Polling Function [its update timeStamp every 3 second by call this route by frontend]
route.get("/lastPingTimeUpdate", verifyToken, async (req, res) => {
  try {
    const tutorEmail = req.user.foundUser.email;

    const currentTime = Date.now();
    await TutorAvailability.updateMany(
      { tutorEmail: tutorEmail },
      { $set: { lastPingTime: currentTime } }
    );

    return res.status(200).send("Last ping time updated");
  } catch (error) {
    console.error("Error updating tutor availability:", error.message);
  }
});

// CRON Job to Count Real-time
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
