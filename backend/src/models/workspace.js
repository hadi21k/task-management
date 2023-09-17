import { model, Schema } from "mongoose";

const workspaceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  tasks: [
    {
      title: {
        type: String,
        required: true,
      },
      description: String,
      dueDate: Date,
      completed: {
        type: Boolean,
        default: false,
      },
    },
  ],
  workspace_type: {
    type: String,
    enum: ["personal", "team"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

const Workspace = model("Workspace", workspaceSchema);

export default Workspace;
