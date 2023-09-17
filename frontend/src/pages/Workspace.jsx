import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/home/Navbar";
import TaskModal from "../components/workspace/TaskModal";
import Task from "../components/workspace/Task";

const Workspace = () => {
  const { workspaceId } = useParams();
  const [workspace, setWorkspace] = useState(null);
  const getWorkspace = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/workspaces/${workspaceId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      setWorkspace(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getWorkspace();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-[#111] py-3 text-white min-h-[calc(100vh-80px)]">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-4">{workspace?.name}</h1>
              <p className="text-gray-300">{workspace?.description}</p>
            </div>
            <TaskModal
              workspaceId={workspaceId}
              workspace={workspace}
              setWorkspace={setWorkspace}
            />
          </div>

          <div className="mt-4">
            {workspace?.tasks.map((task) => (
              <Task
                key={task?._id}
                task={task}
                workspace={workspace}
                setWorkspace={setWorkspace}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Workspace;
