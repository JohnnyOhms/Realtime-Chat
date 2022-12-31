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
    dispatch(writeMessage(uid, displayName, photoURL, message));
  };
  return (
    <div>
      <form autoCapitalize="off" onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className=""
        />
        <button>Send</button>
      </form>
      <button
        onClick={(event) => dispatch(getSingleData("GhJLD4rM6QUjoM7Czakp"))}
      >
        Update Data
      </button>
    </div>
  );
};

export default SendMessage;
