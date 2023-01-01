import React from "react";
import StartPage from "./component/startPage";
import { useSelector } from "react-redux";
import Chat from "./component/chat";
import LoginIn from "./component/LoginIn";

const App = () => {
  const user = useSelector((state) => state.userState.user);

  return (
    <div className="overflow-hidden">
      <StartPage />
      {user ? <Chat /> : <LoginIn />}
    </div>
  );
};

export default App;
