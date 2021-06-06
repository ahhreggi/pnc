import { useSelector, useDispatch } from "react-redux";
import { toggleSettings } from "./actions";
import Timer from "./components/Timer";
import Settings from "./components/Settings";
import classNames from "classnames";
import "./App.scss";


const App = () => {

  // State Management
  const theme = useSelector(state => state.settings.theme);
  const dispatch = useDispatch();

  // Component Variables
  const appStyles = classNames({
    App: true,
    [`theme-${theme}`]: true
  });

  return (
    <main className={appStyles}>
      <section className="display">
        <h2>Pomomilk</h2>
        <Timer />
        <h3 className="settings-toggle" onClick={() => dispatch(toggleSettings())}>settings</h3>
      </section>
      <Settings />
    </main>
  );

};

export default App;
