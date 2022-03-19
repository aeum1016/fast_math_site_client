import { GET_USER } from "../constants/actionTypes";

export default (userAttempts = [], action) => {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    default:
      return userAttempts;
  }
};
