import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSettings, setTheme, increaseTimer, setTimer, startTimer, stopTimer, getNextStep } from "./actions";
import Timer from "./components/Timer";
import About from "./components/About";
import Settings from "./components/Settings";
import Help from "./components/Help";
import classNames from "classnames";
import "./App.scss";

const App = () => {

  const [showAbout, setShowAbout] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // State Management
  const timer = useSelector(state => state.timer);
  const settings = useSelector(state => state.settings);
  const dispatch = useDispatch();

  // Component Variables
  const appStyles = classNames({
    App: true,
    [`theme-${settings.theme}`]: true
  });

  const onToggleSettings = () => {
    dispatch(stopTimer());
    dispatch(toggleSettings());
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

  const keyHandler = (event) => {
    // event.preventDefault();
    switch (event.code) {
    case "Space":
      dispatch(timer.enabled ? stopTimer() : startTimer());
      break;
    case "KeyA":
      dispatch(increaseTimer(30));
      break;
    case "KeyS":
      dispatch(getNextStep());
      break;
    case "KeyR":
      onResetTimer();
      break;
    case "KeyT":
      dispatch(setTheme("next"));
      break;
    case "Digit1":
      setShowAbout(true);
      break;
    case "Digit2":
      dispatch(toggleSettings());
      break;
    case "Digit3":
      setShowHelp(true);
      break;
    default:
      return;
    }
  };

  const escHandler = (event) => {
    switch (event.code) {
    case "Escape":
      setShowAbout(false);
      setShowHelp(false);
      if (settings.visible) {
        dispatch(toggleSettings());
      }
      break;
    case "Digit1":
      setShowAbout(!showAbout);
      if (settings.visible) {
        dispatch(toggleSettings());
      }
      setShowHelp(false);
      break;
    case "Digit2":
      setShowAbout(false);
      dispatch(toggleSettings());
      setShowHelp(false);
      break;
    case "Digit3":
      setShowAbout(false);
      if (settings.visible) {
        dispatch(toggleSettings());
      }
      setShowHelp(!showHelp);
      break;
    }

  };

  const onResetTimer = (mode = settings.mode) => {
    const isEnabled = timer.enabled;
    const startTime = settings[mode];
    dispatch(stopTimer());
    dispatch(setTimer(startTime));
    if (isEnabled) {
      dispatch(startTimer());
    }
  };

  useEffect(() => {
    if (!showAbout && !showHelp && !settings.visible) {
      document.addEventListener("keydown", keyHandler, false);
      document.removeEventListener("keydown", escHandler, false);
    } else {
      dispatch(stopTimer());
      document.removeEventListener("keydown", keyHandler, false);
      document.addEventListener("keydown", escHandler, false);
    }
    return () => {
      document.removeEventListener("keydown", keyHandler, false);
      document.removeEventListener("keydown", escHandler, false);
    };
  }, [timer.enabled, showAbout, showHelp, settings.visible]);

  return (
    <main className={appStyles}>
      <header className="nav">
        <h3 className="settings-toggle" onClick={() => setShowAbout(true)}>about</h3>
        <h3 className="settings-toggle" onClick={() => onToggleSettings()}>settings</h3>
        <h3 className="settings-toggle" onClick={() => setShowHelp(true)}>help</h3>
      </header>
      <section className="display">
        <h2 className="settings-toggle" onClick={() => setShowAbout(true)}>Pomomilk</h2>
        <Timer />
        <footer onClick={() => onToggleSettings()}>
          <h3 className="settings-toggle mode">
            ~ <span>{formatMode(settings.mode)}</span> ~
          </h3>
          <h4>
            {settings.step}/{settings.interval * 2}
          </h4>
        </footer>
      </section>
      {showAbout &&
        <About onClose={setShowAbout} />
      }
      {showHelp &&
        <Help onClose={setShowHelp} />
      }
      <Settings />
    </main>
  );

};

export default App;
