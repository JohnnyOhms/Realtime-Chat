import React, { useRef, useState } from "react";
import { Avatar } from "@mui/material";
import { auth, deletMessage, getSingleData } from "../actions";
import { useDispatch } from "react-redux";

const SingleMessage = (props) => {
  const [displayOption, setDisplayOption] = useState(false);
  const mssgRef = useRef();
  const dispatch = useDispatch();

  const handleEditClick = () => {
    const value = window.prompt();
    if (value) {
      dispatch(getSingleData(mssgRef.current.id, value));
      setDisplayOption((prev) => !prev);
    }
  };

  const handleDeleteClick = () => {
    dispatch(deletMessage(mssgRef.current.id));
    setDisplayOption((prev) => !prev);
  };

  return (
    <div
      key={props.keyId}
      className="body"
      style={{
        marginLeft:
          props.item.userId === auth.currentUser.uid ? "auto" : "none",
      }}
      id={props.item.keyId}
      ref={mssgRef}
    >
      <p className="text-grey-600 text-xs mx-12">{props.item.username}</p>
      <div
        className="flex-auto mssg-container"
        style={{
          display: "flex",
          flexDirection:
            props.item.userId === auth.currentUser.uid ? "row-reverse" : "row",
          position: "relative",
        }}
      >
        <Avatar
          className="avatar"
          alt="P"
          src={props.item.profile_picture}
          sx={{ width: 30, height: 30, mt: "2px" }}
        />
        <p
          className="items-center shadow-xl m-1 py-2 px-3 rounded-2xl p-4 max-w-xs break-words text-mssg"
          style={{
            background:
              props.item.userId === auth.currentUser.uid ? "grey" : "#1976d2",
            color: "#ffff",
          }}
          onMouseEnter={(event) => setDisplayOption((prev) => !prev)}
          onMouseLeave={(event) => setDisplayOption((prev) => !prev)}
        >
          {props.item.message}
        </p>
        {props.item.userId === auth.currentUser.uid && (
          <span
            className="edit-del"
            style={{
              right: props.item.userId === auth.currentUser.uid ? "40px" : "",
              left: props.item.userId !== auth.currentUser.uid ? "40px" : "",
              display: displayOption ? "inline" : "none",
            }}
            onMouseEnter={(event) => setDisplayOption((prev) => !prev)}
            onMouseLeave={(event) => setDisplayOption((prev) => !prev)}
          >
            <p onClick={handleEditClick}>edit</p>
            <p onClick={handleDeleteClick}>delete</p>
          </span>
        )}
      </div>
    </div>
  );
};

export default SingleMessage;
