import React from "react";
import { useDispatch } from "react-redux";
import { signOutApi } from "../actions";

const Logout = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(signOutApi());
  };
  return (
    <div>
      <button
        onClick={handleClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
