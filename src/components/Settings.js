import { useSelector, useDispatch } from "react-redux";
import { setTimer, setTheme, setSettings } from "../actions";
import classNames from "classnames";
import "./Settings.scss";


const Settings = () => {

  // State Management
  const theme = useSelector(state => state.theme);
  const settings = useSelector(state => state.settings);
  const dispatch = useDispatch();

  // Component Variables
  const settingsStyles = classNames({
    Settings: true,
    [`theme-${theme}`]: false,
    hide: !settings
  });

  return (
    <div className={settingsStyles}>
      <h3 className="settings-toggle" onClick={() => dispatch(setTheme("next"))}>theme: {theme}</h3>
      <h3 className="settings-toggle" onClick={() => dispatch(setTimer(300))}>5:00</h3>
      <h3 className="settings-toggle" onClick={() => dispatch(setTimer(1500))}>25:00</h3>
      <h3 className="settings-toggle close" onClick={() => dispatch(setSettings(false))}>close</h3>
    </div>
  );

};

export default Settings;
