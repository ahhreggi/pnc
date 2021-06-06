import classNames from "classnames";
import "./Clock.scss";

const Clock = () => {
  const clockStyles = classNames({
    Clock: true
  });
  return (
    <div className={clockStyles}>
      12:34
    </div>
  );
};

export default Clock;
