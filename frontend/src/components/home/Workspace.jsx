import React, { useState } from "react";
import { Link } from "react-router-dom";
import WorkspaceMenu from "./WorkspaceMenu";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";

const Workspace = ({ workspace }) => {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(workspace.name);

  const submitEdit = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/workspaces/${workspace._id}`,
        {
          method: "PUT",
          credentials: "include",
          body: JSON.stringify({
            name: newTitle,
            description: workspace.description,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (res.status !== 200) throw Error(data.error);
      setEditMode(false);
    } catch (err) {
      console.log(err.message);
      return;
    }
  };

  return (
    <div className="group block bg-black border px-3 py-4 rounded-lg text-white h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-lg hover:underline hover:underline-offset-4">
          {editMode ? (
            <input
              type="text"
              name="name"
              id="name"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="shadow-sm text-black block w-full sm:text-sm rounded-md outline-none"
              placeholder="Name"
            />
          ) : (
            <Link to={`/workspace/${workspace._id}`}>{workspace.name}</Link>
          )}
        </h1>
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
          <WorkspaceMenu setEditMode={setEditMode} workspace={workspace} />
        )}
      </div>

      <p className="mt-1.5 text-xs">{workspace.description}</p>
    </div>
  );
};

export default Workspace;
