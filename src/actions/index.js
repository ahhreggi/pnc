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

export const resetTimer = () => {
  return {
    type: "RESET_TIMER"
  };
};

export const startTimer = () => {
  return {
    type: "START_TIMER"
  };
};

export const stopTimer = () => {
  return {
    type: "STOP_TIMER"
  };
};

export const setTheme = (option) => {
  return {
    type: "SET_THEME",
    payload: option
  };
};

export const resetTheme = () => {
  return {
    type: "RESET_THEME"
  };
};

export const setLiquid = (option) => {
  return {
    type: "SET_LIQUID",
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

export const setFocus = (option) => {
  return {
    type: "SET_FOCUS",
    payload: option
  };
};

export const setChill = (option) => {
  return {
    type: "SET_CHILL",
    payload: option
  };
};

export const setBigChill = (option) => {
  return {
    type: "SET_BIGCHILL",
    payload: option
  };
};

export const adjustInterval = (option) => {
  return {
    type: "ADJUST_INTERVAL",
    payload: option
  };
};

export const resetInterval = () => {
  return {
    type: "RESET_INTERVAL"
  };
};

export const toggleAutoStart = () => {
  return {
    type: "TOGGLE_AUTOSTART"
  };
};

export const getNextStep = (option = 1) => {
  return {
    type: "NEXT_STEP",
    payload: option
  };
};