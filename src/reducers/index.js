import timerReducer from "./timer";
import themeReducer from "./theme";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  timer: timerReducer,
  theme: themeReducer
});

export default allReducers;