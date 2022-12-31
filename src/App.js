import React from "react";
import StartPage from "./component/startPage";
import { useSelector } from "react-redux";
import Main from "./component/main";
import LoginIn from "./component/LoginIn";

const App = () => {
  const user = useSelector((state) => state.userState.user);

  return (
    <div>
      <StartPage />
      {user ? <Main /> : <LoginIn />}
    </div>
  );
};

export default App;
