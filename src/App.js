// import logo from "./logo.svg";
import "./App.css";
import Connect from "./Components/Connect";
import { Web3Provider } from "./Components/Web3Provider";

function App() {
  return (
    <Web3Provider>
      <div className="connect">
        <Connect />
      </div>
    </Web3Provider>
  );
}

export default App;
