import { CheckIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function Toggle({ task }) {
  const [enabled, setEnabled] = useState(task.completed);

  const toggleCompleted = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/workspaces/tasks/${task._id}`,
        {
          method: "PUT",
          credentials: "include",
          body: JSON.stringify({
            completed: !task.completed,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (res.status !== 200) throw Error(data.error);
      setEnabled(!enabled);
    } catch (err) {
      console.log(err.message);
      return;
    }
  };
  return (
    <div
      onClick={toggleCompleted}
      className="h-[40px] bg-[#ffce45] text-black rounded-lg grid place-items-center w-[40px]"
    >
      {enabled && <CheckIcon className="h-7 w-7" />}
    </div>
  );
}
