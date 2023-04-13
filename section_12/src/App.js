import { useState, useCallback } from "react";
import Button from "./components/UI/Button/Button";
import DemoOutput from "./Demo/DemoOutput";

import "./App.css";

function App() {
  const [showParagraph, setShowParagraph] = useState(false);

  const handleToggleParagraph = useCallback(() => {
    setShowParagraph((prevParagraph) => !prevParagraph);
  }, []);

  console.log("App Running");

  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={false}/>
      <Button onClick={handleToggleParagraph}>Toggle paragraph</Button>
    </div>
  );
}

export default App;
