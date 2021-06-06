import { useSelector, useDispatch } from "react-redux";
import { setTimer, setTheme, toggleSettings, setMode, setFocus, setChill, setChillax } from "../actions";
import classNames from "classnames";
import "./Settings.scss";


const Settings = () => {

  // State Management
  const settings = useSelector(state => state.settings);
  const dispatch = useDispatch();

  const onSetMode = (mode) => {
    dispatch(setMode(mode));
    onResetTimer(mode);
  };

  const onResetTimer = (mode = settings.mode) => {
    const startTime = settings[mode];
    dispatch(setTimer(startTime));
  };

  // Component Variables
  const settingsStyles = classNames({
    Settings: true,
    [`theme-${settings.theme}`]: false,
    hide: !settings.visible
  });

  return (
    <div className={settingsStyles}>
      <h3 className="settings-toggle" onClick={() => dispatch(setTheme("next"))}>theme: {settings.theme}</h3>

      <h3 className="settings-toggle" onClick={() => onSetMode("focus")}>focus mode</h3>
      <h3 className="settings-toggle" onClick={() => onSetMode("chill")}>chill mode</h3>
      <h3 className="settings-toggle" onClick={() => onSetMode("chillax")}>chillax mode</h3>

      <h3 className="settings-toggle" onClick={() => dispatch(setFocus("next"))}>focus: {settings.focus}</h3>
      <h3 className="settings-toggle" onClick={() => dispatch(setChill("next"))}>chill: {settings.chill}</h3>
      <h3 className="settings-toggle" onClick={() => dispatch(setChillax("next"))}>chillax: {settings.chillax}</h3>

      <h3 className="settings-toggle" onClick={() => onResetTimer()}>reset</h3>

      <h3 className="settings-toggle close" onClick={() => dispatch(toggleSettings())}>close</h3>
    </div>
  );

};

export default Settings;
