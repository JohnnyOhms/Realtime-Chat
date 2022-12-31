import React from "react";
import ReadMessage from "./ReadMessage";
import SendMessage from "./SendMessage";

const Chat = () => {
  return (
    <div>
      <ReadMessage />
      <SendMessage />
    </div>
  );
};

export default Chat;
