const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  picture: String,
  password: String,
  googleAuth: { type: Boolean, default: false },
  email_verified: { type: Boolean, default: false },
  accessToken: String,
  attendance: [{ type: mongoose.Schema.Types.ObjectId, ref: 'attendance' }],
});

const studentModel = mongoose.model('student', studentSchema);

module.exports = studentModel;
