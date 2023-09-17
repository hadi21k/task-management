import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function TaskModal({ workspaceId, workspace, setWorkspace }) {
  let [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const createTask = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/workspaces/tasks`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            title: e.target.name.value,
            description: e.target.description.value,
            dueDate: e.target.dueDate.value,
            workspaceId: workspaceId,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (res.status !== 201) throw Error(data.error);
      setIsOpen(false);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="inline-block shrink-0 rounded-md border border-[#ffce45] bg-[#ffce45] px-10 py-2 text-sm font-medium text-black transition hover:bg-transparent hover:text-[#ffce45] focus:outline-none focus:ring active:text-blue-500"
      >
        Create Task
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <form onSubmit={createTask}>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Create Workspace
                    </Dialog.Title>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="shadow-sm focus:ring-[#ffce45] focus:border-[#ffce45] block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Title"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <div className="mt-1">
                        <textarea
                          type="text"
                          name="description"
                          id="description"
                          className="shadow-sm focus:ring-[#ffce45] focus:border-[#ffce45] block w-full sm:text-sm border-gray-300 rounded-md resize-none"
                          placeholder="Description"
                        />
                      </div>
                    </div>

                    {/* due Data  */}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Due Date
                      </label>
                      <div className="mt-1">
                        <input
                          type="date"
                          name="dueDate"
                          id="dueDate"
                          className="shadow-sm focus:ring-[#ffce45] focus:border-[#ffce45] block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Due Date"
                        />
                      </div>
                    </div>
                    {error && <div className="text-red-500 mt-4">{error}</div>}
                    <div className="mt-4">
                      <button
                        type="submit"
                        className="inline-block shrink-0 rounded-md border border-[#ffce45] bg-[#ffce45] px-10 py-2 text-sm font-medium text-black transition hover:bg-transparent hover:text-[#ffce45] focus:outline-none focus:ring active:text-blue-500"
                      >
                        {loading ? "Loading..." : "Create Task"}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
