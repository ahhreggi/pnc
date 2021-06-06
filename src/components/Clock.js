import classNames from "classnames";
import "./Clock.scss";

const Clock = () => {
  const clockStyles = classNames({
    Clock: true
  });
  return (
    <div className={clockStyles}>
      <h1>12:34</h1>
    </div>
  );
};

export default Clock;
