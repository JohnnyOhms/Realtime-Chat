import React from "react";
import StartPage from "./component/startPage";
import { useSelector } from "react-redux";
import Main from "./component/main";

const App = () => {
  const user = useSelector((state) => state.userState.user);

  return <div>{user ? <Main /> : <StartPage />}</div>;
};

export default App;
