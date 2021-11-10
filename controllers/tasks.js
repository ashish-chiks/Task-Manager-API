const model = require("../db/model");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await model.find({});
    res.status(200);
    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getTask = async (req, res) => {
  try {
    const task = await model.findOne({ _id: req.params.id });
    if (task) res.status(200).json({ task });
    else res.status(404).json({ msg: "no task found with this id" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createTask = async (req, res) => {
  try {
    // only takes key value pair from req.body which are defined in schema
    const task = await model.create(req.body);
    res.status(201);
    res.json({ task });
  } catch (error) {
    res.status(500).json({ msg: error.errors.name.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await model.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true, useFindAndModify: false }
    );
    if (task) res.status(200).json(task);
    else res.status(404).json({ msg: "no task found with this id" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await model.findOneAndDelete(
      { _id: req.params.id },
      { useFindAndModify: false }
    );
    if (task) res.status(200).send();
    else res.status(404).json({ msg: "no task found with this id" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = { getAllTasks, getTask, createTask, updateTask, deleteTask };
