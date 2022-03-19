import { FETCH_ALL, CREATE } from "../constants/actionTypes";

export default (attempts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...attempts, action.payload];
    default:
      return attempts;
  }
};
