import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decreaseTimer, resetTimer, setTimer, startTimer, stopTimer, getNextStep } from "../actions";
import moment from "moment";
import classNames from "classnames";
import "./Timer.scss";

const Timer = () => {

  // State Management
  const { enabled, time } = useSelector(state => state.timer);
  const settings = useSelector(state => state.settings);
  const dispatch = useDispatch();

  // If the mode changes, update timer state
  useEffect(() => {
    const startTime = settings[settings.mode];
    const autoStart = enabled;
    dispatch(setTimer(startTime));
    if (autoStart) {
      dispatch(startTimer());
    }
  }, [settings.mode]);

  useEffect(() => {
    const startTime = settings[settings.mode];
    dispatch(setTimer(startTime));
  }, [settings.focus, settings.chill, settings.bigChill]);

  useEffect(() => {
    if (enabled) {
      const countdown = setTimeout(() => {
        if (time) {
          dispatch(decreaseTimer(1));
        } else {
          dispatch(getNextStep());
        }
      }, 1000);
      return () => clearTimeout(countdown);
    }
  });

  const toggleTimer = () => {
    dispatch(enabled ? stopTimer() : startTimer());
  };

  // Component Variables
  const timerStyles = classNames({
    Timer: true,
    enabled: enabled,
    [`shadow-${settings.mode}`]: true
  });
  const display = moment(time * 1000).format("mm:ss");
  let [minutes, seconds] = display.split(":");
  if (time === 3600) {
    minutes = 60;
  }

  return (
    <div className={timerStyles} onClick={() => toggleTimer()}>
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
