const mongoose = require("mongoose");

//schema

const userSchema = mongoose.Schema({
  // userId: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ["student", "tutor"],
  }, //student or teacher
  language: { type: String, required: true }, //student or teacher
  subjectExpertise: { type: [String], required: false }, //only for teacher othe wise null
  classGrade: { type: String, required: false }, //only for student other wise null

  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

//model

const User = mongoose.model("user", userSchema);

module.exports = User;
