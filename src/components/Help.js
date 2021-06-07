import PropTypes from "prop-types";

const Help = (props) => {

  Help.propTypes = {
    onClose: PropTypes.func,
  };

  return (
    <div className="Help">
      <h2>Help</h2>
      <h4>Press <span className="key">SPACEBAR</span> or the timer to start/stop</h4>
      <h4>Press <span className="key">&nbsp;A&nbsp;</span> to <span className="font-green">add 30 sec to the current step</span></h4>
      <h4>Press <span className="key">&nbsp;S&nbsp;</span> to <span className="font-yellow">skip the current step</span></h4>
      <h4>Press <span className="key">&nbsp;R&nbsp;</span> to <span className="font-red">reset the current step</span></h4>
      <h4>Press <span className="key">&nbsp;T&nbsp;</span> to change themes</h4>
      <h4>Press <span className="key">&nbsp;1&nbsp;</span> <span className="key">&nbsp;2&nbsp;</span> <span className="key">&nbsp;3&nbsp;</span> to navigate menus</h4>
      <h4>Intervals may be configured via the settings</h4>
      <h3 className="settings-toggle close" onClick={() => props.onClose(false)}>close</h3>
    </div>
  );

};

export default Help;