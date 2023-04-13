import { useState } from "react";
import Button from "./components/UI/Button/Button";
import DemoOutput from "./Demo/DemoOutput";

import "./App.css";

function App() {
  const [showParagraph, setShowParagraph] = useState(false);

  const handleToggleParagraph = () => {
    setShowParagraph((prevParagraph) => !prevParagraph);
  };

  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={showParagraph}/>
      <Button onClick={handleToggleParagraph}>Toggle paragraph</Button>
    </div>
  );
}

export default App;
