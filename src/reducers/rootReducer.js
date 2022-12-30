import { combineReducers } from "redux";
import userReducer from "./usersReducer";
import chatReducer from "./messageReducer";

const rootReducer = combineReducers({
  userState: userReducer,
  chatState: chatReducer,
});

export default rootReducer;
