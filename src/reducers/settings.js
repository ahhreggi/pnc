const defaultSettings = {
  visible: false,
  theme: "blue",
  focus: 1500,
  chill: 300,
  chillax: 900,
  mode: "focus",
  cycles: 4
};

const options = {
  themes: ["blue", "red", "green", "purple", "yellow", "orange", "navy", "grey"],
  focus: [300, 600, 900, 1200, 1500, 1800, 2100, 2700, 3300, 3600],
  chill: [60, 120, 180, 240, 300, 360, 420, 480, 540, 600],
  chillax: [300, 600, 900, 1200, 1500, 1800, 2700, 3600]
};

const getNext = (current, options) => {
  let index = options.indexOf(current);
  index = index === options.length - 1 ? 0 : index + 1;
  return options[index];
};

const settingsReducer = (state = defaultSettings, action) => {
  switch (action.type) {
  case "TOGGLE_SETTINGS":
    return { ...state, visible: !state.visible };
  case "SET_THEME": {
    let theme = action.payload;
    if (action.payload === "next") {
      theme = getNext(state.theme, options.themes);
    }
    return { ...state, theme: theme };
  }
  case "SET_MODE": {
    return { ...state, mode: action.payload };
  }
  case "SET_FOCUS": {
    let focus = action.payload;
    if (action.payload === "next") {
      focus = getNext(state.focus, options.focus);
    }
    return { ...state, focus: focus };
  }
  case "SET_CHILL": {
    let chill = action.payload;
    if (action.payload === "next") {
      chill = getNext(state.chill, options.chill);
    }
    return { ...state, chill: chill };
  }
  case "SET_CHILLAX": {
    let chillax = action.payload;
    if (action.payload === "next") {
      chillax = getNext(state.chillax, options.chillax);
    }
    return { ...state, chillax: chillax };
  }
  default:
    return state;
  }
};

export default settingsReducer;