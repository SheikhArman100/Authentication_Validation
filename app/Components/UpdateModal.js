"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";

const UpdateModal = () => {
  const { data: session, update } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState({
    modal: false,
    button: false,
  });
  const [updateName, setUpdateName] = useState(session.user.name);
  const [isUpdateFinished, setIsUpdateFinished] = useState(false);

  const handleModal = () => {
    setIsModalOpen(true);
    setIsLoading({ ...isLoading, modal: true });
    setTimeout(() => {
      setIsLoading({ ...isLoading, modal: false });
    }, 3000);
  };
  const handleSubmit = () => {
    setIsLoading({ ...isLoading, button: true });
    setTimeout(() => {
      setIsLoading({ ...isLoading, button: false });

      //update
      updateUsername();
      SessionUpdate();
      setIsUpdateFinished(true);
    }, 3000);
  };
  const updateUsername = async () => {
    const res = await fetch("http://localhost:3000/api/auth/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: session.user.email,
        username: updateName,
      }),
    });
    //

    const data = await res.json();
    console.log(data.message);
  };
  const SessionUpdate = async () => {
    await update({ name: updateName });
  };
  return (
    <>
      <button className="btn btn-success" onClick={handleModal}>
        Update Name
      </button>
      {isModalOpen ? (
        <div className="absolute h-screen w-screen bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
          {isLoading.modal ? (
            <span className="loading text-lg font-bold">Loading.......</span>
          ) : (
            <div className="px-8 py-10 bg-gray-700 relative rounded-lg">
              <button
                className="btn btn-circle absolute top-1 right-2 btn-ghost"
                onClick={() => {
                  setIsModalOpen(false)
                  setIsUpdateFinished(false)
                  if(!isUpdateFinished) setUpdateName(session.user.name)
                }}
              >
                <RxCross1 size={20} />
              </button>
              <h2 className="text-base text-white font-bold">
                Update your name
              </h2>
              {isUpdateFinished ? (
                <span>Your name updated successfully </span>
              ) : (
                <div className="flex items-center gap-x-2 mt-2">
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    value={updateName}
                    onChange={(e) => setUpdateName(e.target.value)}
                  />
                  <button
                    onClick={handleSubmit}
                    className={`btn  btn-md btn-success px-14 shadow-lg ${
                      isLoading.button ? "loading" : ""
                    }`}
                  >
                    {isLoading.button ? "Updating" : "Update!"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default UpdateModal;
