const mongoose = require('mongoose');

const PracticeLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  durationMinutes: { type: Number, required: true },
  focus: { type: String, required: true },
  notes: { type: String }
});

module.exports = mongoose.model('PracticeLog', PracticeLogSchema);
