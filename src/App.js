import { useSelector, useDispatch } from "react-redux";
import { toggleSettings } from "./actions";
import Timer from "./components/Timer";
import Settings from "./components/Settings";
import { stopTimer } from "./actions";
import classNames from "classnames";
import "./App.scss";


const App = () => {

  // State Management
  const { theme, mode, step, interval, visible } = useSelector(state => state.settings);
  const { enabled } = useSelector(state => state.timer);
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

  return (
    <main className={appStyles}>
      <header className="nav">
        <h3 className="settings-toggle settings" onClick={() => onToggleSettings()}>about</h3>
        <h3 className="settings-toggle settings" onClick={() => onToggleSettings()}>settings</h3>
      </header>
      <section className="display">
        <h2>Pomomilk</h2>
        <Timer />
        <h3 className="settings-toggle settings" onClick={() => onToggleSettings()}>~ {mode} ~</h3>
      </section>
      <Settings />
    </main>
  );

};

export default App;
