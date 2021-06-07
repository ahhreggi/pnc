import { useSelector } from "react-redux";
import "./Milk.scss";

const Milk = () => {

  // State Management
  const { time } = useSelector(state => state.timer);
  const settings = useSelector(state => state.settings);

  // Component Variables
  const mode = settings.mode;
  const startTime = settings[mode];
  const elapsed = startTime - time;
  const progress = Math.floor((elapsed / startTime) * 100);
  const height = { height: `${mode === "focus" ? 100 + progress : 200 - progress}vh`};

  return (
    <div className="Milk">
      <div className={`liquid one liquid-${settings.liquid}`} style={height} />
      <div className={`liquid two liquid-${settings.liquid}`} style={height} />
    </div>
  );
};

export default Milk;
