import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTimer, stopTimer, setTheme, toggleSettings, setFocus, setChill, setChillax, getNextStep } from "../actions";
import classNames from "classnames";
import "./Settings.scss";


const Settings = () => {

  // State Management
  const settings = useSelector(state => state.settings);
  const dispatch = useDispatch();

  const onResetTimer = (mode = settings.mode) => {
    const startTime = settings[mode];
    dispatch(stopTimer());
    dispatch(setTimer(startTime));
  };

  const onSkipTimer = () => {
    dispatch(getNextStep());
  };

  useEffect(() => {
    onResetTimer(settings.mode);
  }, [settings.mode]);

  // Component Variables
  const settingsStyles = classNames({
    Settings: true,
    [`theme-${settings.theme}`]: false,
    hide: !settings.visible
  });

  return (
    <div className={settingsStyles}>
      <h2>Settings</h2>
      <h3 className="settings-toggle" onClick={() => dispatch(setTheme("next"))}>theme: {settings.theme}</h3>

      <h3 className="settings-toggle" onClick={() => dispatch(setFocus("next"))}>focus: {settings.focus}</h3>
      <h3 className="settings-toggle" onClick={() => dispatch(setChill("next"))}>lil chill: {settings.chill}</h3>
      <h3 className="settings-toggle" onClick={() => dispatch(setChillax("next"))}>big chill: {settings.chillax}</h3>

      <h3 className="settings-toggle">big chill interval: {settings.interval}</h3>
      <h3 className="settings-toggle">current step: {settings.step}</h3>
      <h3 className="settings-toggle">current mode: {settings.mode}</h3>

      <h3 className="settings-toggle" onClick={() => onResetTimer()}>reset current timer</h3>
      <h3 className="settings-toggle" onClick={() => onSkipTimer()}>skip current timer</h3>

      <h3 className="settings-toggle close" onClick={() => dispatch(toggleSettings())}>close</h3>
    </div>
  );

};

export default Settings;
