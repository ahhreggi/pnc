import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseTimer, resetTimer, setTheme, setAnimation, toggleInvert, setLiquid, toggleSettings, togglePage, setFocus, setChill, setBigChill, getNextStep, toggleAutoStart } from "../actions";
import moment from "moment";
import classNames from "classnames";
import "./Settings.scss";

const Settings = () => {

  // State Management
  const settings = useSelector(state => state.settings);
  const dispatch = useDispatch();

  // Event listener handler
  useEffect(() => {
    if (settings.visible) {
      document.removeEventListener("keydown", keyHandler, false);
      document.addEventListener("keydown", keyHandler, false);
    } else {
      document.removeEventListener("keydown", keyHandler, false);
    }
    return () => {
      document.removeEventListener("keydown", keyHandler, false);
    };
  }, [settings.visible, settings.page]);

  // Handle keydown events
  const keyHandler = (event) => {
    if (event.code === "Tab") {
      event.preventDefault();
      dispatch(togglePage());
    }
  };

  // Stop and reset timer when the mode changes
  useEffect(() => {
    dispatch(resetTimer());
  }, [settings.mode]);

  const formatTime = (time) => {
    return `${time / 60} min`;
  };

  const formatMode = (mode) => {
    if (mode === "bigChill") {
      return "big chill";
    } else if (mode === "chill") {
      return "lil chill";
    } else {
      return "focus";
    }
  };

  // Component Variables
  const settingsStyles = classNames({
    Settings: true,
    foreground: true,
    overlay: true,
    [`theme-${settings.theme}`]: false,
    hide: !settings.visible
  });

  // Total time
  let total = (4 * settings.focus) + (3 * settings.chill) + settings.bigChill;
  total = moment.utc(total * 1000).format("HH:mm:ss");

  return (
    <div className={settingsStyles}>

      <h2>Settings</h2>

      {/* Current Step */}
      <h4 className="current settings-toggle">
        <span className="option">current step:</span>
        <span className="value">
          {settings.step}/{settings.interval * 2} (<span className={settings.mode}>{formatMode(settings.mode)}</span>)
        </span>
      </h4>
      <h4 className="total settings-toggle">
        <span className="option">total time:</span>
        <span className="value">{total}</span>
      </h4>

      {/* Individual Settings Pages */}
      <div className="settings-page">

        {settings.page === 1 &&
          <>
            <h4 className="settings-toggle font-green" onClick={() => dispatch(increaseTimer(30))}>
              +30 sec
            </h4>
            <h4 className="settings-toggle font-yellow" onClick={() => dispatch(getNextStep())}>
              skip current step
            </h4>
            <h4 className="settings-toggle font-red" onClick={() => dispatch(resetTimer())}>
              reset current step
            </h4>
            <h4 className="settings-toggle page-control" onClick={() => dispatch(togglePage())}>
              next page &gt;
            </h4>
          </>
        }

        {settings.page === 2 &&
          <>
            <h4 className="settings-toggle" onClick={() => dispatch(setFocus("next"))}>
              <span className="option">focus length:</span>
              <span className="value focus">{formatTime(settings.focus)}</span>
            </h4>
            <h4 className="settings-toggle" onClick={() => dispatch(setChill("next"))}>
              <span className="option">lil chill length:</span>
              <span className="value chill">{formatTime(settings.chill)}</span>
            </h4>
            <h4 className="settings-toggle" onClick={() => dispatch(setBigChill("next"))}>
              <span className="option">big chill length:</span>
              <span className="value bigChill">{formatTime(settings.bigChill)}</span>
            </h4>
            <h4 className="settings-toggle" onClick={() => dispatch(setTheme("next"))}>
              <span className="option">bg color:</span>
              <span className={`value font-${settings.theme}`}>{settings.theme}</span>
            </h4>
            <h4 className="settings-toggle" onClick={() => dispatch(setLiquid("next"))}>
              <span className="option">milk color:</span>
              <span className={`value font-${settings.liquid}`}>{settings.liquid}</span>
            </h4>
            <h4 className="settings-toggle" onClick={() => dispatch(setAnimation("next"))}>
              <span className="option">animation style:</span>
              <span className="value">{settings.animation}</span>
            </h4>
            <h4 className="settings-toggle" onClick={() => dispatch(toggleInvert())}>
              <span className="option">timer style:</span>
              <span className="value">{settings.invert ? "inverted" : "default"}</span>
            </h4>
            <h4 className="settings-toggle" onClick={() => dispatch(toggleAutoStart())}>
              <span className="option">autostart:</span>
              <span className="value">{settings.autoStart ? "enabled" : "disabled"}</span>
            </h4>
            <h4 className="settings-toggle page-control" onClick={() => dispatch(togglePage())}>&lt; prev page</h4>
          </>
        }

      </div>

      {/* Close Button */}
      <h3 className="settings-toggle close" onClick={() => dispatch(toggleSettings())}>
        close
      </h3>

    </div>
  );

};

export default Settings;
