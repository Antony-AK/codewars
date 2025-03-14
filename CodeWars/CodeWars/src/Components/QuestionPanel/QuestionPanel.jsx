import React, { useState, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import OutputPanel from "../../Components/OutputPanel/OutputPanel";
import "./QuestionPanel.css";

const QuestionPanel = ({ selectedQuestion, output, setOutput, updateQuestionStatus }) => {
  const [language, setLanguage] = useState("c");
  const [predefinedCode, setPredefinedCode] = useState("");
  const [userCode, setUserCode] = useState("");
  const [testResults, setTestResults] = useState([]); // Stores test case results

  useEffect(() => {
    if (selectedQuestion) {
      setPredefinedCode(selectedQuestion.predefinedCode[language] || "");
      setUserCode("");
    }
  }, [selectedQuestion, language]);

  const languages = [
    { value: "c", label: "C" },
    { value: "java", label: "Java" },
    { value: "python", label: "Python" },
  ];

  const handleRunCode = async () => {
    if (!selectedQuestion) return;
    updateQuestionStatus(selectedQuestion._id, "Review");

    try {
      let results = [];
      for (let testCase of selectedQuestion.testCases) {
        const response = await fetch("https://emkc.org/api/v2/piston/execute", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            language,
            version: "*",
            files: [{ content: predefinedCode + userCode }],
            stdin: testCase.input, // Pass test case input
          }),
        });

        const result = await response.json();
        results.push({
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput: result.run.output || "No output",
        });
      }

      setTestResults(results); // Store test results
    } catch (error) {
      console.error("Error running code:", error);
      setOutput("Error executing code.");
    }
  };

  const handleSaveCode = () => {
    if (selectedQuestion) {
      updateQuestionStatus(selectedQuestion._id, "Completed");
    }
  };

  const expectedOutput = selectedQuestion ? selectedQuestion.expectedOutput : "";

  return (
    <div className="main-content">
      {selectedQuestion ? (
        <>
          <div className="difficulty-details ">
            <p>{selectedQuestion.difficulty} : {selectedQuestion.points}</p>
          </div>
          <h2 className="question-title">{selectedQuestion.title}</h2>
          <p className="question-description">{selectedQuestion.description}</p>
        </>
      ) : (
        <p className="placeholder-text">Select a question to start coding.</p>
      )}

      {/* Language Selection */}
      <label className="select-lan-label">Select Language:</label>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>

      {/* Monaco Code Editor */}
      <MonacoEditor
        height="380px"
        width="100%"
        language={language}
        theme="vs-dark"
        value={predefinedCode + userCode}
        onChange={(value) => {
          if (value.startsWith(predefinedCode)) {
            setUserCode(value.slice(predefinedCode.length));
          }
        }}
        options={{
          fontSize: 16,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: "on",
          readOnly: false,
          lineNumbers: "on",
        }}
      />

      {/* Buttons */}
      <div className="button-group">
        <button className="run-btn" onClick={handleRunCode}>Run</button>
        <button className="save-btn" onClick={handleSaveCode}>Save</button>
      </div>

      {/* Output Panel */}
      <OutputPanel output={output} testResults={testResults} expectedOutput={expectedOutput} />
    </div>
  );
};

export default QuestionPanel;
