const settingsReducer = (state = false, action) => {
  switch (action.type) {
  case "SHOW_SETTINGS":
    return true;
  case "CLOSE_SETTINGS":
    return false;
  default:
    return state;
  }
};

export default settingsReducer;