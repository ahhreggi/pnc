const themeReducer = (state = "blue", action) => {
  switch (action.type) {
  case "SET_THEME": {
    const colors = ["blue", "red", "green", "purple", "yellow", "orange", "navy", "grey"];
    if (action.payload === "next") {
      let index = colors.indexOf(state);
      index = index === colors.length - 1 ? 0 : index + 1;
      return colors[index];
    } else {
      return action.payload;
    }
  }
  default:
    return state;
  }
};

export default themeReducer;