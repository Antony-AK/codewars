import React, { useState } from "react";
import "./OutputPanel.css";

const OutputPanel = ({ expectedOutput, output, testCases = [] }) => {
  return (
    <div className="output-panel">
      <h2 className="output-expected-title">Expected Output</h2>
      {expectedOutput && (
        <div className="output-container">
          <pre className="output-content">{expectedOutput}</pre>
        </div>
      )}

      {testCases.length > 0 && (
        <>
          <h2 className="output-title">Test Cases</h2>
          <div className="output-container">
            {testCases.map((testCase, index) => (
              <pre key={index} className="output-content">{testCase}</pre>
            ))}
          </div>
        </>
      )}

      <h2 className="output-title">Output</h2>
      <div className="output-container">
        <pre className="output-content">{output || "// Output will appear here..."}</pre>
      </div>
    </div>
  );
};


export default OutputPanel;
