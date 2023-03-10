import { SET_USER } from "../actions/actionType";

const initialState = {
  user: null,
};

const userReducer = (state = initialState, action) => {
  if (action.type === SET_USER) {
    return {
      ...state,
      user: action.user,
    };
  }

  return state;
};

export default userReducer;
