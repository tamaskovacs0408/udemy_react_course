import { useState, useCallback } from "react";
import Button from "./components/UI/Button/Button";
import DemoOutput from "./Demo/DemoOutput";

import "./App.css";

function App() {
  const [showParagraph, setShowParagraph] = useState(false);
  const [allowToggle, setAllowToggle] = useState(false);

  const handleToggleParagraph = useCallback(() => {
    if (allowToggle) {
      setShowParagraph((prevParagraph) => !prevParagraph);
    }
  }, [allowToggle]);

  const handleAllowToggle = () => {
    setAllowToggle(true);
  };

  console.log("App Running");

  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={showParagraph} />
      <Button onClick={handleAllowToggle}>Allow toggle</Button>
      <Button onClick={handleToggleParagraph}>Toggle paragraph</Button>
    </div>
  );
}

export default App;
