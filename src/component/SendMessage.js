import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getSingleData, updateMessage, writeMessage } from "../actions";
import { auth } from "../actions";

const SendMessage = () => {
  const [message, setMessage] = useState("");
  const { displayName, photoURL, uid } = auth.currentUser;
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) return;

    dispatch(writeMessage(uid, displayName, photoURL, message));
    setMessage("");
  };

  return (
    <div>
      <form
        autoCapitalize="off"
        onSubmit={handleSubmit}
        className="static overflow-hidden"
      >
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className=" border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 absolute bottom-1 m-2 px-4 text-xl"
          placeholder="enter text"
        />
        <button className="send-btn">Send</button>
      </form>
    </div>
  );
};

export default SendMessage;
