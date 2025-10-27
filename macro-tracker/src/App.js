import { useEffect } from "react";
import { testFirestore } from "./testFirebase";

function App() {
  useEffect(() => {
    testFirestore();
  }, []);

  return (
    <div className="App">
      <h1>Macro Tracker</h1>
      <p>Check the console for Firebase test results!</p>
    </div>
  );
}

export default App;
