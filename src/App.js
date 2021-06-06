import classNames from "classnames";
import Timer from "./components/Timer";
import "./App.scss";

const App = () => {
  const theme = "blue";
  const appStyles = classNames({
    App: true,
    [`theme-${theme}`]: true
  });
  return (
    <main className={appStyles}>
      <h2>Pomomilk</h2>
      <Timer />
      <h3>settings</h3>
    </main>
  );
};

export default App;
