import Workspace from "../models/workspace.js";

export const createTask = async (req, res) => {
  const { title, description, dueDate, completed } = req.body;
  const { workspaceId } = req.body;

  if (!title || !description || !dueDate) {
    return res.status(400).json({
      message: "Error",
      error: "Missing required fields",
    });
  }

  try {
    const workspace = await Workspace.findByIdAndUpdate(
      workspaceId,
      {
        $push: {
          tasks: {
            title,
            description,
            dueDate,
            completed,
          },
        },
      },
      { new: true }
    ).select("-__v");

    res.status(201).json({ message: "Task created", workspace });
  } catch (error) {
    res.status(500).json({
      message: "Error",
      error: error.message,
    });
  }
};

export const editTask = async (req, res) => {
  const { title, description, dueDate, completed } = req.body;

  try {
    const workspace = await Workspace.findOneAndUpdate(
      {
        "tasks._id": req.params.taskId,
      },
      {
        $set: {
          "tasks.$.title": title,
          "tasks.$.description": description,
          "tasks.$.dueDate": dueDate,
          "tasks.$.completed": completed,
        },
      },
      { new: true }
    ).select("-__v");

    res.status(200).json({ message: "Task updated", workspace });
  } catch (error) {
    res.status(500).json({
      message: "Error",
      error: error.message,
    });
  }
};

export const deleteTask = async (req, res) => {
  const taskId = req.params.taskId;
  try {
    const workspace = await Workspace.findOneAndUpdate(
      {
        "tasks._id": req.params.taskId,
      },
      {
        $pull: {
          tasks: {
            _id: taskId,
          },
        },
      }
    ).select("-__v");

    if (!workspace) {
      return res.status(404).json({
        message: "Error",
        error: "Task not found",
      });
    }

    res.status(200).json({ message: "Task deleted", workspace });
  } catch (error) {
    res.status(500).json({
      message: "Error",
      error: error.message,
    });
  }
};
