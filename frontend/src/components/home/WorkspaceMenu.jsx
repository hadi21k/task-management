import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";

export default function WorkspaceMenu({
  setEditMode,
  workspace,
  handleDeleteTask,
}) {
  const handleEdit = () => {
    setEditMode(true);
  };

  const handleDelete = () => {
    try {
      const deleteWorkspace = async () => {
        await fetch(
          `${import.meta.env.VITE_API_URL}/workspaces/${workspace._id}`,
          {
            method: "DELETE",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      };
      deleteWorkspace();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <EllipsisVerticalIcon
            className="h-5 w-5 text-violet-200 hover:text-violet-100"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-50 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleEdit}
                  className={`${
                    active ? "bg-[#ffce45] text-black" : "text-gray-600"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <PencilIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                  Edit
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleDeleteTask || handleDelete}
                  className={`${
                    active ? "bg-[#ffce45] text-black" : "text-gray-600"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <TrashIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                  Delete
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
