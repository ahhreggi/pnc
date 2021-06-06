import classNames from "classnames";
import "./Clock.scss";

const Clock = () => {
  const clockStyles = classNames({
    Clock: true
  });
  return (
    <div className={clockStyles}>
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

export default Clock;
