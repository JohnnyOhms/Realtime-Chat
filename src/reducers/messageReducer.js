import { CHATS } from "../actions/actionType";

const initailState = {
  chats: [],
};

const chatReducer = (state = initailState, action) => {
  if (action.type === CHATS) {
    return {
      ...state,
      chats: action.chats,
    };
  }
  return state
};

export default chatReducer;
