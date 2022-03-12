import { FETCH_ALL, GET_USER, CREATE, DELETE } from "../constants/actionTypes";

export default (attempts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case GET_USER:
      return attempts.filter((attempt) => attempt._id === action.payload);
    case CREATE:
      return [...attempts, action.payload];
    case DELETE:
      return attempts.filter((attempt) => attempt._id !== action.payload);
    default:
      return attempts;
  }
};
