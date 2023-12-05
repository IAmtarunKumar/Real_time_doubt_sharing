const mongoose = require("mongoose");

//schema

const tutorAvailabilitySchema = mongoose.Schema({
  tutorName: { type: String, required: true },
  tutorEmail: { type: String, required: true },
  lastPingTime: { type: String, required: true },
  subjectExpertise: { type: [String], required: true },
  language: { type: String, required: true },
});

//model

const TutorAvailability = mongoose.model(
  "tutorAvailability",
  tutorAvailabilitySchema
);

module.exports = TutorAvailability;
