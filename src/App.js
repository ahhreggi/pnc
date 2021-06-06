import classNames from "classnames";
import Timer from "./components/Timer";
import "./App.scss";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTimer, setTheme } from "./actions";

const App = () => {
  const [state, setState] = useState({
    showSettings: false
  });
  const toggleSettings = () => {
    setState({ ...state, showSettings: !state.showSettings });
  };
  const theme = useSelector(state => state.theme) || "blue";
  const dispatch = useDispatch();
  const appStyles = classNames({
    App: true,
    [`theme-${theme}`]: true
  });
  return (
    <main className={appStyles}>
      <h2>Pomomilk</h2>
      <Timer />
      <h3 onClick={() => toggleSettings()}>settings</h3>
      {state.showSettings &&
        <div className="settings">
          <h3 onClick={() => dispatch(setTheme("next"))}>theme: {theme}</h3>
        </div>
      }
    </main>
  );
};

export default App;
