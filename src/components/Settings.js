import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseTimer, resetTimer, setTheme, setLiquid, toggleSettings, togglePage, setFocus, setChill, setBigChill, getNextStep, toggleAutoStart } from "../actions";
import classNames from "classnames";
import "./Settings.scss";

const Settings = () => {

  // State Management
  const settings = useSelector(state => state.settings);
  const dispatch = useDispatch();
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
    [`theme-${settings.theme}`]: false,
    hide: !settings.visible
  });

  return (
    <div className={settingsStyles}>
      <h2>Settings</h2>

      <h4 className="current">
        current step: {settings.step}/{settings.interval * 2} (<span className={settings.mode}>{formatMode(settings.mode)}</span>)
      </h4>

      <div className="settings-page">

        {settings.page === 1 &&
          <>
            <h4 className="settings-toggle font-green" onClick={() => dispatch(increaseTimer(30))}>+30 sec</h4>
            <h4 className="settings-toggle font-yellow" onClick={() => dispatch(getNextStep())}>skip current step</h4>
            <h4 className="settings-toggle font-red" onClick={() =>     dispatch(resetTimer())}>reset current step</h4>
            <h4 className="settings-toggle page-control" onClick={() => dispatch(togglePage())}>next page &gt;</h4>
          </>
        }

        {settings.page === 2 &&
          <>
            <h4 className="settings-toggle" onClick={() => dispatch(setTheme("next"))}>
              <span className="option">bg color:</span>
              <span className={`value font-${settings.theme}`}>{settings.theme}</span>
            </h4>
            <h4 className="settings-toggle" onClick={() => dispatch(setLiquid("next"))}>
              <span className="option">milk color:</span>
              <span className={`value font-${settings.liquid}`}>{settings.liquid}</span>
            </h4>
            <h4 className="settings-toggle" onClick={() => dispatch(setFocus("next"))}>
              <span className="option">focus:</span>
              <span className="value focus">{formatTime(settings.focus)}</span>
            </h4>
            <h4 className="settings-toggle" onClick={() => dispatch(setChill("next"))}>
              <span className="option">lil chill:</span>
              <span className="value chill">{formatTime(settings.chill)}</span>
            </h4>
            <h4 className="settings-toggle" onClick={() => dispatch(setBigChill("next"))}>
              <span className="option">big chill:</span>
              <span className="value bigChill">{formatTime(settings.bigChill)}</span>
            </h4>
            <h4 className="settings-toggle" onClick={() => dispatch(toggleAutoStart())}>
              <span className="option">autostart:</span>
              <span className={`value font-${settings.autoStart ? "green" : "red"}`}>{settings.autoStart ? "enabled" : "disabled"}</span>
            </h4>
            <h4 className="settings-toggle page-control" onClick={() => dispatch(togglePage())}>&lt; prev page</h4>
          </>
        }

      </div>

      <h3 className="settings-toggle close" onClick={() => dispatch(toggleSettings())}>close</h3>
    </div>
  );

};

export default Settings;
