const defaultTimer = {
  enabled: false,
  startTime: 1500,
  time: 1500
};

const timerReducer = (state = defaultTimer, action) => {
  switch (action.type) {
  case "INCREASE_TIMER": {
    const time = state.time + action.payload;
    return { ...state, time: time <= 3600 ? time : 3600 };
  }
  case "DECREASE_TIMER": {
    const time = state.time - action.payload;
    return { ...state, time: time >= 0 ? time : 0 };
  }
  case "SET_TIMER":
    return { ...state, enabled: false, startTime: action.payload, time: action.payload };
  case "RESET_TIMER":
    return { ...state, time: state.startTime };
  case "START_TIMER":
    return { ...state, enabled: true };
  case "STOP_TIMER":
    return { ...state, enabled: false };
  default:
    return state;
  }
};

export default timerReducer;