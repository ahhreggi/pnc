import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Milk.scss";

const Milk = () => {

  // STATE MANAGEMENT ///////////////////////////////////////////////

  // Local States
  const [loading, setLoading] = useState(true);

  // Global States
  const { time } = useSelector(state => state.timer);
  const settings = useSelector(state => state.settings);

  // Translate from starting position
  useEffect(() => {
    setLoading(false);
  });

  // Return to starting position when animation is disabled
  useEffect(() => {
    if (settings.animation !== "on") {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [settings.animation]);

  // COMPONENT VARIABLES ////////////////////////////////////////////

  // Calculate milk height based on mode & elapsed time
  const mode = settings.mode;
  const startTime = settings[mode];
  const elapsed = startTime - time;
  let percent = ((elapsed / startTime) * 100).toFixed(1) * 1;
  percent = percent <= 0 ? 0 : percent;
  if (mode === "focus" && percent <= 1) {
    percent = 1;
  } else if (percent >= 99 && mode !== "focus") {
    percent = 99;
  }
  const height = {
    height: `${mode === "focus" ? 100 + percent : 200 - percent}vh`
  };

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
    <div className={`Milk ${settings.animation} ${loading ? "loading" : ""}`}>
      <div className={`liquid one liquid-${color} ${settings.animation}`} style={height} />
      {settings.animation === "on" &&
        <div className={`liquid one two liquid-${color} ${settings.animation}`} style={height} />
      }
    </div>
  );
};

export default Milk;
