import * as actionTypes from "./actions";

const initialState = {
  users: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USERS:
      return {
        users: action.users,
      };
    default:
      return state;
  }
};

export default reducer;
