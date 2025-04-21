import React, { useState, useEffect } from "react";
import { useRef } from "react";

const CodePlayground = ({
  defaultCode = "",
  language = "javascript",
  theme = "fantasy",
  challenge = null,
  onComplete = () => {},
  onProgress = () => {},
}) => {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hints, setHints] = useState([]);
  const [currentHint, setCurrentHint] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [testResults, setTestResults] = useState([]);
  const editorRef = useRef(null);

  // Theme styles based on game theme
  const themeStyles = {
    fantasy: {
      background: "bg-indigo-100",
      primary: "bg-indigo-600 hover:bg-indigo-700",
      secondary: "bg-purple-500 hover:bg-purple-600",
      accent: "text-indigo-800",
      panel: "bg-white bg-opacity-80 shadow-lg",
      border: "border-indigo-300",
      success: "bg-green-500",
      error: "bg-red-500",
      text: "text-gray-800",
    },
    cyber: {
      background: "bg-gray-900",
      primary: "bg-blue-600 hover:bg-blue-700",
      secondary: "bg-green-500 hover:bg-green-600",
      accent: "text-cyan-400",
      panel: "bg-gray-800 bg-opacity-90 shadow-lg",
      border: "border-cyan-700",
      success: "bg-green-500",
      error: "bg-red-500",
      text: "text-gray-100",
    },
    space: {
      background: "bg-gray-900",
      primary: "bg-purple-600 hover:bg-purple-700",
      secondary: "bg-pink-500 hover:bg-pink-600",
      accent: "text-purple-300",
      panel: "bg-gray-800 bg-opacity-80 shadow-lg",
      border: "border-purple-700",
      success: "bg-green-500",
      error: "bg-red-500",
      text: "text-gray-100",
    },
  };

  const currentTheme = themeStyles[theme] || themeStyles.fantasy;
  const textClass = currentTheme.text;

  // Initialize with challenge data if provided
  useEffect(() => {
    if (challenge) {
      setCode(challenge.starterCode || "");
      setHints(challenge.hints || []);
      setOutput("");
      setIsSuccess(false);
      setHasError(false);
      setShowHint(false);
      setCurrentHint(0);
      setTestResults([]);
    }
  }, [challenge]);

  // Focus editor on mount
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, []);

  // Handle code execution
  const runCode = () => {
    setIsRunning(true);
    setOutput("");
    setHasError(false);
    setTestResults([]);

    // Create a safe output capture
    const outputCapture = [];
    const originalConsoleLog = console.log;
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;

    // Override console methods to capture output
    console.log = (...args) => {
      const output = args
        .map((arg) =>
          typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg),
        )
        .join(" ");
      outputCapture.push({ type: "log", content: output });
    };

    console.error = (...args) => {
      const output = args
        .map((arg) =>
          typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg),
        )
        .join(" ");
      outputCapture.push({ type: "error", content: output });
    };

    console.warn = (...args) => {
      const output = args
        .map((arg) =>
          typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg),
        )
        .join(" ");
      outputCapture.push({ type: "warning", content: output });
    };

    try {
      // Execute code based on language
      if (language === "javascript") {
        // For JavaScript, execute in a sandboxed eval
        const executeCode = new Function(code);
        executeCode();

        // Run tests if challenge is provided
        if (challenge && challenge.tests) {
          const testResults = runTests(challenge.tests);
          setTestResults(testResults);

          // Check if all tests passed
          const allPassed = testResults.every((result) => result.passed);
          if (allPassed) {
            setIsSuccess(true);
            onComplete(challenge.id, code);
          } else {
            setIsSuccess(false);
          }
        }
      } else if (language === "html") {
        // For HTML, we'll handle this in the UI by rendering an iframe
        setOutput(code);
      }
      // Additional language support would be added here
    } catch (error) {
      setHasError(true);
      outputCapture.push({
        type: "error",
        content: `Error: ${error.message}`,
      });
    } finally {
      // Restore original console methods
      console.log = originalConsoleLog;
      console.error = originalConsoleError;
      console.warn = originalConsoleWarn;

      // Update output state
      setOutput(
        outputCapture.map((item, i) => (
          <div
            key={i}
            className={`${
              item.type === "error"
                ? "text-red-500"
                : item.type === "warning"
                  ? "text-yellow-500"
                  : "text-green-400"
            } font-mono whitespace-pre-wrap`}
          >
            {item.content}
          </div>
        )),
      );

      setIsRunning(false);

      // Track progress
      onProgress(language, code);
    }
  };

  // Run tests against user code
  const runTests = (tests) => {
    return tests.map((test) => {
      try {
        // Create a function from the test code
        // This will include the user's code plus the test assertion
        const testFunction = new Function(
          "code",
          `
            // User code
            ${code}
            
            // Test assertion
            try {
              ${test.test}
              return { passed: true, message: "Test passed" };
            } catch (e) {
              return { passed: false, message: e.message };
            }
          `,
        );

        const result = testFunction();
        return {
          description: test.description,
          passed: result.passed,
          message: result.message,
        };
      } catch (error) {
        return {
          description: test.description,
          passed: false,
          message: `Error: ${error.message}`,
        };
      }
    });
  };

  // Show next hint
  const showNextHint = () => {
    if (currentHint < hints.length - 1) {
      setCurrentHint(currentHint + 1);
    }
    setShowHint(true);
  };

  // Reset code to default
  const resetCode = () => {
    if (challenge && challenge.starterCode) {
      setCode(challenge.starterCode);
    } else {
      setCode(defaultCode);
    }
    setOutput("");
    setHasError(false);
    setIsSuccess(false);
  };

  // Render HTML preview if language is HTML
  const renderHTMLPreview = () => {
    if (language !== "html") return null;

    return (
      <div className={`${currentTheme.panel} p-4 rounded-lg mt-4`}>
        <h3 className={`text-lg font-bold ${currentTheme.accent} mb-2`}>
          Preview
        </h3>
        <div className="bg-white w-full h-64 overflow-auto rounded border">
          <iframe
            title="HTML Preview"
            srcDoc={code}
            className="w-full h-full"
            sandbox="allow-scripts"
          />
        </div>
      </div>
    );
  };

  return (
    <div className={`${currentTheme.background} rounded-lg p-6 ${textClass}`}>
      {/* Challenge title and description */}
      {challenge && (
        <div className="mb-4">
          <h2 className={`text-2xl font-bold ${currentTheme.accent} mb-2`}>
            {challenge.title}
          </h2>
          <p className="mb-4">{challenge.description}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Code editor panel */}
        <div className={`${currentTheme.panel} p-4 rounded-lg`}>
          <div className="flex justify-between items-center mb-2">
            <h3 className={`text-lg font-bold ${currentTheme.accent}`}>
              {language.charAt(0).toUpperCase() + language.slice(1)} Editor
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={resetCode}
                className={`px-2 py-1 text-xs rounded ${currentTheme.secondary} text-white`}
              >
                Reset
              </button>
            </div>
          </div>

          {/* Code editor */}
          <div className="relative">
            <textarea
              ref={editorRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={`w-full h-64 bg-gray-900 text-gray-100 font-mono p-4 rounded border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:${currentTheme.accent}`}
              spellCheck="false"
            />

            {/* Language label */}
            <div className="absolute top-2 right-2 bg-gray-800 text-xs text-gray-400 px-2 py-1 rounded">
              {language}
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-between mt-4">
            <button
              onClick={runCode}
              disabled={isRunning}
              className={`${currentTheme.primary} text-white px-4 py-2 rounded-lg disabled:opacity-50`}
            >
              {isRunning ? "Running..." : "Run Code"}
            </button>

            {hints.length > 0 && (
              <button
                onClick={showNextHint}
                className={`${currentTheme.secondary} text-white px-4 py-2 rounded-lg`}
              >
                {showHint ? "Next Hint" : "Show Hint"}
              </button>
            )}
          </div>

          {/* Hint display */}
          {showHint && hints.length > 0 && (
            <div className="mt-4 p-3 bg-yellow-100 text-yellow-800 rounded-lg">
              <p className="font-bold">
                Hint {currentHint + 1}/{hints.length}:
              </p>
              <p>{hints[currentHint]}</p>
            </div>
          )}
        </div>

        {/* Output panel */}
        <div>
          <div className={`${currentTheme.panel} p-4 rounded-lg`}>
            <h3 className={`text-lg font-bold ${currentTheme.accent} mb-2`}>
              Output
            </h3>

            {/* Output display */}
            <div
              className={`bg-gray-900 text-gray-100 font-mono p-4 rounded h-48 overflow-y-auto ${hasError ? "border-red-500 border-2" : isSuccess ? "border-green-500 border-2" : `border ${currentTheme.border}`}`}
            >
              {output.length > 0 ? (
                output
              ) : (
                <span className="text-gray-500">
                  Run your code to see output here...
                </span>
              )}
            </div>

            {/* Success message */}
            {isSuccess && (
              <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-bold">Challenge Completed!</p>
                  <p>Great job! You've successfully solved this challenge.</p>
                </div>
                {challenge && (
                  <button
                    onClick={() => onComplete(challenge.id, code)}
                    className={`${currentTheme.success} text-white px-4 py-2 rounded-lg`}
                  >
                    Continue
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Test results */}
          {testResults.length > 0 && (
            <div className={`${currentTheme.panel} p-4 rounded-lg mt-4`}>
              <h3 className={`text-lg font-bold ${currentTheme.accent} mb-2`}>
                Tests
              </h3>
              <div className="space-y-2">
                {testResults.map((result, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded ${result.passed ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                  >
                    <div className="flex items-center">
                      <span
                        className={`inline-block w-6 h-6 rounded-full mr-2 flex items-center justify-center ${result.passed ? "bg-green-500" : "bg-red-500"} text-white`}
                      >
                        {result.passed ? "✓" : "✗"}
                      </span>
                      <span className="font-medium">{result.description}</span>
                    </div>
                    {!result.passed && (
                      <p className="mt-1 text-sm ml-8">{result.message}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* HTML Preview for HTML language */}
          {language === "html" && renderHTMLPreview()}
        </div>
      </div>
    </div>
  );
};

export default CodePlayground;
