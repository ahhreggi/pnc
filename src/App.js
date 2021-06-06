import classNames from "classnames";
import Clock from "./components/Clock";
import "./App.scss";

const App = () => {
  const appStyles = classNames({
    App: true
  });
  return (
    <main className={appStyles}>
      <header>
        <h1>Pomomilk</h1>
      </header>
      <Clock />
    </main>
  );
};

export default App;
