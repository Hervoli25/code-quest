import React, { useState, useEffect } from "react";
import CodePlayground from "./CodePlayground";
import codeChallenges from "./challengesData";

const CodeQuestPlaygroundIntegration = ({
  theme = "fantasy",
  currentSkill = "javascript",
  onSkillProgress = () => {},
  onChallengeComplete = () => {},
  playerStats = {},
  setPlayerStats = () => {},
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState(
    currentSkill || "javascript",
  );
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [completedChallenges, setCompletedChallenges] = useState([]);

  const [showExplanation, setShowExplanation] = useState(false);
  const [challengesHistory, setChallengesHistory] = useState([]);

  // Load completed challenges from player stats on mount
  useEffect(() => {
    if (playerStats && playerStats.completedChallenges) {
      setCompletedChallenges(playerStats.completedChallenges);
    }
  }, [playerStats]);

  // Theme styles
  const themeStyles = {
    fantasy: {
      background: "bg-gradient-to-br from-indigo-100 to-purple-200",
      primary: "bg-indigo-600 hover:bg-indigo-700",
      secondary: "bg-purple-500 hover:bg-purple-600",
      accent: "text-indigo-800",
      panel: "bg-white bg-opacity-80 shadow-lg",
      border: "border-indigo-300",
      text: "text-gray-800",
    },
    cyber: {
      background: "bg-gradient-to-br from-gray-900 to-blue-900",
      primary: "bg-blue-600 hover:bg-blue-700",
      secondary: "bg-green-500 hover:bg-green-600",
      accent: "text-cyan-400",
      panel: "bg-gray-800 bg-opacity-90 shadow-lg",
      border: "border-cyan-700",
      text: "text-gray-100",
    },
    space: {
      background: "bg-gradient-to-br from-gray-800 to-purple-900",
      primary: "bg-purple-600 hover:bg-purple-700",
      secondary: "bg-pink-500 hover:bg-pink-600",
      accent: "text-purple-300",
      panel: "bg-gray-800 bg-opacity-80 shadow-lg",
      border: "border-purple-700",
      text: "text-gray-100",
    },
  };

  const currentTheme = themeStyles[theme];
  const textClass = currentTheme.text;

  // Filter challenges based on selected options
  const filteredChallenges = Object.values(codeChallenges)
    .flat()
    .filter((challenge) => {
      const languageMatch =
        selectedLanguage === "all" || challenge.language === selectedLanguage;
      const categoryMatch =
        selectedCategory === "all" || challenge.category === selectedCategory;
      const difficultyMatch =
        selectedDifficulty === "all" ||
        challenge.difficulty === selectedDifficulty;
      return languageMatch && categoryMatch && difficultyMatch;
    });

  // Get available categories for the selected language
  const availableCategories = [
    ...new Set(
      Object.values(codeChallenges)
        .flat()
        .filter(
          (challenge) =>
            selectedLanguage === "all" ||
            challenge.language === selectedLanguage,
        )
        .map((challenge) => challenge.category),
    ),
  ];

  // Get available difficulties for the selected language
  const availableDifficulties = [
    ...new Set(
      Object.values(codeChallenges)
        .flat()
        .filter(
          (challenge) =>
            selectedLanguage === "all" ||
            challenge.language === selectedLanguage,
        )
        .map((challenge) => challenge.difficulty),
    ),
  ];

  // Handle challenge completion
  const handleChallengeComplete = (challengeId, code) => {
    // Add to completed challenges
    if (!completedChallenges.includes(challengeId)) {
      const newCompletedChallenges = [...completedChallenges, challengeId];
      setCompletedChallenges(newCompletedChallenges);

      // Update player stats
      const updatedStats = {
        ...playerStats,
        completedChallenges: newCompletedChallenges,
        experience: (playerStats.experience || 0) + 50, // Award XP for completing challenge
      };
      setPlayerStats(updatedStats);

      // Add to history
      setChallengesHistory([
        ...challengesHistory,
        {
          id: challengeId,
          title: selectedChallenge.title,
          language: selectedChallenge.language,
          code: code,
          timestamp: new Date().toISOString(),
        },
      ]);

      // Notify parent component
      onChallengeComplete(
        challengeId,
        selectedChallenge.language,
        selectedChallenge.category,
      );
    }

    // Show explanation
    setShowExplanation(true);
  };

  // Handle progress updates
  const handleProgress = (language, code) => {
    onSkillProgress(language, code);
  };

  // Find the next challenge in the current filtered list
  const goToNextChallenge = () => {
    if (!selectedChallenge) return;

    const currentIndex = filteredChallenges.findIndex(
      (c) => c.id === selectedChallenge.id,
    );
    if (currentIndex < filteredChallenges.length - 1) {
      setSelectedChallenge(filteredChallenges[currentIndex + 1]);
      setShowExplanation(false);
    } else {
      // If we're at the last challenge, go back to the challenge list
      setSelectedChallenge(null);
    }
  };

  // Render challenge selection list
  const renderChallengeList = () => {
    return (
      <div className={`${currentTheme.panel} p-6 rounded-xl`}>
        <h2 className={`text-2xl font-bold ${currentTheme.accent} mb-6`}>
          Coding Challenges
        </h2>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Language</label>
            <select
              value={selectedLanguage}
              onChange={(e) => {
                setSelectedLanguage(e.target.value);
                setSelectedCategory("all");
              }}
              className={`w-full p-2 rounded border ${currentTheme.border} bg-opacity-50 bg-white`}
            >
              <option value="all">All Languages</option>

              {/* Basic Languages */}
              <optgroup label="Basic Languages">
                <option value="javascript">JavaScript</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="python">Python</option>
              </optgroup>

              {/* Expanded Language Tracks */}
              <optgroup label="Expanded Language Tracks">
                <option value="java">Java</option>
                <option value="ruby">Ruby</option>
                <option value="go">Go</option>
                <option value="csharp">C#</option>
                <option value="swift">Swift</option>
              </optgroup>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`w-full p-2 rounded border ${currentTheme.border} bg-opacity-50 bg-white`}
            >
              <option value="all">All Categories</option>
              {availableCategories.map((category) => (
                <option key={category} value={category}>
                  {category
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Difficulty</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className={`w-full p-2 rounded border ${currentTheme.border} bg-opacity-50 bg-white`}
            >
              <option value="all">All Difficulties</option>
              {availableDifficulties.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Challenge cards */}
        {filteredChallenges.length === 0 ? (
          <p className="text-center p-6 bg-gray-100 rounded">
            No challenges found with the selected filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredChallenges.map((challenge) => (
              <div
                key={challenge.id}
                onClick={() => {
                  setSelectedChallenge(challenge);
                  setShowExplanation(false);
                }}
                className={`border-2 ${currentTheme.border} rounded-lg p-4 cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-1 relative ${
                  completedChallenges.includes(challenge.id)
                    ? "bg-green-50 border-green-300"
                    : theme === "cyber" || theme === "space"
                      ? "bg-gray-800 border-gray-700 text-white"
                      : "bg-white"
                }`}
              >
                {/* Completion badge */}
                {completedChallenges.includes(challenge.id) && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                    ✓
                  </div>
                )}

                {/* Language badge */}
                <div
                  className={`inline-block px-2 py-1 rounded text-xs mb-2 ${
                    challenge.language === "javascript"
                      ? "bg-yellow-200 text-yellow-900 font-semibold"
                      : challenge.language === "html"
                        ? "bg-orange-200 text-orange-900 font-semibold"
                        : challenge.language === "css"
                          ? "bg-blue-200 text-blue-900 font-semibold"
                          : challenge.language === "python"
                            ? "bg-green-200 text-green-900 font-semibold"
                            : challenge.language === "java"
                              ? "bg-red-200 text-red-900 font-semibold"
                              : challenge.language === "ruby"
                                ? "bg-pink-200 text-pink-900 font-semibold"
                                : challenge.language === "go"
                                  ? "bg-cyan-200 text-cyan-900 font-semibold"
                                  : challenge.language === "csharp"
                                    ? "bg-purple-200 text-purple-900 font-semibold"
                                    : challenge.language === "swift"
                                      ? "bg-indigo-200 text-indigo-900 font-semibold"
                                      : "bg-gray-200 text-gray-900 font-semibold"
                  }`}
                >
                  {challenge.language === "csharp" ? "C#" : challenge.language}
                </div>

                {/* Difficulty badge */}
                <div
                  className={`inline-block px-2 py-1 rounded text-xs mb-2 ml-2 ${
                    challenge.difficulty === "beginner"
                      ? "bg-green-200 text-green-900 font-semibold"
                      : challenge.difficulty === "intermediate"
                        ? "bg-yellow-200 text-yellow-900 font-semibold"
                        : challenge.difficulty === "advanced"
                          ? "bg-orange-200 text-orange-900 font-semibold"
                          : challenge.difficulty === "expert"
                            ? "bg-red-200 text-red-900 font-semibold"
                            : challenge.difficulty === "master"
                              ? "bg-purple-200 text-purple-900 font-semibold"
                              : "bg-gray-200 text-gray-900 font-semibold"
                  }`}
                >
                  <span className="flex items-center">
                    {challenge.difficulty === "expert" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    {challenge.difficulty === "master" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    )}
                    {challenge.difficulty.charAt(0).toUpperCase() +
                      challenge.difficulty.slice(1)}
                  </span>
                </div>

                <h3 className="text-lg font-bold mb-2">{challenge.title}</h3>
                <p className="text-sm mb-4 line-clamp-2">
                  {challenge.description}
                </p>

                <button
                  className={`${currentTheme.primary} text-white px-3 py-1 rounded text-sm w-full`}
                >
                  {completedChallenges.includes(challenge.id)
                    ? "Review Challenge"
                    : "Start Challenge"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Render the selected challenge
  const renderSelectedChallenge = () => {
    if (!selectedChallenge) return null;

    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setSelectedChallenge(null)}
            className={`${currentTheme.secondary} text-white px-4 py-2 rounded-lg`}
          >
            ← Back to Challenges
          </button>

          {!showExplanation && (
            <div className="flex space-x-2">
              {/* Language badge */}
              <div
                className={`${
                  selectedChallenge.language === "javascript"
                    ? "bg-yellow-200 text-yellow-900 font-semibold"
                    : selectedChallenge.language === "html"
                      ? "bg-orange-200 text-orange-900 font-semibold"
                      : selectedChallenge.language === "css"
                        ? "bg-blue-200 text-blue-900 font-semibold"
                        : selectedChallenge.language === "python"
                          ? "bg-green-200 text-green-900 font-semibold"
                          : selectedChallenge.language === "java"
                            ? "bg-red-200 text-red-900 font-semibold"
                            : selectedChallenge.language === "ruby"
                              ? "bg-pink-200 text-pink-900 font-semibold"
                              : selectedChallenge.language === "go"
                                ? "bg-cyan-200 text-cyan-900 font-semibold"
                                : selectedChallenge.language === "csharp"
                                  ? "bg-purple-200 text-purple-900 font-semibold"
                                  : selectedChallenge.language === "swift"
                                    ? "bg-indigo-200 text-indigo-900 font-semibold"
                                    : "bg-gray-200 text-gray-900 font-semibold"
                } px-3 py-1 rounded-lg text-sm font-medium`}
              >
                {selectedChallenge.language === "csharp"
                  ? "C#"
                  : selectedChallenge.language.toUpperCase()}
              </div>

              {/* Difficulty badge */}
              <div
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  selectedChallenge.difficulty === "beginner"
                    ? "bg-green-200 text-green-900 font-semibold"
                    : selectedChallenge.difficulty === "intermediate"
                      ? "bg-yellow-200 text-yellow-900 font-semibold"
                      : selectedChallenge.difficulty === "advanced"
                        ? "bg-orange-200 text-orange-900 font-semibold"
                        : selectedChallenge.difficulty === "expert"
                          ? "bg-red-200 text-red-900 font-semibold"
                          : selectedChallenge.difficulty === "master"
                            ? "bg-purple-200 text-purple-900 font-semibold"
                            : "bg-gray-200 text-gray-900 font-semibold"
                }`}
              >
                <span className="flex items-center">
                  {selectedChallenge.difficulty === "expert" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {selectedChallenge.difficulty === "master" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  )}
                  {selectedChallenge.difficulty.charAt(0).toUpperCase() +
                    selectedChallenge.difficulty.slice(1)}
                </span>
              </div>
            </div>
          )}

          {showExplanation && (
            <button
              onClick={goToNextChallenge}
              className={`${currentTheme.primary} text-white px-4 py-2 rounded-lg`}
            >
              Next Challenge →
            </button>
          )}
        </div>

        {/* Challenge or Explanation */}
        {showExplanation ? (
          <div className={`${currentTheme.panel} p-6 rounded-xl`}>
            <h2 className={`text-2xl font-bold ${currentTheme.accent} mb-4`}>
              Solution Explanation
            </h2>

            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2">
                Challenge: {selectedChallenge.title}
              </h3>
              <p>{selectedChallenge.description}</p>
            </div>

            <div className="p-4 bg-gray-900 text-gray-100 font-mono rounded mb-6 overflow-x-auto">
              <pre>{selectedChallenge.solution}</pre>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2">Explanation</h3>
              <div className={`p-4 bg-yellow-50 text-yellow-800 rounded`}>
                {selectedChallenge.language === "javascript" &&
                  selectedChallenge.category === "variables" && (
                    <div>
                      <p>
                        This solution demonstrates how to declare variables in
                        JavaScript:
                      </p>
                      <ul className="list-disc ml-5 mt-2 space-y-1">
                        <li>
                          <strong>let name = "CodeQuest Player"</strong> -
                          Declares a string variable
                        </li>
                        <li>
                          <strong>let age = 25</strong> - Declares a number
                          variable
                        </li>
                        <li>
                          <strong>let isStudent = true</strong> - Declares a
                          boolean variable
                        </li>
                      </ul>
                      <p className="mt-2">
                        Variables are essential for storing and manipulating
                        data in programming. They allow us to reference values
                        by name rather than the values themselves.
                      </p>
                    </div>
                  )}

                {selectedChallenge.language === "javascript" &&
                  selectedChallenge.category === "conditionals" && (
                    <div>
                      <p>
                        This solution demonstrates conditional statements in
                        JavaScript:
                      </p>
                      <ul className="list-disc ml-5 mt-2 space-y-1">
                        <li>
                          We use <strong>if/else if/else</strong> statements to
                          check different score ranges
                        </li>
                        <li>
                          Conditions are evaluated in order from top to bottom
                        </li>
                        <li>
                          Once a condition is true, its code block runs and the
                          rest are skipped
                        </li>
                      </ul>
                      <p className="mt-2">
                        Conditionals allow your code to make decisions and
                        execute different paths based on different conditions.
                        They're fundamental to creating dynamic programs.
                      </p>
                    </div>
                  )}

                {selectedChallenge.language === "javascript" &&
                  selectedChallenge.category === "loops" && (
                    <div>
                      <p>This solution demonstrates loops in JavaScript:</p>
                      <ul className="list-disc ml-5 mt-2 space-y-1">
                        <li>
                          We initialize a <strong>sum</strong> variable to 0
                        </li>
                        <li>
                          The <strong>for loop</strong> runs from 1 to n, adding
                          each number to the sum
                        </li>
                        <li>
                          <strong>sum += i</strong> is shorthand for{" "}
                          <strong>sum = sum + i</strong>
                        </li>
                      </ul>
                      <p className="mt-2">
                        Loops are powerful tools for repeating actions without
                        duplicating code. They're essential for processing
                        collections of data or performing repetitive tasks.
                      </p>
                    </div>
                  )}

                {/* Add more explanations for other challenges */}
                {(!selectedChallenge.category ||
                  (selectedChallenge.language === "javascript" &&
                    !["variables", "conditionals", "loops"].includes(
                      selectedChallenge.category,
                    ))) && (
                  <div>
                    <p>
                      This solution demonstrates key programming concepts for
                      this challenge:
                    </p>
                    <ul className="list-disc ml-5 mt-2 space-y-1">
                      <li>Breaking down the problem into logical steps</li>
                      <li>
                        Implementing the solution with clean, readable code
                      </li>
                      <li>Testing the solution with different inputs</li>
                    </ul>
                    <p className="mt-2">
                      Great job completing this challenge! Continue practicing
                      to reinforce your programming skills.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setShowExplanation(false)}
                className={`${currentTheme.secondary} text-white px-4 py-2 rounded-lg`}
              >
                Try Again
              </button>

              <button
                onClick={goToNextChallenge}
                className={`${currentTheme.primary} text-white px-4 py-2 rounded-lg`}
              >
                Next Challenge
              </button>
            </div>
          </div>
        ) : (
          <CodePlayground
            defaultCode={selectedChallenge.starterCode}
            language={selectedChallenge.language}
            theme={theme}
            challenge={selectedChallenge}
            onComplete={handleChallengeComplete}
            onProgress={handleProgress}
          />
        )}
      </div>
    );
  };

  return (
    <div className={`${currentTheme.background} p-6 min-h-screen ${textClass}`}>
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold ${currentTheme.accent}`}>
            Code Quest Playground
          </h1>

          {/* Stats summary */}
          <div className={`${currentTheme.panel} p-3 rounded-lg`}>
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm font-medium">Challenges Completed</p>
                <p className="text-2xl font-bold">
                  {completedChallenges.length}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">XP Earned</p>
                <p className="text-2xl font-bold">
                  {completedChallenges.length * 50}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main>
          {selectedChallenge
            ? renderSelectedChallenge()
            : renderChallengeList()}
        </main>
      </div>
    </div>
  );
};

export default CodeQuestPlaygroundIntegration;
