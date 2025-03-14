import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CodeEditor from "./Pages/CodeEditor/CodeEditor";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RulePage from "./Pages/RulePage/RulePage";

const App = () => {
  useEffect(() => {
    // Function to enter fullscreen mode
    const enterFullScreen = () => {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen().catch((err) => {
          console.error("Fullscreen failed:", err);
        });
      } else {
        console.warn("Fullscreen API is not supported on this browser.");
      }
      // Remove event listener to avoid multiple calls
      document.removeEventListener("click", enterFullScreen);
    };

    // Add event listener to trigger fullscreen on first user click
    document.addEventListener("click", enterFullScreen);

    // Cleanup on component unmount
    return () => document.removeEventListener("click", enterFullScreen);
  }, []);

  const [output, setOutput] = useState("");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/rules" element={<RulePage />}/>
        <Route path="/code-editor"  element={<CodeEditor output={output} setOutput={setOutput}/>}/>
      </Routes>
    </Router>
      
    
  );
};

export default App;
