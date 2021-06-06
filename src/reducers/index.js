import timerReducer from "./timer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  timer: timerReducer
});

export default allReducers;