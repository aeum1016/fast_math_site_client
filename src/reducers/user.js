import { GET_USER } from "../constants/actionTypes";

const userReducer = (userAttempts = [], action) => {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    default:
      return userAttempts;
  }
};

export default userReducer;
