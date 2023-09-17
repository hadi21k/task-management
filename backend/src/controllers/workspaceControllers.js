import Workspace from "../models/workspace.js";

export const getWorkspaces = async (req, res) => {
  try {
    const id = req.userId;

    const workspaces = await Workspace.find({
      user: id,
    })
      .populate({
        path: "user",
        select: "-password -email -__v",
      })
      .select("-__v")
      .select("-tasks.__v");

    res.status(200).json(workspaces);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export const getWorkspace = async (req, res) => {
  const workspaceId = req.params.id;
  try {
    const workspace = await Workspace.findOne({
      _id: workspaceId,
      user: req.userId,
    })
      .populate({
        path: "user",
        select: "-password -email -__v",
      })
      .select("-__v")
      .select("-tasks.__v");

    if (!workspace) {
      return res
        .status(404)
        .json({ message: "Error", error: "Workspace not found" });
    }

    return res.status(200).json(workspace);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export const createWorkspace = async (req, res) => {
  const { name, description, workspace_type } = req.body;
  try {
    const existingWorkspace = await Workspace.findOne({
      name,
      user: req.userId,
    });

    if (existingWorkspace) {
      return res
        .status(400)
        .json({ message: "Error", error: "Workspace already exists" });
    }

    const newWorkspace = await Workspace.create({
      name,
      description,
      workspace_type,
      user: req.userId,
      tasks: [],
    });

    res.status(201).json({ workspace: newWorkspace });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export const editWorkspace = async (req, res) => {
  try {
    const workspaceId = req.params.id;
    const editedSchema = {
      name: req.body.name,
      description: req.body.description,
      workspace_type: req.body.workspace_type,
      updatedAt: Date.now(),
    };

    const workspace = await Workspace.findByIdAndUpdate(
      workspaceId,
      editedSchema,
      { new: true }
    ).select("-__v");

    if (!workspace) {
      return res.status(404).json({
        message: "Error",
        error: "Workspace not found",
      });
    }

    res.status(200).json(workspace);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export const deleteWorkspace = async (req, res) => {
  try {
    const workspaceId = req.params.id;

    await Workspace.findByIdAndDelete(workspaceId);

    res.status(200).json({ message: "Workspace deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};
