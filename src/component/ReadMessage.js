import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessage } from "../actions";

const ReadMessage = () => {
  const chats = useSelector((state) => state.chatState.chats);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(chats);
  }, [chats]);
  return (
    <div>
      <button onClick={() => dispatch(getMessage())}>Log mssgs</button>
    </div>
  );
};

export default ReadMessage;
