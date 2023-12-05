const mongoose = require("mongoose");

//schema

const doubtSchema = mongoose.Schema({
  studentEmail: { type: String, required: true },
  studentName: { type: String, required: true },

  studentEmail: { type: String, required: true },
  doubtSubject: { type: String, required: true },

  classGrade: { type: String, required: true },
  language: { type: String, required: true },
  tutorEmail: { type: String, default: null },
  status: { type: String, default: "pendding" },
  timestamp: { type: Date, default: Date.now },
});

//model

const Doubt = mongoose.model("doubt", doubtSchema);

module.exports = Doubt;
