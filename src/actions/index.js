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

export const setSettings = (option) => {
  return {
    type: option ? "SHOW_SETTINGS" : "CLOSE_SETTINGS"
  };
};