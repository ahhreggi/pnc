import PropTypes from "prop-types";

const Help = (props) => {

  Help.propTypes = {
    onClose: PropTypes.func,
  };

  return (
    <div className="Help">
      <h2>Quick Controls</h2>
      <div className="controls">
        <h4>
          <span className="option">
            <span className="key">SPACEBAR</span>
          </span>
          <span className="value">
            start/stop timer
          </span>
        </h4>
        <h4>
          <span className="option">
            <span className="key">W</span>
            <span className="key">A</span>
            <span className="key">S</span>
            <span className="key">D</span>
          </span>
          <span className="value">
            adjust the current timer
          </span>
        </h4>
        <h4>
          <span className="option">
            <span className="key">R</span>
          </span>
          <span className="value">
            reset the current timer
          </span>
        </h4>
        <h4>
          <span className="option">
            <span className="key">Shift</span>+
            <span className="key">W</span>
            <span className="key">S</span>
          </span>
          <span className="value">
            adjust the mode interval
          </span>
        </h4>
        <h4>
          <span className="option">
            <span className="key">Shift</span>+
            <span className="key">A</span>
            <span className="key">D</span>
          </span>
          <span className="value">
            go to the prev/next step
          </span>
        </h4>
        <h4>
          <span className="option">
            <span className="key">Shift</span>+
            <span className="key">R</span>
          </span>
          <span className="value">
            reset the mode interval
          </span>
        </h4>
        <h4>
          <span className="option">
            <span className="key">Q</span>
          </span>
          <span className="value">
            toggle autostart
          </span>
        </h4>
        <h4>
          <span className="option">
            <span className="key">Z</span>
            <span className="key">X</span>
          </span>
          <span className="value">
            cycle bg/milk color
          </span>
        </h4>
        <h4>
          <span className="option">
            <span className="key">SHIFT</span>+
            <span className="key">C</span>
          </span>
          <span className="value">
            reset bg/milk color to default
          </span>
        </h4>
        <h4>
          <span className="option">
            <span className="key">1</span>
            <span className="key">2</span>
            <span className="key">3</span>
          </span>
          <span className="value">
            navigate menus
          </span>
        </h4>
      </div>
      <h4>These may also be configured via the settings</h4>
      <h3 className="settings-toggle close" onClick={() => props.onClose(false)}>close</h3>
    </div>
  );

};

export default Help;