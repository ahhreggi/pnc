const classNames = require("classnames");

const Clock = () => {
  const styles = classNames({
    Clock: true
  });
  return (
    <div className={styles}>
      12:34
    </div>
  );
};

export default Clock;
