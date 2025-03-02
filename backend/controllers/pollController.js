const Poll = require('../models/pollModel');
const PollOption = require('../models/pollOptionModel');
const PollVote = require('../models/pollVoteModel');
const User = require('../models/User'); // Assuming you have a User model

exports.createPoll = async (req, res) => {
  const { title, description, question, options } = req.body;
  try {
    const poll = await Poll.create({ title, description, question });
    const pollOptions = options.map(option => ({ option_text: option, poll_id: poll.id }));
    await PollOption.bulkCreate(pollOptions);
    res.status(201).json({ message: 'Poll created successfully', poll });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPolls = async (req, res) => {
  try {
    const polls = await Poll.findAll({ include: { model: PollOption, as: 'options' } });
    res.json(polls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPollById = async (req, res) => {
  const { id } = req.params;
  try {
    const poll = await Poll.findByPk(id, { include: { model: PollOption, as: 'options' } });
    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }
    res.json(poll);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePoll = async (req, res) => {
  const { id } = req.params;
  const { title, description, question, options } = req.body;
  try {
    const poll = await Poll.findByPk(id);
    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }
    poll.title = title;
    poll.description = description;
    poll.question = question;
    await poll.save();
    await PollOption.destroy({ where: { poll_id: id } });
    const pollOptions = options.map(option => ({ poll_id: id, option_text: option }));
    await PollOption.bulkCreate(pollOptions);
    res.json({ message: 'Poll updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePoll = async (req, res) => {
  const { id } = req.params;
  try {
    const poll = await Poll.findByPk(id);
    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }
    await poll.destroy();
    res.json({ message: 'Poll deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.votePoll = async (req, res) => {
  const { id } = req.params;
  const { optionId } = req.body;
  try {
    const pollOption = await PollOption.findByPk(optionId);
    if (!pollOption || pollOption.poll_id !== parseInt(id, 10)) {
      return res.status(404).json({ message: 'Poll option not found' });
    }
    await PollVote.create({ poll_option_id: optionId, user_id: req.user.userId });
    res.json({ message: 'Vote recorded successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};