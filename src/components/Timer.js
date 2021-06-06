import { useSelector, useDispatch } from "react-redux";
import { increaseTimer, decreaseTimer, setTimer } from "../actions";
import moment from "moment";
import classNames from "classnames";
import "./Timer.scss";

const Timer = () => {

  // State Management
  const timer = useSelector(state => state.timer);

  // Component Variables
  const timerStyles = classNames({
    Timer: true
  });
  const time = moment(timer * 1000).format("mm:ss");
  const [minutes, seconds] = time.split(":");

  return (
    <div className={timerStyles}>
      <span className="minutes">
        <h1>{minutes}</h1>
      </span>
      <span className="colon">
        <h1>:</h1>
      </span>
      <span className="seconds">
        <h1>{seconds}</h1>
      </span>
    </div>
  );
};

export default Timer;
