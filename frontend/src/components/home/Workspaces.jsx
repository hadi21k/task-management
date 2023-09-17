import { useEffect, useState } from "react";
import Workspace from "./Workspace";
import CreateModal from "./CreateModal";

const Workspaces = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const getWorkspaces = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/workspaces`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        setWorkspaces(data);
      };
      getWorkspaces();
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, [workspaces]);

  

  return (
    <div>
      <div className="container mx-auto px-2">
        <div className="flex items-center justify-between">
          <h1>Workspaces</h1>
          <CreateModal workspaces={workspaces} setWorkspaces={setWorkspaces} />
        </div>
        <div className="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          {loading ? (
            <div>Loading...</div>
          ) : (
            workspaces?.map((workspace) => (
              <Workspace key={workspace._id} workspace={workspace} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Workspaces;
