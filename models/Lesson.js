const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true
  },
  videoUrl: { type: String },
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  isFree: { type: Boolean, default: true }
});

module.exports = mongoose.model('Lesson', LessonSchema);
