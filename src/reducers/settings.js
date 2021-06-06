const defaultSettings = {
  visible: false,
  theme: "blue",
  focus: 1500,
  chill: 300
};

const settingsReducer = (state = defaultSettings, action) => {
  switch (action.type) {
  case "TOGGLE_SETTINGS":
    return { ...state, visible: !state.visible };
  case "SET_THEME": {
    let theme = action.payload;
    if (action.payload === "next") {
      const colors = ["blue", "red", "green", "purple", "yellow", "orange", "navy", "grey"];
      let index = colors.indexOf(state.theme);
      index = index === colors.length - 1 ? 0 : index + 1;
      theme = colors[index];
    }
    return { ...state, theme: theme };
  }
  default:
    return state;
  }
};

export default settingsReducer;