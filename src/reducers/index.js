import timerReducer from "./timer";
import themeReducer from "./theme";
import settingsReducer from "./settings";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  timer: timerReducer,
  theme: themeReducer,
  settings: settingsReducer
});

export default allReducers;