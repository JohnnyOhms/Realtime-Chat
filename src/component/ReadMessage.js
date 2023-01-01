import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, getMessage } from "../actions";
import { Avatar } from "@mui/material";

const ReadMessage = () => {
  const chats = useSelector((state) => state.chatState.chats);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMessage());
  }, []);

  return (
    <div className="display-mssg">
      {chats &&
        chats.map((item) => {
          return (
            <React.Fragment key={item.keyId}>
              <div
                className="end"
                style={{
                  marginLeft:
                    item.userId === auth.currentUser.uid ? "auto" : "none",
                }}
              >
                <p className="text-grey-600 text-xs mx-12">{item.username}</p>
                <div
                  className="flex-auto mssg-container"
                  style={{
                    display: "flex",
                    flexDirection:
                      item.userId === auth.currentUser.uid
                        ? "row-reverse"
                        : "row",
                  }}
                >
                  <Avatar
                    alt="P"
                    src={item.profile_picture}
                    sx={{ width: 30, height: 30, mt: "2px" }}
                  />
                  <p
                    className="items-center shadow-xl m-1 py-2 px-3 rounded-2xl p-4 max-w-xs break-words"
                    style={{
                      background:
                        item.userId === auth.currentUser.uid
                          ? "grey"
                          : "#1976d2",
                      color: "#ffff",
                    }}
                  >
                    {item.message}
                  </p>
                </div>
              </div>
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default ReadMessage;
