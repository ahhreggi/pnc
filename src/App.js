import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSettings, resetTimer, setTheme, resetTheme, setAnimation, toggleInvert, setLiquid, increaseTimer, decreaseTimer, adjustInterval, resetInterval, startTimer, stopTimer, getNextStep, toggleAutoStart, setAlert, countAlert, toggleSound } from "./actions";
import "./App.scss";
import Timer from "./components/Timer";
import About from "./components/About";
import Settings from "./components/Settings";
import Help from "./components/Help";
import Milk from "./components/Milk";
import classNames from "classnames";

const App = () => {

  // STATE MANAGEMENT ///////////////////////////////////////////////

  // Local States
  const [showAbout, setShowAbout] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [shift, setShift] = useState(false);

  // Global States
  const timer = useSelector(state => state.timer);
  const settings = useSelector(state => state.settings);
  const dispatch = useDispatch();

  // toggleSettings handler
  const onToggleSettings = () => {
    dispatch(stopTimer());
    dispatch(toggleSettings());
  };

  // ALERTS /////////////////////////////////////////////////////////

  // Set a timeout for the alert display
  useEffect(() => {
    const countdown = setTimeout(() => {
      if (settings.alert) {
        dispatch(countAlert());
      }
    }, 500);
    return () => clearTimeout(countdown);
  });

  // Set a timeout for the alert message
  useEffect(() => {
    if (settings.alertTimeout === 0) {
      showAlert(null);
    }
  }, [settings.alertTimeout]);

  // Set the alert in state as the given message
  const showAlert = (message) => {
    dispatch(setAlert(message));
  };

  // KEYPRESS EVENTS ////////////////////////////////////////////////

  // Event listener handler
  useEffect(() => {
    if (!showAbout && !showHelp && !settings.visible) {
      document.addEventListener("keydown", keyHandler, false);
      document.removeEventListener("keydown", escHandler, false);
      document.addEventListener("keyup", keyUpHandler, false);
    } else {
      dispatch(stopTimer());
      document.removeEventListener("keydown", keyHandler, false);
      document.addEventListener("keydown", escHandler, false);
      document.removeEventListener("keyup", keyUpHandler, false);
    }
    return () => {
      document.removeEventListener("keydown", keyHandler, false);
      document.removeEventListener("keydown", escHandler, false);
      document.removeEventListener("keyup", keyUpHandler, false);
    };
  }, [timer.enabled, showAbout, showHelp, settings.visible]);

  // Handle keydown events
  const keyHandler = (event) => {

    if (event.code === "Tab") {
      event.preventDefault();
    }

    let key = (event.shiftKey ? "Shift+" : "") + event.code;

    switch (key) {

    // Listen for hold on Shift
    case "Shift+ShiftLeft": case "Shift+ShiftRight":
      setShift(true);
      break;

    // SPACEBAR: Timer start/stop
    case "Space":
      if (timer.enabled) {
        dispatch(stopTimer());
        showAlert("timer stopped");
      } else {
        dispatch(startTimer());
        showAlert("timer started");
      }
      break;

    // WASD/Arrow Keys: Adjust current timer
    case "KeyW": case "ArrowUp": {
      dispatch(increaseTimer(1));
      showAlert("+1 sec");
      break;
    }
    case "KeyS": case "ArrowDown":
      dispatch(decreaseTimer(1));
      showAlert("-1 sec");
      break;
    case "KeyA": case "ArrowLeft":
      dispatch(decreaseTimer(60));
      showAlert("-1 min");
      break;
    case "KeyD": case "ArrowRight":
      dispatch(increaseTimer(60));
      showAlert("+1 min");
      break;

    // R: Reset current timer
    case "KeyR":
      dispatch(resetTimer());
      showAlert("timer restarted");
      break;

    // Shift + (WASD/Arrow Keys): Adjust intervals, current step
    case "Shift+KeyW": case "Shift+ArrowUp":
      dispatch(adjustInterval(1));
      showAlert("interval increased");
      break;
    case "Shift+KeyS": case "Shift+ArrowDown":
      dispatch(adjustInterval(-1));
      showAlert("interval decreased");
      break;
    case "Shift+KeyA": case "Shift+ArrowLeft":
      dispatch(getNextStep(-1));
      showAlert("moved to previous step");
      dispatch(stopTimer());
      break;
    case "Shift+KeyD": case "Shift+ArrowRight":
      dispatch(getNextStep(1));
      showAlert("moved to next step");
      dispatch(stopTimer());
      break;

    // Shift + R: Reset current interval to default
    case "Shift+KeyR":
      dispatch(resetInterval());
      dispatch(resetTimer());
      showAlert(`${settings.mode} interval has been reset to default!`);
      break;

    // Q: Toggle autostart
    case "KeyQ":
      showAlert("autostart");
      dispatch(toggleAutoStart());
      break;

    // Z, X: Change bg, milk color
    case "KeyZ":
      dispatch(setTheme("next"));
      showAlert("changed bg color");
      break;
    case "KeyX":
      dispatch(setLiquid("next"));
      showAlert("changed milk color");
      break;

    // C: Change timer style
    case "KeyC":
      dispatch(toggleInvert());
      showAlert("changed timer style");
      break;

    // V: Change timer style
    case "KeyV":
      dispatch(setAnimation("next"));
      showAlert("changed animation style");
      break;

    // M: Change timer style
    case "KeyM":
      onToggleSound();
      break;

    // Shift + T: Reset bg + milk to default
    case "Shift+KeyT":
      dispatch(resetTheme());
      showAlert("styles have been reset to default!");
      break;

    // 1, 2, 3: Navigate menus
    case "Digit1":
      setShowAbout(true);
      break;
    case "Digit2": case "Tab":
      dispatch(toggleSettings());
      break;
    case "Digit3":
      setShowHelp(true);
      break;
    default:
      return;
    }
  };

  // Handle Escape key events and menu shortcuts
  const escHandler = (event) => {
    if (event.code === "Tab") {
      event.preventDefault();
    }
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

  // Handle Shift key up event
  const keyUpHandler = (event) => {
    if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
      setShift(false);
    }
  };

  // HELPER FUNCTIONS ///////////////////////////////////////////////

  // Format mode to be displayed
  const formatMode = (mode) => {
    if (mode === "bigChill") {
      return "big chill";
    } else if (mode === "chill") {
      return "lil chill";
    } else {
      return "focus";
    }
  };

  // Toggle timer alarm
  const onToggleSound = () => {
    dispatch(toggleSound());
    showAlert("timer alarm");
  };

  // COMPONENT VARIABLES ////////////////////////////////////////////

  // CSS
  const appStyles = classNames({
    App: true,
    [`theme-${settings.theme}`]: true,
    "shift-down": shift,
    [`shift-${settings.mode}`]: settings.invert ? !shift : shift
  });

  // Alert messages
  let message = settings.alert;
  switch (message) {
  case "autostart":
    message += settings.autoStart ? " enabled" : " disabled";
    break;
  case "changed bg color":
    message += ` to ${settings.theme}`;
    break;
  case "changed milk color": {
    message += ` to ${settings.liquid}`;
    break;
  }
  case "changed timer style": {
    if (settings.invert) {
      message += " to inverted";
    } else {
      message += " to default";
    }
    break;
  }
  case "changed animation style": {
    message += ` to ${settings.animation}`;
    break;
  }
  case "timer alarm": {
    message += ` ${settings.playSound ? "enabled" : "disabled"}`;
    break;
  }
  }

  ///////////////////////////////////////////////////////////////////

  return (
    <main className={appStyles}>

      {/* Nav Bar */}
      <header className="nav foreground">
        <div className="nav-left">
          <h4 className="settings-toggle" onClick={() => setShowAbout(true)}>about</h4>
          <h4 className="settings-toggle" onClick={() => onToggleSettings()}>settings</h4>
          <h4 className="settings-toggle" onClick={() => setShowHelp(true)}>controls</h4>
        </div>
        <div className="nav-right" onClick={() => onToggleSound()}>
          <i className={`sound-toggle fa fa-volume-up ${settings.playSound ? "active" : ""}`} />
        </div>
      </header>

      {/* Main Display */}
      <section className="display foreground">
        <h2 className="title settings-toggle" onClick={() => setShowAbout(true)}>Pomomilk</h2>
        <Timer />
        <footer onClick={() => onToggleSettings()}>
          <h3 className="settings-toggle mode">
          ~ <span>{formatMode(settings.mode)}</span> ~
          </h3>
          <h4>
            {settings.step}/{settings.interval * 2}
          </h4>
        </footer>
        <div className="alert-container">
          <h4 className={`alert ${settings.alert ? "show" : ""} alert-${settings.alertTimeout}`}>
            {message}
          </h4>
        </div>
      </section>

      {/* Overlay Components */}
      {showAbout &&
      <About onClose={setShowAbout} />
      }
      {showHelp &&
      <Help onClose={setShowHelp} />
      }
      <Settings />

      {/* Milk Animation */}
      <Milk />

    </main>
  );

};

export default App;
