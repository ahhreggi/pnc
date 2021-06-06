import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseTimer, setTimer, startTimer, stopTimer, setTheme, toggleSettings, setFocus, setChill, setChillax, getNextStep } from "../actions";
import classNames from "classnames";
import "./Settings.scss";


const Settings = () => {

  const [page, setPage] = useState(1);

  // State Management
  const settings = useSelector(state => state.settings);
  const timer = useSelector(state => state.timer);
  const dispatch = useDispatch();

  const onResetTimer = (mode = settings.mode) => {
    const isEnabled = timer.enabled;
    const startTime = settings[mode];
    dispatch(stopTimer());
    dispatch(setTimer(startTime));
    if (isEnabled) {
      dispatch(startTimer());
    }
  };

  const onSkipTimer = () => {
    dispatch(getNextStep());
  };

  const onCloseSettings = () => {
    dispatch(toggleSettings());
    setPage(1);
  };

  // Stop and reset timer when the mode changes
  useEffect(() => {
    onResetTimer(settings.mode);
  }, [settings.mode]);

  const formatTime = (time) => {
    return `${time / 60} min`;
  };

  // Component Variables
  const settingsStyles = classNames({
    Settings: true,
    [`theme-${settings.theme}`]: false,
    hide: !settings.visible
  });

  return (
    <div className={settingsStyles}>
      <h2>Settings</h2>

      <h3 className="current">current step: {settings.step}/{settings.interval * 2} ({settings.mode})</h3>

      <div className="settings-page">
        {page === 1 &&
          <>
            <h3 className="settings-toggle" onClick={() => onResetTimer()}>reset current step</h3>
            <h3 className="settings-toggle" onClick={() => onSkipTimer()}>skip current step</h3>
            <h3 className="settings-toggle" onClick={() => dispatch(increaseTimer(30))}>+30 sec</h3>
            <h3 className="settings-toggle page-control" onClick={() => setPage(2)}>next page &gt;</h3>
          </>
        }
        {page === 2 &&
          <>
            <h3 className="settings-toggle" onClick={() => dispatch(setTheme("next"))}>theme: {settings.theme}</h3>
            <h3 className="settings-toggle" onClick={() => dispatch(setFocus("next"))}>focus: {formatTime(settings.focus)}</h3>
            <h3 className="settings-toggle" onClick={() => dispatch(setChill("next"))}>lil chill: {formatTime(settings.chill)}</h3>
            <h3 className="settings-toggle" onClick={() => dispatch(setChillax("next"))}>big chill: {formatTime(settings.chillax)}</h3>
            {/* <h3 className="settings-toggle">big chill interval: {settings.interval}</h3> */}
            <h3 className="settings-toggle page-control" onClick={() => setPage(1)}>&lt; prev page</h3>
          </>
        }
      </div>


      <h3 className="settings-toggle close" onClick={() => onCloseSettings()}>close</h3>
    </div>
  );

};

export default Settings;
