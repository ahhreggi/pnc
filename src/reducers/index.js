import timerReducer from "./timer";
import settingsReducer from "./settings";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  timer: timerReducer,
  settings: settingsReducer
});

export default allReducers;