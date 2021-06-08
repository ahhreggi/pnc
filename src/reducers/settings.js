const defaultSettings = {
  visible: false,
  theme: "navy",
  liquid: "auto",
  focus: 1500,
  chill: 300,
  bigChill: 900,
  mode: "focus",
  interval: 4,
  step: 1,
  autoStart: true,
  page: 1,
  selection: null
};

const options = {
  themes: ["red", "orange", "yellow", "green", "blue", "purple", "navy", "grey"],
  liquids: ["white", "red", "orange", "yellow", "green", "blue", "purple", "navy", "grey", "auto", "off"],
  focus: [300, 600, 900, 1200, 1500, 1800, 2100, 2700, 3300, 3600],
  chill: [60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 900],
  bigChill: [300, 600, 900, 1200, 1500, 1800, 2100, 2700, 3300, 3600]
};

const getNext = (current, options, steps = 1) => {
  let index = options.indexOf(current) + steps;
  if (index < 0) {
    index = options.length - 1;
  } else if (index > options.length - 1) {
    index = 0;
  }
  return options[index];
};

const settingsReducer = (state = defaultSettings, action) => {
  switch (action.type) {
  case "TOGGLE_SETTINGS": {
    let page = state.page;
    if (state.visible) {
      page = 1;
    }
    return { ...state, visible: !state.visible, page: 1 };
  }
  case "TOGGLE_PAGE":
    return { ...state, page: state.page === 1 ? 2 : 1 };
  case "SET_THEME": {
    let theme = action.payload;
    if (action.payload === "next") {
      theme = getNext(state.theme, options.themes);
    }
    return { ...state, theme: theme };
  }
  case "RESET_THEME": {
    return { ...state, theme: defaultSettings.theme, liquid: defaultSettings.liquid };
  }
  case "SET_LIQUID": {
    let liquid = action.payload;
    if (action.payload === "next") {
      liquid = getNext(state.liquid, options.liquids);
    }
    return { ...state, liquid: liquid };
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
  case "SET_BIGCHILL": {
    let bigChill = action.payload;
    if (action.payload === "next") {
      bigChill = getNext(state.bigChill, options.bigChill);
    }
    return { ...state, bigChill: bigChill };
  }
  case "ADJUST_INTERVAL": {
    const interval = state.mode;
    const newValue = getNext(state[interval], options[interval], action.payload);
    return { ...state, [interval]: newValue };
  }
  case "RESET_INTERVAL": {
    const interval = state.mode;
    return { ...state, [interval]: defaultSettings[interval] };
  }
  case "TOGGLE_AUTOSTART":
    return { ...state, autoStart: !state.autoStart };
  case "NEXT_STEP": {
    let step = state.step + action.payload;
    const maxSteps = state.interval * 2;
    let mode;
    if (step > maxSteps) {
      step = 1;
    } else if (step < 1) {
      step = maxSteps;
    }
    if (step % 2) {
      mode = "focus";
    } else {
      mode = step < maxSteps ? "chill" : "bigChill";
    }
    return { ...state, step: step, mode: mode };
  }
  default:
    return state;
  }
};

export default settingsReducer;