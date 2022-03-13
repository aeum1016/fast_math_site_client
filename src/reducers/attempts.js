import { FETCH_ALL, GET_USER, CREATE, DELETE } from "../constants/actionTypes";

export default (attempts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case GET_USER:
      return action.payload;
    case CREATE:
      return [...attempts, action.payload];
    default:
      return attempts;
  }
};
