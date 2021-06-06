import { useSelector, useDispatch } from "react-redux";
import { setTimer, setTheme, toggleSettings } from "../actions";
import classNames from "classnames";
import "./Settings.scss";


const Settings = () => {

  // State Management
  const { visible, theme, focus, chill } = useSelector(state => state.settings);
  const dispatch = useDispatch();

  // Component Variables
  const settingsStyles = classNames({
    Settings: true,
    [`theme-${theme}`]: false,
    hide: !visible
  });

  return (
    <div className={settingsStyles}>
      <h3 className="settings-toggle" onClick={() => dispatch(setTheme("next"))}>theme: {theme}</h3>
      <h3 className="settings-toggle" onClick={() => dispatch(setTimer(300))}>5:00</h3>
      <h3 className="settings-toggle" onClick={() => dispatch(setTimer(1500))}>25:00</h3>
      <h3 className="settings-toggle close" onClick={() => dispatch(toggleSettings())}>close</h3>
    </div>
  );

};

export default Settings;
