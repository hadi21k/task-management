import React, { useState } from "react";
import WorkspaceMenu from "../home/WorkspaceMenu";
import Toggle from "../ui/Toggle";
import { XMarkIcon, CheckIcon } from "@heroicons/react/20/solid";

const Task = ({ task, workspace, setWorkspace }) => {
  const [editMode, setEditMode] = useState(false);
  const [newTask, setNewTask] = useState(task);

  const submitEdit = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/workspaces/tasks/${task._id}`,
        {
          method: "PUT",
          credentials: "include",
          body: JSON.stringify({
            title: newTask.title,
            description: newTask.description,
            dueDate: newTask.dueDate,
            completed: newTask.completed,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (res.status !== 200) throw Error(data.error);
      setEditMode(false);
      console.log(data);
    } catch (err) {
      console.log(err.message);
      return;
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/workspaces/tasks/${task._id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (res.status !== 200) throw Error(data.error);
      const filterTasks = workspace.tasks.filter((t) => t._id !== task._id);

      setWorkspace({ ...workspace, tasks: filterTasks });
    } catch (err) {
      console.log(err.message);
      return;
    }
  };
  return (
    <div className="mb-4 flex justify-between items-center p-4 bg-gray-800 rounded-lg">
      <div className="space-y-2">
        {editMode ? (
          <>
            <input
              type="text"
              name="name"
              id="name"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              className="shadow-sm text-black block w-full sm:text-sm rounded-md outline-none"
              placeholder="Name"
            />
            <input
              type="text"
              name="name"
              id="name"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              className="shadow-sm text-black block w-full sm:text-sm rounded-md outline-none"
              placeholder="Name"
            />
          </>
        ) : (
          <>
            <h3 className="text-lg font-semibold">{task?.title}</h3>
            <p className="text-gray-300">{task?.description}</p>
          </>
        )}
      </div>
      <div>
        {editMode ? (
          <div className="flex items-center">
            <CheckIcon
              onClick={submitEdit}
              className="h-5 w-5 cursor-pointer mr-2"
              aria-hidden="true"
            />

            <XMarkIcon
              onClick={() => setEditMode(false)}
              className="h-5 w-5 cursor-pointer"
              aria-hidden="true"
            />
          </div>
        ) : (
          <div className="flex items-center space-x-5">
            <Toggle
              task={task}
              setNewTask={setNewTask}
              newTask={newTask}
              submitEdit={submitEdit}
            />
            <WorkspaceMenu
              setEditMode={setEditMode}
              handleDeleteTask={handleDelete}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Task;
