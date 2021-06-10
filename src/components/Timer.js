import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decreaseTimer, adjustElapsed, setTimer, startTimer, stopTimer, getNextStep, setAlert } from "../actions";
import moment from "moment";
import classNames from "classnames";
import "./Timer.scss";

const Timer = () => {

  // STATE MANAGEMENT ///////////////////////////////////////////////

  // Global states
  const { enabled, time } = useSelector(state => state.timer);
  const settings = useSelector(state => state.settings);
  const dispatch = useDispatch();

  // If the mode changes, update timer state
  useEffect(() => {
    const startTime = settings[settings.mode];
    const autoStart = settings.autoStart;
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
          dispatch(adjustElapsed(1));
        } else {
          dispatch(getNextStep());
        }
      }, 1000);
      return () => clearTimeout(countdown);
    }
  });

  useEffect(() => {
    if (enabled && settings.playSound && time === 0) {
      const audio = new Audio("/sounds/alert.mp3");
      audio.play();
    }
  }, [time]);

  // startTimer & stopTimer handler
  const toggleTimer = () => {
    if (enabled) {
      dispatch(setAlert("timer stopped"));
      dispatch(stopTimer());
      playSound("stop");
    } else {
      dispatch(setAlert("timer started"));
      dispatch(startTimer());
      playSound("start");
    }
  };

  // HELPER FUNCTIONS ///////////////////////////////////////////////

  const playSound = (sound) => {
    if (settings.playSound) {
      const audio = new Audio(`/sounds/${sound}.mp3`);
      audio.play();
    }
  };

  // COMPONENT VARIABLES ////////////////////////////////////////////

  // CSS
  const timerStyles = classNames({
    Timer: true,
    enabled: enabled,
    [`shadow-${settings.mode}`]: true
  });

  // Timer display
  const display = moment(time * 1000).format("mm:ss");
  let [minutes, seconds] = display.split(":");
  if (time === 3600) {
    minutes = 60;
  }

  ///////////////////////////////////////////////////////////////////

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
