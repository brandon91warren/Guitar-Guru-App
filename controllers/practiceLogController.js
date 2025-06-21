const PracticeLog = require('../models/PracticeLog');

exports.index = async (req, res) => {
  const logs = await PracticeLog.find({ userId: req.user._id }).sort({ date: -1 });
  res.render('logs/index', { logs });
};

exports.newForm = (req, res) => {
  res.render('logs/new', { log: null }); // pass null for create form
};

exports.create = async (req, res) => {
  try {
    const log = new PracticeLog({ ...req.body, userId: req.user._id });
    await log.save();
    req.flash('success_msg', 'Practice log created');
    res.redirect('/logs');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Failed to create log');
    res.redirect('/logs/new');
  }
};

exports.editForm = async (req, res) => {
  const log = await PracticeLog.findOne({ _id: req.params.id, userId: req.user._id });
  if (!log) return res.redirect('/logs');
  res.render('logs/new', { log }); // pass log for edit form
};

exports.update = async (req, res) => {
  try {
    await PracticeLog.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, req.body);
    req.flash('success_msg', 'Log updated');
    res.redirect('/logs');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Update failed');
    res.redirect(`/logs/${req.params.id}/edit`);
  }
};

exports.delete = async (req, res) => {
  try {
    await PracticeLog.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    req.flash('success_msg', 'Log deleted');
    res.redirect('/logs');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Delete failed');
    res.redirect('/logs');
  }
};
