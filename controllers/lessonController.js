const Lesson = require('../models/Lesson');

exports.index = async (req, res) => {
  const lessons = await Lesson.find().sort({ createdAt: -1 });
  res.render('lessons/index', { lessons });
};

exports.newForm = (req, res) => {
  res.render('lessons/new', { lesson: {} });
};

exports.create = async (req, res) => {
  try {
    const lesson = new Lesson(req.body);
    await lesson.save();
    req.flash('success_msg', 'Lesson created successfully');
    res.redirect('/lessons');
  } catch (err) {
    req.flash('error_msg', 'Error creating lesson');
    res.redirect('/lessons/new');
  }
};

exports.show = async (req, res) => {
  const lesson = await Lesson.findById(req.params.id);
  if (!lesson) return res.redirect('/lessons');
  res.render('lessons/show', { lesson });
};

exports.editForm = async (req, res) => {
  const lesson = await Lesson.findById(req.params.id);
  if (!lesson) return res.redirect('/lessons');
  res.render('lessons/edit', { lesson });
};

exports.update = async (req, res) => {
  try {
    await Lesson.findByIdAndUpdate(req.params.id, req.body);
    req.flash('success_msg', 'Lesson updated successfully');
    res.redirect('/lessons');
  } catch (err) {
    req.flash('error_msg', 'Error updating lesson');
    res.redirect(`/lessons/${req.params.id}/edit`);
  }
};

exports.delete = async (req, res) => {
  try {
    await Lesson.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Lesson deleted');
    res.redirect('/lessons');
  } catch (err) {
    req.flash('error_msg', 'Error deleting lesson');
    res.redirect('/lessons');
  }
};
