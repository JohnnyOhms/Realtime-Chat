import { SET_USER } from "../actions/actionType";

const initialState = {
  user: null,
};

const userReducer = (state = initialState, actions) => {
  if (actions.type === SET_USER) {
    return {
      ...state,
      user: actions.payload,
    };
  }
};

export default userReducer;
