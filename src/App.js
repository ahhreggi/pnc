import classNames from "classnames";
import Timer from "./components/Timer";
import "./App.scss";
import { useSelector, useDispatch } from "react-redux";
import { setTimer, setTheme } from "./actions";

const App = () => {
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
      <h3 onClick={() => dispatch(setTimer(1500))}>settings</h3>
      <h3 onClick={() => dispatch(setTheme("next"))}>theme: {theme}</h3>
    </main>
  );
};

export default App;
