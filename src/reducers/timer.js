const defaultTimer = {
  enabled: false,
  time: 1500
};

const timerReducer = (state = defaultTimer, action) => {
  switch (action.type) {
  case "INCREASE_TIMER": {
    const time = state.time + action.payload;
    return time <= 3600 ? { ...state, time: time } : state;
  }
  case "DECREASE_TIMER": {
    const time = state.time - action.payload;
    return time >= 0 ? { ...state, time: time } : state;
  }
  case "SET_TIMER":
    return { ...state, time: action.payload };
  case "START_TIMER":
    return { ...state, enabled: true };
  case "STOP_TIMER":
    return { ...state, enabled: false };
  default:
    return state;
  }
};

export default timerReducer;