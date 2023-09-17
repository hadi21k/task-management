import { Router } from "express";
import {
  createWorkspace,
  deleteWorkspace,
  editWorkspace,
  getWorkspace,
  getWorkspaces,
} from "../controllers/workspaceControllers.js";
import {
  createTask,
  deleteTask,
  editTask,
} from "../controllers/taskControllers.js";

const router = Router();

router.route("/").get(getWorkspaces).post(createWorkspace);

router
  .route("/:id")
  .get(getWorkspace)
  .put(editWorkspace)
  .delete(deleteWorkspace);

router.route("/tasks").post(createTask);

router.route("/tasks/:taskId").delete(deleteTask).put(editTask);

export default router;
