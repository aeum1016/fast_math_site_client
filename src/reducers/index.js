import { combineReducers } from "redux";

import auth from "./auth";
import attempts from "./attempts";

export default combineReducers({
  auth,
  attempts,
});
