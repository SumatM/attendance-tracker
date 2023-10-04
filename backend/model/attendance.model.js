const mongoose = require("mongoose");

const attendanceSchema = mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  date: {
    type: Date,
    default: Date.now,
    unique: true,
  },
  present: {
    type: Boolean,
    require: true,
    default: true,
  },
});

const attendanceModel = mongoose.model("attendance", attendanceSchema);

module.exports = { attendanceModel };
