import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseTimer, decreaseTimer, setTimer, startTimer, stopTimer } from "../actions";
import moment from "moment";
import classNames from "classnames";
import "./Timer.scss";

const Timer = () => {

  // State Management
  const { enabled, time } = useSelector(state => state.timer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (enabled) {
      const countdown = setTimeout(() => {
        dispatch(decreaseTimer(1));
        // When the timer reaches 0, either stop or start the next timer
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
    enabled: enabled
  });
  const display = moment(time * 1000).format("mm:ss");
  const [minutes, seconds] = display.split(":");

  return (
    <div className={timerStyles}>
      <span className="minutes">
        <h1>{minutes}</h1>
      </span>
      <span className="colon" onClick={() => toggleTimer()}>
        <h1>:</h1>
      </span>
      <span className="seconds">
        <h1>{seconds}</h1>
      </span>
    </div>
  );
};

export default Timer;
