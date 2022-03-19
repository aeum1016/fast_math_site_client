import { combineReducers } from "redux";

import auth from "./auth";
import attempts from "./attempts";
import user from "./user";

export default combineReducers({
  auth,
  attempts,
  user,
});
