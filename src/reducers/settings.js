const defaultSettings = {
  visible: false,
  theme: "navy",
  liquid: "auto",
  animation: "on",
  invert: false,
  focus: 1500,
  chill: 300,
  bigChill: 900,
  mode: "focus",
  interval: 4,
  step: 1,
  autoStart: true,
  page: 1,
  selection: null,
  alert: null,
  alertTimeout: 3,
  playSound: true,
  elapsed: 0
};

const options = {
  themes: ["red", "orange", "yellow", "green", "blue", "purple", "pink", "navy", "grey", "black", "rainbow"],
  liquids: ["white", "red", "orange", "yellow", "green", "blue", "purple", "pink", "navy", "grey", "black", "auto"],
  animations: ["on", "flat", "off"],
  focus: [300, 600, 900, 1200, 1500, 1800, 2100, 2400, 2700, 3000, 3300, 3600],
  chill: [60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 900, 1200, 1500, 1800],
  bigChill: [300, 600, 900, 1200, 1500, 1800, 2100, 2400, 2700, 3000, 3300, 3600]
};

// Get the next item given a list of options
const getNext = (current, options, steps = 1, wrap = true) => {
  let index = options.indexOf(current) + steps;
  if (index < 0) {
    index = wrap ? options.length - 1 : 0;
  } else if (index > options.length - 1) {
    index = wrap ? 0 : options.length - 1;
  }
  return options[index];
};

const settingsReducer = (state = defaultSettings, action) => {
  switch (action.type) {

  // Overlay display
  case "TOGGLE_SETTINGS": {
    let page = state.page;
    if (state.visible) {
      page = 1;
    }
    return { ...state, visible: !state.visible, page: page };
  }
  case "TOGGLE_PAGE":
    return { ...state, page: state.page === 1 ? 2 : 1 };

  // Timer display
  case "SET_MODE": {
    return { ...state, mode: action.payload };
  }

  // App styling
  case "SET_THEME": {
    let theme = action.payload;
    if (action.payload === "next") {
      theme = getNext(state.theme, options.themes);
    }
    return { ...state, theme: theme };
  }
  case "RESET_THEME": {
    return { ...state, theme: defaultSettings.theme, liquid: defaultSettings.liquid, invert: false, animation: "on" };
  }
  case "TOGGLE_INVERT": {
    return { ...state, invert: !state.invert };
  }
  case "SET_LIQUID": {
    let liquid = action.payload;
    if (action.payload === "next") {
      liquid = getNext(state.liquid, options.liquids);
    }
    return { ...state, liquid: liquid };
  }
  case "SET_ANIMATION": {
    let animation = action.payload;
    if (action.payload === "next") {
      animation = getNext(state.animation, options.animations);
    }
    return { ...state, animation: animation };
  }

  // Timer intervals
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
    const newValue = getNext(state[interval], options[interval], action.payload, false);
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

  // Elapsed + extra time
  case "ADJUST_ELAPSED": {
    const newValue = state.elapsed + action.payload;
    return { ...state, elapsed: newValue };
  }

  // Alerts
  case "SET_ALERT":
    return { ...state, alert: action.payload, alertTimeout: 3 };
  case "COUNT_ALERT": {
    const timeout = state.alertTimeout - 1;
    const alert = timeout ? state.alert : null;
    return { ...state, alert: alert, alertTimeout: timeout >= 0 ? timeout : 0 };
  }

  // Sounds
  case "TOGGLE_SOUND":
    return { ...state, playSound: !state.playSound };

  default:
    return state;
  }
};

export default settingsReducer;