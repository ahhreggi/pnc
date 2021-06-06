import classNames from "classnames";
import "./Timer.scss";

const Timer = () => {
  const timerStyles = classNames({
    Timer: true
  });
  return (
    <div className={timerStyles}>
      <span className="minutes">
        <h1>03</h1>
      </span>
      <span className="colon">
        <h1>:</h1>
      </span>
      <span className="seconds">
        <h1>06</h1>
      </span>
    </div>
  );
};

export default Timer;
