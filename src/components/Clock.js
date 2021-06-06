import classNames from "classnames";
import "./Clock.scss";

const Clock = () => {
  const clockStyles = classNames({
    Clock: true
  });
  return (
    <div className={clockStyles}>
      <div className="minutes">
        <h1>03</h1>
      </div>
      <div className="colon">
        <h1>:</h1>
      </div>
      <div className="seconds">
        <h1>06</h1>
      </div>
    </div>
  );
};

export default Clock;
