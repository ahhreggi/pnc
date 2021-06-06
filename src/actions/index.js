export const increaseTimer = (seconds) => {
  return {
    type: "INCREASE_TIMER",
    payload: seconds
  };
};

export const decreaseTimer = (seconds) => {
  return {
    type: "DECREASE_TIMER",
    payload: seconds
  };
};

export const setTimer = (seconds) => {
  return {
    type: "SET_TIMER",
    payload: seconds
  };
};

export const setTheme = (option) => {
  return {
    type: "SET_THEME",
    payload: option
  };
};

export const toggleSettings = () => {
  return {
    type: "TOGGLE_SETTINGS"
  };
};

export const setMode = (option) => {
  return {
    type: "SET_MODE",
    payload: option
  };
};