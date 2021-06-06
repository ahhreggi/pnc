import { useSelector, useDispatch } from "react-redux";
import { setTimer, setTheme, toggleSettings, setMode } from "../actions";
import classNames from "classnames";
import "./Settings.scss";


const Settings = () => {

  // State Management
  const settings = useSelector(state => state.settings);
  const dispatch = useDispatch();

  // Component Variables
  const settingsStyles = classNames({
    Settings: true,
    [`theme-${settings.theme}`]: false,
    hide: !settings.visible
  });

  const onSetMode = (mode) => {
    dispatch(setMode(mode));
    onResetTimer(mode);
  };

  const onResetTimer = (mode = settings.mode) => {
    const startTime = settings[mode];
    dispatch(setTimer(startTime));
  };

  return (
    <div className={settingsStyles}>
      <h3 className="settings-toggle" onClick={() => dispatch(setTheme("next"))}>theme: {settings.theme}</h3>

      <h3 className="settings-toggle" onClick={() => onSetMode("focus")}>focus mode</h3>
      <h3 className="settings-toggle" onClick={() => onSetMode("chill")}>chill mode</h3>
      <h3 className="settings-toggle" onClick={() => onSetMode("chillax")}>chillax mode</h3>

      <h3 className="settings-toggle" onClick={() => onResetTimer()}>reset</h3>

      <h3 className="settings-toggle close" onClick={() => dispatch(toggleSettings())}>close</h3>
    </div>
  );

};

export default Settings;
