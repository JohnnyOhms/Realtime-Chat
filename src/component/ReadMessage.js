import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessage } from "../actions";
import SingleMessage from "./singleMessage";

const ReadMessage = () => {
  const chats = useSelector((state) => state.chatState.chats);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMessage());
  }, [""]);

  return (
    <div className="display-mssg">
      {chats &&
        chats.map((item) => {
          return <SingleMessage item={item} />;
        })}
    </div>
  );
};

export default ReadMessage;
