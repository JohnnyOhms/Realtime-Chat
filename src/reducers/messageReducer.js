import { CHATS } from "../actions/actionType";

const initailState = {
  chats: [],
};

const chatReducer = (state = initailState, actions) => {
  if (actions.type === CHATS) {
    return {
      ...state,
      chats: actions.payload,
    };
  }
};

export default chatReducer;
