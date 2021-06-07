import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSettings } from "./actions";
import Timer from "./components/Timer";
import About from "./components/About";
import Settings from "./components/Settings";
import { stopTimer } from "./actions";
import classNames from "classnames";
import "./App.scss";


const App = () => {

  const [showAbout, setShowAbout] = useState(false);

  // State Management
  const { theme, mode } = useSelector(state => state.settings);
  const dispatch = useDispatch();

  // Component Variables
  const appStyles = classNames({
    App: true,
    [`theme-${theme}`]: true
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

  return (
    <main className={appStyles}>
      <header className="nav">
        <h3 className="settings-toggle settings" onClick={() => setShowAbout(true)}>about</h3>
        <h3 className="settings-toggle settings" onClick={() => onToggleSettings()}>settings</h3>
      </header>
      <section className="display">
        <h2 className="settings-toggle" onClick={() => setShowAbout(true)}>Pomomilk</h2>
        <Timer />
        <h3 className="settings-toggle settings mode" onClick={() => onToggleSettings()}>
          ~ <span>{formatMode(mode)}</span> ~
        </h3>
      </section>
      {showAbout &&
        <About onClose={setShowAbout} />
      }
      <Settings />
    </main>
  );

};

export default App;
