import { useSelector } from "react-redux";
import "./Milk.scss";

const Milk = () => {

  // STATE MANAGEMENT ///////////////////////////////////////////////

  // Global States
  const { time } = useSelector(state => state.timer);
  const settings = useSelector(state => state.settings);

  // COMPONENT VARIABLES ////////////////////////////////////////////

  // Calculate milk height based on mode & elapsed time
  const mode = settings.mode;
  const startTime = settings[mode];
  const elapsed = startTime - time;
  const progress = Math.floor((elapsed / startTime) * 100);
  const percent = progress <= 2 ? 2 : progress;
  const height = { height: `${mode === "focus" ? 100 + percent : 200 - percent}vh`};

  // Set milk color to match mode when set to auto
  let color = settings.liquid;
  if (settings.liquid === "auto") {
    switch (settings.mode) {
    case "focus":
      color = "green";
      break;
    case "chill":
      color = "yellow";
      break;
    case "bigChill":
      color = "red";
      break;
    default:
      color = "white";
    }
  } else {
    color = settings.liquid;
  }

  ///////////////////////////////////////////////////////////////////

  return (
    <div className="Milk">
      <div className={`liquid one liquid-${color}`} style={height} />
      <div className={`liquid two liquid-${color}`} style={height} />
    </div>
  );
};

export default Milk;
