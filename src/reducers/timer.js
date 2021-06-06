const timerReducer = (state = 1500, action) => {
  switch (action.type) {
  case "INCREASE_TIMER": {
    const newTime = state + action.payload;
    return newTime <= 3600 ? newTime : state;
  }
  case "DECREASE_TIMER": {
    const newTime = state - action.payload;
    return newTime >= 0 ? newTime : state;
  }
  case "SET_TIMER":
    return action.payload;
  default:
    return state;
  }
};

export default timerReducer;