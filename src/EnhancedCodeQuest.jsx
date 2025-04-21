import React, { useState, useEffect, useCallback } from "react";
import CodeQuestPlaygroundIntegration from "./CodeQuestPlaygroundIntegration";

const EnhancedCodeQuest = () => {
  // State for profile selection
  const [showProfileScreen, setShowProfileScreen] = useState(true);
  const [profiles, setProfiles] = useState([]);
  const [newProfileName, setNewProfileName] = useState("");
  const [selectedProfile, setSelectedProfile] = useState(null);

  // Game state
  const [currentScene, setCurrentScene] = useState("intro");
  const [inventory, setInventory] = useState([]);
  const [playerStats, setPlayerStats] = useState({
    playerName: "",
    experience: 0,
    level: 1,
    skillPoints: 0,
    lastSaved: null,
    totalPlayTime: 0,
    sessionsCompleted: 0,
  });

  // Skills tracking
  const [skills, setSkills] = useState({
    // Core concepts
    variables: 0,
    conditionals: 0,
    loops: 0,
    functions: 0,
    dataStructures: 0,

    // Languages & technologies
    html: 0,
    css: 0,
    javascript: 0,
    python: 0,
    react: 0,
    django: 0,
    flask: 0,
    tailwind: 0,
  });

  // Track completed quests
  const [completedQuests, setCompletedQuests] = useState([]);

  // Audio effects
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Theme selection
  const [theme, setTheme] = useState("fantasy"); // fantasy, cyber, space

  // Animation state
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationMessage, setAnimationMessage] = useState("");

  // Session tracking
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [isAutoSaveEnabled, setIsAutoSaveEnabled] = useState(true);

  // Function declarations
  // These need to be defined before they're used in useEffect

  // Play sound effect
  const playSound = useCallback(
    (soundType) => {
      if (!soundEnabled) return;

      // Sound would be implemented here in a full application
      console.log(`Playing sound: ${soundType}`);
    },
    [soundEnabled],
  );

  // Show animation message
  const triggerAnimation = useCallback(
    (message) => {
      setAnimationMessage(message);
      setShowAnimation(true);
      setTimeout(() => {
        setShowAnimation(false);
      }, 2000);
    },
    [setAnimationMessage, setShowAnimation],
  );

  // Load all profiles from localStorage
  const loadAllProfiles = useCallback(() => {
    try {
      // Get all keys from localStorage that start with codeQuest_profile_
      const profileKeys = Object.keys(localStorage).filter((key) =>
        key.startsWith("codeQuest_profile_"),
      );

      // Extract profile data
      const loadedProfiles = profileKeys.map((key) => {
        const profile = JSON.parse(localStorage.getItem(key));
        return {
          id: key.replace("codeQuest_profile_", ""),
          name: profile.playerName,
          level: profile.level,
          experience: profile.experience,
          lastSaved: profile.lastSaved,
          completedQuests: profile.completedQuests?.length || 0,
        };
      });

      setProfiles(loadedProfiles);
    } catch (error) {
      console.error("Error loading profiles:", error);
      // If error, set to empty array to allow creating new profiles
      setProfiles([]);
    }
  }, []);

  // Save current progress
  const saveProgress = useCallback(
    (isAutoSave = false) => {
      if (!selectedProfile) return false;

      try {
        // Calculate session time
        const sessionTime = sessionStartTime
          ? (new Date() - sessionStartTime) / 1000
          : 0; // in seconds

        // Prepare game state
        const gameState = {
          ...playerStats,
          playerName: playerStats.playerName,
          experience: playerStats.experience,
          level: playerStats.level,
          skillPoints: playerStats.skillPoints,
          inventory: inventory,
          skills: skills,
          completedQuests: completedQuests,
          currentScene: currentScene,
          theme: theme,
          lastSaved: new Date().toISOString(),
          totalPlayTime: (playerStats.totalPlayTime || 0) + sessionTime,
        };

        // Save to localStorage
        localStorage.setItem(
          `codeQuest_profile_${selectedProfile}`,
          JSON.stringify(gameState),
        );

        // Reset session timer
        setSessionStartTime(new Date());

        // Show save animation if not auto-save
        if (!isAutoSave) {
          triggerAnimation("Progress Saved!");
          playSound("save");
        }

        // We'll update profiles list in a separate useEffect
        // to avoid circular dependencies

        return true;
      } catch (error) {
        console.error("Error saving progress:", error);
        return false;
      }
    },
    [
      selectedProfile,
      sessionStartTime,
      playerStats,
      inventory,
      skills,
      completedQuests,
      currentScene,
      theme,
      triggerAnimation,
      playSound,
    ],
  );

  // Load profiles on initial render
  useEffect(() => {
    loadAllProfiles();

    // Start session timer
    setSessionStartTime(new Date());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array means this runs once on mount

  // Set up auto-save interval
  useEffect(() => {
    let autoSaveInterval;
    if (isAutoSaveEnabled && !showProfileScreen) {
      autoSaveInterval = setInterval(() => {
        saveProgress(true); // true for auto-save
      }, 180000); // Auto-save every 3 minutes
    }

    return () => {
      if (autoSaveInterval) clearInterval(autoSaveInterval);
    };
  }, [isAutoSaveEnabled, showProfileScreen, saveProgress]);

  // Update profiles list when selectedProfile changes
  useEffect(() => {
    if (selectedProfile) {
      // This will update the profiles list without creating a circular dependency
      const timeoutId = setTimeout(() => {
        loadAllProfiles();
      }, 500); // Small delay to avoid too many updates

      return () => clearTimeout(timeoutId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProfile, playerStats.lastSaved]);

  // Create a new profile
  const createNewProfile = () => {
    if (!newProfileName.trim()) {
      triggerAnimation("Please enter a name!");
      return;
    }

    // Check if profile name already exists
    if (
      profiles.some(
        (profile) =>
          profile.name.toLowerCase() === newProfileName.toLowerCase(),
      )
    ) {
      triggerAnimation("Profile already exists!");
      return;
    }

    // Create new profile ID (timestamp for uniqueness)
    const profileId = `${Date.now()}`;

    // Initialize new profile with default values
    const newProfile = {
      playerName: newProfileName,
      experience: 0,
      level: 1,
      skillPoints: 0,
      inventory: [],
      skills: { ...skills }, // Start with all skills at 0
      completedQuests: [],
      currentScene: "intro",
      theme: "fantasy",
      lastSaved: new Date().toISOString(),
      totalPlayTime: 0,
      sessionsCompleted: 0,
    };

    // Save to localStorage
    localStorage.setItem(
      `codeQuest_profile_${profileId}`,
      JSON.stringify(newProfile),
    );

    // Update state
    setProfiles([
      ...profiles,
      {
        id: profileId,
        name: newProfileName,
        level: 1,
        experience: 0,
        lastSaved: new Date().toISOString(),
        completedQuests: 0,
      },
    ]);

    // Clear input field
    setNewProfileName("");

    // Auto-select the new profile
    loadProfile(profileId);
  };

  // Load specific profile
  const loadProfile = (profileId) => {
    try {
      const savedData = localStorage.getItem(`codeQuest_profile_${profileId}`);

      if (savedData) {
        const gameState = JSON.parse(savedData);

        // Update all state with saved data
        setPlayerStats({
          ...gameState,
          sessionsCompleted: (gameState.sessionsCompleted || 0) + 1,
        });
        setInventory(gameState.inventory || []);
        setSkills(gameState.skills || {});
        setCompletedQuests(gameState.completedQuests || []);
        setCurrentScene(gameState.currentScene || "intro");
        setTheme(gameState.theme || "fantasy");

        // Set selected profile
        setSelectedProfile(profileId);

        // Hide profile screen
        setShowProfileScreen(false);

        // Trigger welcome back animation
        triggerAnimation(`Welcome back, ${gameState.playerName}!`);
        playSound("success");

        return true;
      }

      return false;
    } catch (error) {
      console.error("Error loading profile:", error);
      return false;
    }
  };

  // Delete profile
  const deleteProfile = (profileId, event) => {
    // Stop event propagation to prevent loading the profile when clicking delete
    event.stopPropagation();

    try {
      // Remove from localStorage
      localStorage.removeItem(`codeQuest_profile_${profileId}`);

      // Update state
      setProfiles(profiles.filter((profile) => profile.id !== profileId));

      triggerAnimation("Profile deleted!");
      playSound("delete");
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  // Log out (return to profile selection)
  const logOut = () => {
    // Save progress before logging out
    saveProgress();

    // Reset to profile selection
    setShowProfileScreen(true);
    setSelectedProfile(null);

    // Reset game state for clean slate
    setCurrentScene("intro");
    setInventory([]);
    setPlayerStats({
      playerName: "",
      experience: 0,
      level: 1,
      skillPoints: 0,
      lastSaved: null,
      totalPlayTime: 0,
      sessionsCompleted: 0,
    });
    setSkills({
      variables: 0,
      conditionals: 0,
      loops: 0,
      functions: 0,
      dataStructures: 0,
      html: 0,
      css: 0,
      javascript: 0,
      python: 0,
      react: 0,
      django: 0,
      flask: 0,
      tailwind: 0,
    });
    setCompletedQuests([]);

    // Profiles will be reloaded by the useEffect that watches selectedProfile
  };

  // Game functions
  const addToInventory = (item) => {
    if (!inventory.includes(item)) {
      setInventory([...inventory, item]);
      playSound("collectItem");
      triggerAnimation(`${item} acquired!`);

      // Auto-save on significant progress
      if (isAutoSaveEnabled) {
        saveProgress(true);
      }
    }
  };

  const updatePlayerStats = (stat, value) => {
    setPlayerStats({
      ...playerStats,
      [stat]: value,
    });
  };

  const updateSkill = (skill, value) => {
    setSkills({
      ...skills,
      [skill]: value,
    });

    // Check for level up
    const totalSkillPoints =
      Object.values(skills).reduce((sum, current) => sum + current, 0) +
      value -
      skills[skill];
    const newLevel = Math.floor(totalSkillPoints / 5) + 1;

    if (newLevel > playerStats.level) {
      levelUp(newLevel);
    }

    // Auto-save on skill increase
    if (isAutoSaveEnabled) {
      saveProgress(true);
    }
  };

  const levelUp = (newLevel) => {
    setPlayerStats({
      ...playerStats,
      level: newLevel,
      skillPoints: playerStats.skillPoints + 1,
    });
    playSound("levelUp");
    triggerAnimation("Level Up!");
  };

  const handleNameInput = (e) => {
    updatePlayerStats("playerName", e.target.value);
  };

  const handleNewProfileNameInput = (e) => {
    setNewProfileName(e.target.value);
  };

  const goToScene = (scene) => {
    setCurrentScene(scene);
    playSound("navigate");

    // Mark quest as completed if moving to outcome scene
    if (
      [
        "htmlComplete",
        "cssComplete",
        "jsComplete",
        "pythonComplete",
        "reactComplete",
        "djangoComplete",
        "flaskComplete",
        "tailwindComplete",
      ].includes(scene)
    ) {
      const quest = scene.replace("Complete", "");
      if (!completedQuests.includes(quest)) {
        setCompletedQuests([...completedQuests, quest]);
        updatePlayerStats("experience", playerStats.experience + 100);

        // Auto-save on quest completion
        if (isAutoSaveEnabled) {
          saveProgress(true);
        }
      }
    }
  };

  const allMainQuestsCompleted = () => {
    const mainQuests = ["variables", "conditionals", "loops", "functions"];
    return mainQuests.every((quest) => skills[quest] > 0);
  };

  const allLanguageQuestsCompleted = () => {
    const languageQuests = [
      "html",
      "css",
      "javascript",
      "python",
      "react",
      "django",
      "flask",
      "tailwind",
    ];
    return languageQuests.every((quest) => skills[quest] > 0);
  };

  // Theme-specific styles
  const themeStyles = {
    fantasy: {
      background: "bg-gradient-to-br from-indigo-100 to-purple-200",
      primary: "bg-indigo-600 hover:bg-indigo-700",
      secondary: "bg-purple-500 hover:bg-purple-600",
      accent: "text-indigo-800",
      panel: "bg-white bg-opacity-80 shadow-lg",
      border: "border-indigo-300",
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
  const textClass = theme === "fantasy" ? "text-gray-800" : "text-gray-100";

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Never";

    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Format playtime
  const formatPlayTime = (seconds) => {
    if (!seconds) return "0m";

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  // Game scenes
  const scenes = {
    intro: (
      <div
        className={`${currentTheme.background} p-8 rounded-xl shadow-2xl min-h-screen flex flex-col items-center justify-center transition-all duration-500`}
      >
        <div
          className={`${currentTheme.panel} p-10 rounded-xl max-w-2xl mx-auto text-center ${textClass}`}
        >
          <h1 className={`text-5xl font-bold ${currentTheme.accent} mb-6`}>
            Code Quest
          </h1>
          <h2 className="text-3xl mb-8">The Path of the Programmer</h2>

          <p className="mb-6 text-lg">
            Welcome, brave soul! You stand at the threshold of a journey that
            will transform you into a master programmer.
          </p>
          <p className="mb-8">
            In this world, code shapes reality, and you will learn to wield its
            power.
          </p>

          <div className="mb-8">
            <label className="block mb-2 text-lg">
              What shall I call you, future coding wizard?
            </label>
            <input
              type="text"
              value={playerStats.playerName}
              onChange={handleNameInput}
              placeholder="Enter your name"
              className={`w-full border ${currentTheme.border} rounded-lg p-3 bg-opacity-30 bg-white ${theme === "fantasy" ? "text-gray-800" : "text-white"} focus:ring-2 focus:ring-opacity-50 focus:ring-indigo-500 focus:outline-none text-center text-xl`}
            />
          </div>

          <div className="mb-6">
            <p className="mb-4">Choose your adventure theme:</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setTheme("fantasy")}
                className={`px-4 py-2 rounded-lg transition-all ${theme === "fantasy" ? "bg-indigo-600 text-white scale-110" : "bg-indigo-200 text-indigo-800"}`}
              >
                Fantasy
              </button>
              <button
                onClick={() => setTheme("cyber")}
                className={`px-4 py-2 rounded-lg transition-all ${theme === "cyber" ? "bg-blue-600 text-white scale-110" : "bg-blue-200 text-blue-800"}`}
              >
                Cyberpunk
              </button>
              <button
                onClick={() => setTheme("space")}
                className={`px-4 py-2 rounded-lg transition-all ${theme === "space" ? "bg-purple-600 text-white scale-110" : "bg-purple-200 text-purple-800"}`}
              >
                Space
              </button>
            </div>
          </div>

          <button
            onClick={() => goToScene("hub")}
            disabled={!playerStats.playerName}
            className={`${currentTheme.primary} text-white text-xl px-8 py-3 rounded-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:transform-none`}
          >
            Begin Your Journey
          </button>

          <p className="mt-6 text-sm opacity-75">
            This adventure will teach you real programming skills across
            multiple languages and frameworks.
            <small>
              Written By{" "}
              <a
                href="Elisee Kajingu"
                className="text-indigo-500 hover:underline"
              >
                Elisee Kajingu
              </a>
            </small>
          </p>
        </div>

        {/* Sound toggle */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="absolute top-4 right-4 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30"
        >
          {soundEnabled ? "🔊" : "🔇"}
        </button>
      </div>
    ),

    hub: (
      <div
        className={`${currentTheme.background} p-6 min-h-screen ${textClass}`}
      >
        <div className="max-w-6xl mx-auto">
          <header className="flex justify-between items-center mb-8">
            <h1 className={`text-3xl font-bold ${currentTheme.accent}`}>
              Code Quest: Central Hub
            </h1>

            {/* User profile & controls */}
            <div className="flex items-center space-x-4">
              <div className={`${currentTheme.panel} p-2 rounded-lg`}>
                <div className="flex items-center gap-2">
                  <img
                    src={`https://avatar.iran.liara.run/public/${playerStats.playerName}`}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-bold">{playerStats.playerName}</p>
                    <p className="text-xs">
                      Level: {playerStats.level} • XP: {playerStats.experience}
                    </p>
                  </div>
                </div>
              </div>

              {/* Dropdown menu for user actions */}
              <div className="relative group">
                <button
                  className={`${currentTheme.primary} p-2 rounded-lg text-white`}
                >
                  ☰
                </button>
                <div
                  className={`absolute right-0 mt-2 w-48 ${currentTheme.panel} rounded-lg shadow-xl z-10 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300`}
                >
                  <div className="flex flex-col">
                    <button
                      onClick={() => saveProgress()}
                      className={`px-4 py-2 text-left hover:${currentTheme.primary} hover:text-white transition-colors`}
                    >
                      Save Progress
                    </button>
                    <button
                      onClick={() => setIsAutoSaveEnabled(!isAutoSaveEnabled)}
                      className={`px-4 py-2 text-left hover:${currentTheme.primary} hover:text-white transition-colors`}
                    >
                      {isAutoSaveEnabled ? "Disable" : "Enable"} Auto-Save
                    </button>
                    <button
                      onClick={() => goToScene("profile")}
                      className={`px-4 py-2 text-left hover:${currentTheme.primary} hover:text-white transition-colors`}
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => setSoundEnabled(!soundEnabled)}
                      className={`px-4 py-2 text-left hover:${currentTheme.primary} hover:text-white transition-colors`}
                    >
                      {soundEnabled ? "Mute" : "Unmute"} Sound
                    </button>
                    <button
                      onClick={logOut}
                      className={`px-4 py-2 text-left hover:bg-red-500 hover:text-white transition-colors`}
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Save indicator */}
          <div className="fixed bottom-4 right-4">
            <div
              className={`text-xs ${playerStats.lastSaved ? "opacity-50" : "opacity-0"} transition-opacity`}
            >
              {playerStats.lastSaved
                ? `Last saved: ${formatDate(playerStats.lastSaved)}`
                : ""}
            </div>
          </div>

          {/* Auto-save indicator */}
          {isAutoSaveEnabled && (
            <div className="fixed bottom-4 left-4 bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
              Auto-save enabled
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main quests panel */}
            <div className={`${currentTheme.panel} p-6 rounded-xl col-span-1`}>
              <h2 className={`text-2xl font-bold mb-4 ${currentTheme.accent}`}>
                Coding Fundamentals
              </h2>
              <p className="mb-4">
                Master the basics that apply to all programming languages:
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => goToScene("variables")}
                  className={`w-full ${skills.variables > 0 ? "bg-green-600 hover:bg-green-700" : currentTheme.primary} text-white p-3 rounded-lg flex justify-between items-center`}
                  disabled={skills.variables > 3}
                >
                  <span>Variables & Data Types</span>
                  {skills.variables > 0 && <span>✓</span>}
                </button>

                <button
                  onClick={() => goToScene("conditionals")}
                  className={`w-full ${skills.conditionals > 0 ? "bg-green-600 hover:bg-green-700" : currentTheme.primary} text-white p-3 rounded-lg flex justify-between items-center`}
                  disabled={skills.conditionals > 3}
                >
                  <span>Conditionals & Logic</span>
                  {skills.conditionals > 0 && <span>✓</span>}
                </button>

                <button
                  onClick={() => goToScene("loops")}
                  className={`w-full ${skills.loops > 0 ? "bg-green-600 hover:bg-green-700" : currentTheme.primary} text-white p-3 rounded-lg flex justify-between items-center`}
                  disabled={skills.loops > 3}
                >
                  <span>Loops & Iteration</span>
                  {skills.loops > 0 && <span>✓</span>}
                </button>

                <button
                  onClick={() => goToScene("functions")}
                  className={`w-full ${skills.functions > 0 ? "bg-green-600 hover:bg-green-700" : currentTheme.primary} text-white p-3 rounded-lg flex justify-between items-center`}
                  disabled={skills.functions > 3}
                >
                  <span>Functions & Methods</span>
                  {skills.functions > 0 && <span>✓</span>}
                </button>

                <button
                  onClick={() => goToScene("dataStructures")}
                  className={`w-full ${skills.dataStructures > 0 ? "bg-green-600 hover:bg-green-700" : currentTheme.primary} text-white p-3 rounded-lg flex justify-between items-center`}
                  disabled={
                    skills.dataStructures > 3 || !allMainQuestsCompleted()
                  }
                >
                  <span>Data Structures</span>
                  {!allMainQuestsCompleted() && <span>🔒</span>}
                  {skills.dataStructures > 0 && <span>✓</span>}
                </button>
              </div>
            </div>

            {/* Frontend quest panel */}
            <div className={`${currentTheme.panel} p-6 rounded-xl col-span-1`}>
              <h2 className={`text-2xl font-bold mb-4 ${currentTheme.accent}`}>
                Frontend Development
              </h2>
              <p className="mb-4">
                Build the visible parts of websites and applications:
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => goToScene("html")}
                  className={`w-full ${skills.html > 0 ? "bg-green-600 hover:bg-green-700" : currentTheme.primary} text-white p-3 rounded-lg flex justify-between items-center`}
                  disabled={skills.html > 3}
                >
                  <span>HTML - Structure</span>
                  {skills.html > 0 && <span>✓</span>}
                </button>

                <button
                  onClick={() => goToScene("css")}
                  className={`w-full ${skills.css > 0 ? "bg-green-600 hover:bg-green-700" : currentTheme.primary} text-white p-3 rounded-lg flex justify-between items-center`}
                  disabled={skills.css > 3 || skills.html === 0}
                >
                  <span>CSS - Styling</span>
                  {skills.html === 0 && <span>🔒</span>}
                  {skills.css > 0 && <span>✓</span>}
                </button>

                <button
                  onClick={() => goToScene("javascript")}
                  className={`w-full ${skills.javascript > 0 ? "bg-green-600 hover:bg-green-700" : currentTheme.primary} text-white p-3 rounded-lg flex justify-between items-center`}
                  disabled={
                    skills.javascript > 3 ||
                    skills.html === 0 ||
                    skills.css === 0
                  }
                >
                  <span>JavaScript - Interactivity</span>
                  {(skills.html === 0 || skills.css === 0) && <span>🔒</span>}
                  {skills.javascript > 0 && <span>✓</span>}
                </button>

                <button
                  onClick={() => goToScene("tailwind")}
                  className={`w-full ${skills.tailwind > 0 ? "bg-green-600 hover:bg-green-700" : currentTheme.primary} text-white p-3 rounded-lg flex justify-between items-center`}
                  disabled={skills.tailwind > 3 || skills.css === 0}
                >
                  <span>Tailwind CSS</span>
                  {skills.css === 0 && <span>🔒</span>}
                  {skills.tailwind > 0 && <span>✓</span>}
                </button>

                <button
                  onClick={() => goToScene("react")}
                  className={`w-full ${skills.react > 0 ? "bg-green-600 hover:bg-green-700" : currentTheme.primary} text-white p-3 rounded-lg flex justify-between items-center`}
                  disabled={skills.react > 3 || skills.javascript === 0}
                >
                  <span>React Framework</span>
                  {skills.javascript === 0 && <span>🔒</span>}
                  {skills.react > 0 && <span>✓</span>}
                </button>
              </div>
            </div>

            {/* Backend quest panel */}
            <div className={`${currentTheme.panel} p-6 rounded-xl col-span-1`}>
              <h2 className={`text-2xl font-bold mb-4 ${currentTheme.accent}`}>
                Backend Development
              </h2>
              <p className="mb-4">
                Create the logic and data systems powering applications:
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => goToScene("python")}
                  className={`w-full ${skills.python > 0 ? "bg-green-600 hover:bg-green-700" : currentTheme.primary} text-white p-3 rounded-lg flex justify-between items-center`}
                  disabled={skills.python > 3 || !allMainQuestsCompleted()}
                >
                  <span>Python Basics</span>
                  {!allMainQuestsCompleted() && <span>🔒</span>}
                  {skills.python > 0 && <span>✓</span>}
                </button>

                <button
                  onClick={() => goToScene("flask")}
                  className={`w-full ${skills.flask > 0 ? "bg-green-600 hover:bg-green-700" : currentTheme.primary} text-white p-3 rounded-lg flex justify-between items-center`}
                  disabled={skills.flask > 3 || skills.python === 0}
                >
                  <span>Flask Framework</span>
                  {skills.python === 0 && <span>🔒</span>}
                  {skills.flask > 0 && <span>✓</span>}
                </button>

                <button
                  onClick={() => goToScene("django")}
                  className={`w-full ${skills.django > 0 ? "bg-green-600 hover:bg-green-700" : currentTheme.primary} text-white p-3 rounded-lg flex justify-between items-center`}
                  disabled={skills.django > 3 || skills.python === 0}
                >
                  <span>Django Framework</span>
                  {skills.python === 0 && <span>🔒</span>}
                  {skills.django > 0 && <span>✓</span>}
                </button>

                <button
                  onClick={() =>
                    allLanguageQuestsCompleted()
                      ? goToScene("finalProject")
                      : null
                  }
                  className={`w-full ${allLanguageQuestsCompleted() ? currentTheme.secondary : "bg-gray-400"} text-white p-3 rounded-lg flex justify-between items-center`}
                  disabled={!allLanguageQuestsCompleted()}
                >
                  <span>Final Project</span>
                  {!allLanguageQuestsCompleted() && <span>🔒</span>}
                </button>
              </div>
            </div>
          </div>

          {/* Code Playground Button - Add this to your hub scene */}
          <div className={`${currentTheme.panel} p-6 rounded-xl mt-4`}>
            <div className="flex items-center justify-between">
              <div>
                <h2
                  className={`text-2xl font-bold ${currentTheme.accent} mb-2`}
                >
                  Interactive Code Playground
                </h2>
                <p className="mb-2">
                  Practice your coding skills with interactive challenges and
                  earn XP!
                </p>
                <p className="text-sm opacity-75">
                  Solve challenges in JavaScript, HTML, CSS, Python and more.
                </p>
              </div>

              <button
                onClick={() => goToScene("playground")}
                className={`${currentTheme.primary} text-white px-6 py-3 rounded-lg`}
              >
                Open Playground
              </button>
            </div>
          </div>

          {/* Player status and inventory */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className={`${currentTheme.panel} p-6 rounded-xl`}>
              <h2 className={`text-2xl font-bold mb-4 ${currentTheme.accent}`}>
                Player Status
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p>
                    <strong>Name:</strong> {playerStats.playerName}
                  </p>
                  <p>
                    <strong>Level:</strong> {playerStats.level}
                  </p>
                  <p>
                    <strong>Experience:</strong> {playerStats.experience}
                  </p>
                  <p>
                    <strong>Skill Points:</strong> {playerStats.skillPoints}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Quests Completed:</strong> {completedQuests.length}
                  </p>
                  <p>
                    <strong>Play Time:</strong>{" "}
                    {formatPlayTime(playerStats.totalPlayTime)}
                  </p>
                  <p>
                    <strong>Sessions:</strong> {playerStats.sessionsCompleted}
                  </p>
                  <div className="mt-2">
                    <div className="w-full bg-gray-300 rounded-full h-4">
                      <div
                        className="bg-green-600 h-4 rounded-full"
                        style={{
                          width: `${Math.min((completedQuests.length / 13) * 100, 100)}%`,
                        }}
                      ></div>
                    </div>
                    <p className="text-xs mt-1 text-center">
                      {completedQuests.length}/13 Complete
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${currentTheme.panel} p-6 rounded-xl`}>
              <h2 className={`text-2xl font-bold mb-4 ${currentTheme.accent}`}>
                Inventory
              </h2>
              {inventory.length === 0 ? (
                <p>Your inventory is empty. Complete quests to earn items!</p>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {inventory.map((item, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded border ${currentTheme.border}`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Level up animation */}
        {showAnimation && (
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-yellow-400 text-yellow-900 text-3xl font-bold py-4 px-8 rounded-lg animate-bounce shadow-lg">
              {animationMessage}
            </div>
          </div>
        )}
      </div>
    ),

    // Profile screen
    profile: (
      <div
        className={`${currentTheme.background} p-6 min-h-screen ${textClass}`}
      >
        <div className="max-w-4xl mx-auto">
          <header className="flex justify-between items-center mb-8">
            <h1 className={`text-3xl font-bold ${currentTheme.accent}`}>
              Player Profile
            </h1>
            <button
              onClick={() => goToScene("hub")}
              className={`${currentTheme.primary} text-white px-4 py-2 rounded-lg`}
            >
              Back to Hub
            </button>
          </header>

          <div className={`${currentTheme.panel} p-6 rounded-xl mb-6`}>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar and basic info */}
              <div className="text-center md:w-1/3">
                <img
                  src={`https://avatar.iran.liara.run/public/${playerStats.playerName}`}
                  alt="Avatar"
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <h2 className="text-2xl font-bold">{playerStats.playerName}</h2>
                <p className="text-lg">Level {playerStats.level} Coder</p>
                <div className="mt-4">
                  <div className="bg-gray-300 rounded-full h-4 mb-1">
                    <div
                      className="bg-green-600 h-4 rounded-full"
                      style={{
                        width: `${Math.min(((playerStats.experience % 500) / 500) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-sm">
                    XP: {playerStats.experience} / Next Level:{" "}
                    {(Math.floor(playerStats.experience / 500) + 1) * 500}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="md:w-2/3">
                <h3 className={`text-xl font-bold ${currentTheme.accent} mb-4`}>
                  Statistics
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p>
                      <strong>Quests Completed:</strong>{" "}
                      {completedQuests.length}/13
                    </p>
                    <p>
                      <strong>Items Collected:</strong> {inventory.length}
                    </p>
                    <p>
                      <strong>Skill Points:</strong> {playerStats.skillPoints}
                    </p>
                    <p>
                      <strong>Total Play Time:</strong>{" "}
                      {formatPlayTime(playerStats.totalPlayTime)}
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Profile Created:</strong>{" "}
                      {new Date(playerStats.lastSaved).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Sessions:</strong> {playerStats.sessionsCompleted}
                    </p>
                    <p>
                      <strong>Last Saved:</strong>{" "}
                      {formatDate(playerStats.lastSaved)}
                    </p>
                    <p>
                      <strong>Auto-Save:</strong>{" "}
                      {isAutoSaveEnabled ? "Enabled" : "Disabled"}
                    </p>
                  </div>
                </div>

                {/* Skills progress */}
                <h3
                  className={`text-xl font-bold ${currentTheme.accent} mt-6 mb-4`}
                >
                  Skills Progress
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {Object.entries(skills).map(([skill, level]) => (
                    <div key={skill} className="border rounded p-2">
                      <p className="font-bold capitalize">{skill}</p>
                      <div className="flex items-center gap-1">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-4 h-4 rounded-full ${i < level ? "bg-green-600" : "bg-gray-300"}`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={() => saveProgress()}
                className={`${currentTheme.primary} text-white px-6 py-2 rounded-lg`}
              >
                Save Progress
              </button>
              <button
                onClick={() => setIsAutoSaveEnabled(!isAutoSaveEnabled)}
                className={`${isAutoSaveEnabled ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"} text-white px-6 py-2 rounded-lg`}
              >
                {isAutoSaveEnabled ? "Disable" : "Enable"} Auto-Save
              </button>
              <button
                onClick={logOut}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>

        {/* Animation overlay */}
        {showAnimation && (
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-yellow-400 text-yellow-900 text-2xl font-bold py-4 px-8 rounded-lg animate-bounce shadow-lg">
              {animationMessage}
            </div>
          </div>
        )}
      </div>
    ),

    // Playground scene
    playground: (
      <div
        className={`${currentTheme.background} p-6 min-h-screen ${textClass}`}
      >
        <div className="max-w-6xl mx-auto">
          <header className="flex justify-between items-center mb-8">
            <h1 className={`text-3xl font-bold ${currentTheme.accent}`}>
              Code Playground
            </h1>
            <div className="flex items-center space-x-4">
              <div className={`${currentTheme.panel} p-2 rounded-lg`}>
                <div className="flex items-center gap-2">
                  <div>
                    <p className="font-bold">{playerStats.playerName}</p>
                    <p className="text-xs">
                      Level: {playerStats.level} • XP: {playerStats.experience}
                    </p>
                  </div>
                </div>
              </div>

              {/* Back to hub button */}
              <button
                onClick={() => goToScene("hub")}
                className={`${currentTheme.primary} text-white px-4 py-2 rounded-lg`}
              >
                Back to Hub
              </button>
            </div>
          </header>

          {/* Code Playground Integration */}
          <CodeQuestPlaygroundIntegration
            theme={theme}
            currentSkill={
              skills.javascript > 0
                ? "javascript"
                : skills.html > 0
                  ? "html"
                  : skills.python > 0
                    ? "python"
                    : "javascript"
            }
            onSkillProgress={() => {
              // Update player skills based on progress
              // This is called when a player is working on a challenge
              // but hasn't completed it yet
            }}
            onChallengeComplete={(challengeId, language) => {
              // Award XP and update progress
              if (language === "javascript")
                updateSkill("javascript", skills.javascript + 1);
              if (language === "html") updateSkill("html", skills.html + 1);
              if (language === "css") updateSkill("css", skills.css + 1);
              if (language === "python")
                updateSkill("python", skills.python + 1);

              // Add to inventory based on language
              addToInventory(
                `${language.charAt(0).toUpperCase() + language.slice(1)} Certificate`,
              );

              // Auto-save on challenge completion
              if (isAutoSaveEnabled) {
                saveProgress(true);
              }
            }}
            playerStats={playerStats}
            setPlayerStats={(newStats) => {
              // Update player stats
              setPlayerStats(newStats);

              // Check for level up based on new experience
              const currentLevel = playerStats.level;
              const newLevel = Math.floor(newStats.experience / 500) + 1;

              if (newLevel > currentLevel) {
                levelUp(newLevel);
              }
            }}
          />
        </div>
      </div>
    ),
    // FUNDAMENTAL CONCEPT QUESTS

    variables: (
      <div
        className={`${currentTheme.background} p-6 min-h-screen ${textClass}`}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-3xl font-bold ${currentTheme.accent} mb-6`}>
            Variables & Data Types
          </h1>

          <div className={`${currentTheme.panel} p-6 rounded-xl mb-6`}>
            <p className="mb-4">
              Variables are containers for storing data values. In programming,
              we use them to temporarily hold information that can be referenced
              and manipulated in a computer program.
            </p>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>
                Common Data Types:
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Strings:</strong> Text values like "Hello World"
                </li>
                <li>
                  <strong>Numbers:</strong> Integers (42) or floating-point
                  (3.14)
                </li>
                <li>
                  <strong>Booleans:</strong> True or False values
                </li>
                <li>
                  <strong>Arrays/Lists:</strong> Collections of values [1, 2, 3]
                </li>
                <li>
                  <strong>Objects/Dictionaries:</strong> Collections of
                  key-value pairs
                </li>
              </ul>
            </div>

            <div className="bg-gray-100 p-4 rounded font-mono text-sm text-gray-800 mb-6">
              <p className="text-gray-500">// JavaScript example</p>
              <p>let name = "Alice";</p>
              <p>let age = 25;</p>
              <p>let isStudent = true;</p>
              <p>let hobbies = ["reading", "coding", "gaming"];</p>
              <p>
                let person = {"{"} name: "Bob", age: 30 {"}"};
              </p>
              <br />
              <p className="text-gray-500">// Python example</p>
              <p>name = "Alice"</p>
              <p>age = 25</p>
              <p>is_student = True</p>
              <p>hobbies = ["reading", "coding", "gaming"]</p>
              <p>
                person = {"{"}"name": "Bob", "age": 30{"}"}
              </p>
            </div>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>
                Real-World Application:
              </h3>
              <p>Variables are used everywhere in programming:</p>
              <ul className="list-disc pl-5">
                <li>Storing user information (name, email, preferences)</li>
                <li>Tracking game states (score, lives, position)</li>
                <li>Managing application settings</li>
                <li>Calculating and displaying data</li>
              </ul>
            </div>

            <div className="bg-yellow-100 p-4 rounded text-yellow-800 mb-6">
              <h3 className="font-bold">Challenge:</h3>
              <p>
                If a variable <code>score</code> starts at 0 and increases by 10
                with each correct answer, what's the value after 7 correct
                answers?
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => {
                  updateSkill("variables", skills.variables + 1);
                  addToInventory("Variable Scroll");
                  goToScene("hub");
                }}
                className={`${currentTheme.primary} text-white px-6 py-2 rounded-lg`}
              >
                Complete Quest (Answer: 70)
              </button>

              <button
                onClick={() => goToScene("hub")}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg"
              >
                Return to Hub
              </button>
            </div>
          </div>
        </div>
      </div>
    ),

    conditionals: (
      <div
        className={`${currentTheme.background} p-6 min-h-screen ${textClass}`}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-3xl font-bold ${currentTheme.accent} mb-6`}>
            Conditionals & Logic
          </h1>

          <div className={`${currentTheme.panel} p-6 rounded-xl mb-6`}>
            <p className="mb-4">
              Conditional statements help your program make decisions. They
              allow different code to execute depending on whether a condition
              is true or false.
            </p>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>
                Key Concepts:
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>if statements:</strong> Execute code if a condition is
                  true
                </li>
                <li>
                  <strong>else statements:</strong> Execute alternative code if
                  the condition is false
                </li>
                <li>
                  <strong>else if:</strong> Check multiple conditions in
                  sequence
                </li>
                <li>
                  <strong>Comparison operators:</strong> ==, !=, &gt;, &lt;,
                  &gt;=, &lt;=
                </li>
                <li>
                  <strong>Logical operators:</strong> AND (&&), OR (||), NOT (!)
                </li>
              </ul>
            </div>

            <div className="bg-gray-100 p-4 rounded font-mono text-sm text-gray-800 mb-6">
              <p className="text-gray-500">// JavaScript example</p>
              <p>let temperature = 75;</p>
              <p>if (temperature &gt; 90) {"{"}</p>
              <p> console.log("It's hot outside!");</p>
              <p>
                {"}"} else if (temperature &gt; 70) {"{"}
              </p>
              <p> console.log("It's warm outside.");</p>
              <p>
                {"}"} else {"{"}
              </p>
              <p> console.log("It's cool outside.");</p>
              <p>{"}"}</p>
              <br />
              <p className="text-gray-500"># Python example</p>
              <p>temperature = 75</p>
              <p>if temperature &gt; 90:</p>
              <p> print("It's hot outside!")</p>
              <p>elif temperature &gt; 70:</p>
              <p> print("It's warm outside.")</p>
              <p>else:</p>
              <p> print("It's cool outside.")</p>
            </div>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>
                Real-World Application:
              </h3>
              <p>
                Conditionals are used to create branching logic in applications:
              </p>
              <ul className="list-disc pl-5">
                <li>User authentication (if password correct, allow access)</li>
                <li>Form validation (if email format invalid, show error)</li>
                <li>Game mechanics (if player health = 0, game over)</li>
                <li>
                  Responsive design (if screen size &lt; 768px, show mobile
                  layout)
                </li>
              </ul>
            </div>

            <div className="bg-yellow-100 p-4 rounded text-yellow-800 mb-6">
              <h3 className="font-bold">Challenge:</h3>
              <p>What will this code output?</p>
              <pre className="font-mono text-sm mt-2">
                {`let score = 85;
if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else if (score >= 70) {
  console.log("Grade: C");
} else {
  console.log("Grade: D or F");
}`}
              </pre>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => {
                  updateSkill("conditionals", skills.conditionals + 1);
                  addToInventory("Logic Crystal");
                  goToScene("hub");
                }}
                className={`${currentTheme.primary} text-white px-6 py-2 rounded-lg`}
              >
                Complete Quest (Answer: Grade: B)
              </button>

              <button
                onClick={() => goToScene("hub")}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg"
              >
                Return to Hub
              </button>
            </div>
          </div>
        </div>
      </div>
    ),

    loops: (
      <div
        className={`${currentTheme.background} p-6 min-h-screen ${textClass}`}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-3xl font-bold ${currentTheme.accent} mb-6`}>
            Loops & Iteration
          </h1>

          <div className={`${currentTheme.panel} p-6 rounded-xl mb-6`}>
            <p className="mb-4">
              Loops allow you to execute a block of code multiple times. They're
              essential for working with collections of data or performing
              repetitive tasks efficiently.
            </p>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>
                Common Loop Types:
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>for loops:</strong> Execute code a specific number of
                  times
                </li>
                <li>
                  <strong>while loops:</strong> Execute code as long as a
                  condition is true
                </li>
                <li>
                  <strong>for...of / for...in:</strong> Iterate over elements in
                  arrays or objects
                </li>
                <li>
                  <strong>forEach / map:</strong> Higher-order array methods for
                  iteration
                </li>
              </ul>
            </div>

            <div className="bg-gray-100 p-4 rounded font-mono text-sm text-gray-800 mb-6">
              <p className="text-gray-500">// JavaScript for loop</p>
              <p>for (let i = 0; i &lt; 5; i++) {"{"}</p>
              <p> console.log("Iteration: " + i);</p>
              <p>{"}"}</p>
              <br />
              <p className="text-gray-500">// JavaScript while loop</p>
              <p>let count = 0;</p>
              <p>while (count &lt; 5) {"{"}</p>
              <p> console.log("Count: " + count);</p>
              <p> count++;</p>
              <p>{"}"}</p>
              <br />
              <p className="text-gray-500"># Python for loop</p>

              <p>for i in range(5):</p>
              <p>
                {" "}
                print(f"Iteration: {"{"} i {"}"}")
              </p>

              <br />
              <p className="text-gray-500"># Python while loop</p>

              <p>count = 0</p>
              <p>while count &lt; 5:</p>
              <p>
                {" "}
                print(f"Count: {"{"} count {"}"}")
              </p>
              <p> count += 1</p>
            </div>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>
                Real-World Application:
              </h3>
              <p>Loops are essential for many programming tasks:</p>
              <ul className="list-disc pl-5">
                <li>Processing items in a shopping cart</li>
                <li>Rendering a list of search results</li>
                <li>Batch processing data from databases</li>
                <li>Animation frames and game loops</li>
                <li>Implementing algorithms that require iteration</li>
              </ul>
            </div>

            <div className="bg-yellow-100 p-4 rounded text-yellow-800 mb-6">
              <h3 className="font-bold">Challenge:</h3>
              <p>What is the sum of all numbers from 1 to 10 using a loop?</p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => {
                  updateSkill("loops", skills.loops + 1);
                  addToInventory("Loop Talisman");
                  goToScene("hub");
                }}
                className={`${currentTheme.primary} text-white px-6 py-2 rounded-lg`}
              >
                Complete Quest (Answer: 55)
              </button>

              <button
                onClick={() => goToScene("hub")}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg"
              >
                Return to Hub
              </button>
            </div>
          </div>
        </div>
      </div>
    ),

    functions: (
      <div
        className={`${currentTheme.background} p-6 min-h-screen ${textClass}`}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-3xl font-bold ${currentTheme.accent} mb-6`}>
            Functions & Methods
          </h1>

          <div className={`${currentTheme.panel} p-6 rounded-xl mb-6`}>
            <p className="mb-4">
              Functions are reusable blocks of code designed to perform specific
              tasks. They help organize code, reduce repetition, and improve
              maintainability.
            </p>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>
                Key Concepts:
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Function declaration:</strong> Defining a function
                </li>
                <li>
                  <strong>Parameters:</strong> Inputs that a function accepts
                </li>
                <li>
                  <strong>Return values:</strong> Output that a function
                  provides
                </li>
                <li>
                  <strong>Arrow functions:</strong> A concise way to write
                  functions (JavaScript)
                </li>
                <li>
                  <strong>Methods:</strong> Functions that belong to objects or
                  classes
                </li>
              </ul>
            </div>

            <div className="bg-gray-100 p-4 rounded font-mono text-sm text-gray-800 mb-6">
              <p className="text-gray-500">
                // JavaScript function declaration
              </p>
              <p>function greet(name) {"{"}</p>
              <p> return "Hello, " + name + "!";</p>
              <p>{"}"}</p>
              <p>console.log(greet("Alice")); // Output: Hello, Alice!</p>
              <br />
              <p className="text-gray-500">// JavaScript arrow function</p>
              <p>const add = (a, b) =&gt; {"{"}</p>
              <p> return a + b;</p>
              <p>{"}"};</p>
              <p>console.log(add(5, 3)); // Output: 8</p>
              <br />
              <p className="text-gray-500"># Python function</p>
              <p>def greet(name):</p>
              <p>
                {" "}
                return f"Hello, {"{"} name {"}"}!"
              </p>
              <p>print(greet("Alice")) # Output: Hello, Alice!</p>
              <br />
              <p className="text-gray-500">
                # Python lambda function (similar to arrow functions)
              </p>
              <p>add = lambda a, b: a + b</p>
              <p>print(add(5, 3)) # Output: 8</p>
            </div>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>
                Real-World Application:
              </h3>
              <p>Functions are the building blocks of programming:</p>
              <ul className="list-disc pl-5">
                <li>Event handlers in user interfaces</li>
                <li>Data processing and transformations</li>
                <li>API endpoints in web servers</li>
                <li>Encapsulating business logic</li>
                <li>Creating reusable utilities</li>
              </ul>
            </div>

            <div className="bg-yellow-100 p-4 rounded text-yellow-800 mb-6">
              <h3 className="font-bold">Challenge:</h3>
              <p>
                What will this function return when called with calculateArea(4,
                5)?
              </p>
              <pre className="font-mono text-sm mt-2">
                {`function calculateArea(length, width) {
  return length * width;
}`}
              </pre>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => {
                  updateSkill("functions", skills.functions + 1);
                  addToInventory("Function Medallion");
                  goToScene("hub");
                }}
                className={`${currentTheme.primary} text-white px-6 py-2 rounded-lg`}
              >
                Complete Quest (Answer: 20)
              </button>

              <button
                onClick={() => goToScene("hub")}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg"
              >
                Return to Hub
              </button>
            </div>
          </div>
        </div>
      </div>
    ),
    // BACKEND DEVELOPMENT QUESTS

    python: (
      <div
        className={`${currentTheme.background} p-6 min-h-screen ${textClass}`}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-3xl font-bold ${currentTheme.accent} mb-6`}>
            Python Basics
          </h1>

          <div className={`${currentTheme.panel} p-6 rounded-xl mb-6`}>
            <p className="mb-4">
              Python is a high-level, interpreted programming language known for
              its readability and versatility. It's used for web development,
              data analysis, AI, scientific computing, and more.
            </p>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>
                Key Features:
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Readability:</strong> Clean syntax with significant
                  whitespace
                </li>
                <li>
                  <strong>Versatility:</strong> Used across many domains and
                  applications
                </li>
                <li>
                  <strong>Extensive Libraries:</strong> Rich standard library
                  and third-party packages
                </li>
                <li>
                  <strong>Interpreted:</strong> No compilation step needed
                </li>
                <li>
                  <strong>Dynamically Typed:</strong> Variable types determined
                  at runtime
                </li>
                <li>
                  <strong>Object-Oriented:</strong> Supports OOP paradigms
                </li>
              </ul>
            </div>

            <div className="bg-gray-100 p-4 rounded font-mono text-sm text-gray-800 mb-6">
              <p># Variables and data types</p>
              <p>name = "Python Learner"</p>
              <p>age = 25</p>
              <p>is_coding = True</p>
              <p>skills = ["HTML", "CSS", "JavaScript"]</p>
              <p>
                profile = {"{"}"name": name, "age": age{"}"}
              </p>
              <br />
              <p># Conditional statement</p>
              <p>if age &gt; 18:</p>
              <p> print("Adult")</p>
              <p>else:</p>
              <p> print("Minor")</p>
              <br />
              <p># Loop example</p>

              <p>for skill in skills:</p>
              <p>
                {" "}
                print(f"I know {"{"} skill {"}"}")
              </p>

              <br />
              <p># Function definition</p>

              <p>def greet(person_name):</p>
              <p>
                {" "}
                return f"Hello, {"{"} person_name {"}"} !"
              </p>

              <br />
              <p>message = greet(name)</p>
              <p>print(message) # Output: Hello, Python Learner!</p>
            </div>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>
                Common Python Libraries:
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="border p-2 rounded">
                  <span className="font-bold">Flask/Django:</span>
                  <span className="text-sm">Web frameworks</span>
                </div>
                <div className="border p-2 rounded">
                  <span className="font-bold">Pandas/NumPy:</span>
                  <span className="text-sm">Data analysis</span>
                </div>
                <div className="border p-2 rounded">
                  <span className="font-bold">Matplotlib/Seaborn:</span>
                  <span className="text-sm">Data visualization</span>
                </div>
                <div className="border p-2 rounded">
                  <span className="font-bold">TensorFlow/PyTorch:</span>
                  <span className="text-sm">Machine learning</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-100 p-4 rounded text-yellow-800 mb-6">
              <h3 className="font-bold">Challenge:</h3>
              <p>What will this Python code return?</p>
              <pre className="font-mono text-sm mt-2">
                {`def mystery_function(numbers):
    result = []
    for num in numbers:
        if num % 2 == 0:
            result.append(num)
    return result

print(mystery_function([1, 2, 3, 4, 5, 6, 7, 8]))`}
              </pre>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => {
                  updateSkill("python", skills.python + 1);
                  addToInventory("Python Grimoire");
                  goToScene("pythonComplete");
                }}
                className={`${currentTheme.primary} text-white px-6 py-2 rounded-lg`}
              >
                Complete Quest (Answer: [2, 4, 6, 8])
              </button>

              <button
                onClick={() => goToScene("hub")}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg"
              >
                Return to Hub
              </button>
            </div>
          </div>
        </div>
      </div>
    ),

    pythonComplete: (
      <div
        className={`${currentTheme.background} p-6 min-h-screen ${textClass}`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className={`${currentTheme.panel} p-8 rounded-xl mb-6`}>
            <h1 className={`text-4xl font-bold ${currentTheme.accent} mb-6`}>
              Python Quest Complete!
            </h1>

            <div className="mb-6">
              <div className="w-24 h-24 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-4xl">✓</span>
              </div>
              <p className="text-xl">You've mastered Python!</p>
            </div>

            <div className="mb-8">
              <p className="mb-4">You now understand:</p>
              <ul className="list-disc text-left max-w-md mx-auto">
                <li>Python syntax and data types</li>
                <li>Control flow and functions</li>
                <li>Working with modules and packages</li>
                <li>File handling and data processing</li>
                <li>Object-oriented programming in Python</li>
              </ul>
            </div>

            <div className="mb-8">
              <p className="font-bold">XP Gained: +100</p>
              <p>New item: Python Grimoire added to inventory</p>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => goToScene("hub")}
                className={`${currentTheme.primary} text-white px-6 py-2 rounded-lg`}
              >
                Return to Hub
              </button>

              <button
                onClick={() => goToScene("flask")}
                className={`${currentTheme.secondary} text-white px-6 py-2 rounded-lg`}
              >
                Continue to Flask Quest
              </button>
            </div>
          </div>
        </div>
      </div>
    ),

    flask: (
      <div
        className={`${currentTheme.background} p-6 min-h-screen ${textClass}`}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-3xl font-bold ${currentTheme.accent} mb-6`}>
            Flask Framework
          </h1>

          <div className={`${currentTheme.panel} p-6 rounded-xl mb-6`}>
            <p className="mb-4">
              Flask is a lightweight Python web framework that provides the
              essentials for building web applications. It's known for its
              simplicity and flexibility, making it great for small to
              medium-sized projects.
            </p>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>
                Key Features:
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Minimalistic:</strong> Small core with extensible
                  architecture
                </li>
                <li>
                  <strong>Flexible:</strong> Few constraints on how to structure
                  applications
                </li>
                <li>
                  <strong>Jinja2 Templating:</strong> Powerful template engine
                </li>
                <li>
                  <strong>Built-in Development Server:</strong> Easy local
                  testing
                </li>
                <li>
                  <strong>RESTful Request Handling:</strong> Route-based URL
                  dispatching
                </li>
                <li>
                  <strong>WSGI Compliant:</strong> Works with standard Python
                  web servers
                </li>
              </ul>
            </div>

            <div className="bg-gray-100 p-4 rounded font-mono text-sm text-gray-800 mb-6">
              <p>from flask import Flask, render_template, request, jsonify</p>
              <br />
              <p># Create Flask application</p>
              <p>app = Flask(__name__)</p>
              <br />
              <p># Define a route for the homepage</p>
              <p>@app.route('/')</p>
              <p>def home():</p>
              <p> return render_template('index.html')</p>
              <br />
              <p># Route with path parameter</p>
              <p>@app.route('/user/&lt;username&gt;')</p>

              <p>def user_profile(username):</p>
              <p>
                {" "}
                return f"Profile page for {"{"} username {"}"}"
              </p>

              <br />
              <p># API endpoint returning JSON</p>
              <p>@app.route('/api/data')</p>
              <p>def get_data():</p>
              <p> data = {"{"}</p>
              <p> "name": "Sample API",</p>
              <p> "version": "1.0",</p>
              <p> "items": [1, 2, 3]</p>
              <p> {"}"}</p>
              <p> return jsonify(data)</p>
              <br />
              <p>if __name__ == '__main__':</p>
              <p> app.run(debug=True)</p>
            </div>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>
                Flask Project Structure:
              </h3>
              <pre className="bg-gray-800 p-3 rounded text-gray-100 text-xs">
                {`my_flask_app/
├── app.py               # Main application file
├── static/              # Static files (CSS, JS, images)
│   ├── css/
│   ├── js/
│   └── images/
├── templates/           # HTML templates
│   ├── base.html
│   ├── index.html
│   └── user.html
├── models.py            # Database models
├── routes.py            # Route definitions
├── requirements.txt     # Dependencies
└── venv/                # Virtual environment`}
              </pre>
            </div>

            <div className="bg-yellow-100 p-4 rounded text-yellow-800 mb-6">
              <h3 className="font-bold">Challenge:</h3>
              <p>What decorator is used to define a route in Flask?</p>
              <p>
                A) <code>@app.url()</code>
              </p>
              <p>
                B) <code>@app.route()</code>
              </p>
              <p>
                C) <code>@app.endpoint()</code>
              </p>
              <p>
                D) <code>@app.view()</code>
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => {
                  updateSkill("flask", skills.flask + 1);
                  addToInventory("Flask Vial");
                  goToScene("flaskComplete");
                }}
                className={`${currentTheme.primary} text-white px-6 py-2 rounded-lg`}
              >
                Complete Quest (Answer: B)
              </button>

              <button
                onClick={() => goToScene("hub")}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg"
              >
                Return to Hub
              </button>
            </div>
          </div>
        </div>
      </div>
    ),

    flaskComplete: (
      <div
        className={`${currentTheme.background} p-6 min-h-screen ${textClass}`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className={`${currentTheme.panel} p-8 rounded-xl mb-6`}>
            <h1 className={`text-4xl font-bold ${currentTheme.accent} mb-6`}>
              Flask Quest Complete!
            </h1>

            <div className="mb-6">
              <div className="w-24 h-24 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-4xl">✓</span>
              </div>
              <p className="text-xl">You've mastered Flask!</p>
            </div>

            <div className="mb-8">
              <p className="mb-4">You now understand:</p>
              <ul className="list-disc text-left max-w-md mx-auto">
                <li>Route handling and URL mapping</li>
                <li>Template rendering with Jinja2</li>
                <li>Form handling and validation</li>
                <li>Working with databases</li>
                <li>Creating RESTful APIs</li>
              </ul>
            </div>

            <div className="mb-8">
              <p className="font-bold">XP Gained: +100</p>
              <p>New item: Flask Vial added to inventory</p>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => goToScene("hub")}
                className={`${currentTheme.primary} text-white px-6 py-2 rounded-lg`}
              >
                Return to Hub
              </button>

              <button
                onClick={() => goToScene("django")}
                className={`${currentTheme.secondary} text-white px-6 py-2 rounded-lg`}
              >
                Continue to Django Quest
              </button>
            </div>
          </div>
        </div>
      </div>
    ),

    django: (
      <div
        className={`${currentTheme.background} p-6 min-h-screen ${textClass}`}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-3xl font-bold ${currentTheme.accent} mb-6`}>
            Django Framework
          </h1>

          <div className={`${currentTheme.panel} p-6 rounded-xl mb-6`}>
            <p className="mb-4">
              Django is a high-level Python web framework that follows the
              "batteries-included" philosophy. It provides a robust set of tools
              and features for building large, scalable web applications with
              less code and faster development.
            </p>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>
                Key Features:
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>ORM (Object-Relational Mapping):</strong> Work with
                  databases using Python objects
                </li>
                <li>
                  <strong>Admin Interface:</strong> Built-in administrative
                  panel
                </li>
                <li>
                  <strong>URL Routing:</strong> Flexible and powerful URL
                  dispatching
                </li>
                <li>
                  <strong>Template System:</strong> HTML templates with
                  Python-like syntax
                </li>
                <li>
                  <strong>Form Handling:</strong> Create, validate, and process
                  forms
                </li>
                <li>
                  <strong>Authentication:</strong> User accounts, groups,
                  permissions
                </li>
                <li>
                  <strong>Security Features:</strong> Protection against common
                  attacks
                </li>
              </ul>
            </div>

            <div className="bg-gray-100 p-4 rounded font-mono text-sm text-gray-800 mb-6">
              <p># models.py - Define database models</p>
              <p>from django.db import models</p>
              <br />
              <p>class Product(models.Model):</p>
              <p> name = models.CharField(max_length=100)</p>
              <p>
                {" "}
                price = models.DecimalField(max_digits=10, decimal_places=2)
              </p>
              <p> description = models.TextField()</p>
              <p> created_at = models.DateTimeField(auto_now_add=True)</p>
              <br />
              <p> def __str__(self):</p>
              <p> return self.name</p>
              <br />
              <p># views.py - Define views</p>
              <p>from django.shortcuts import render, get_object_or_404</p>
              <p>from .models import Product</p>
              <br />
              <p>def product_list(request):</p>
              <p> products = Product.objects.all()</p>
              <p>
                {" "}
                return render(request, 'products/list.html', {"{"}"products":
                products{"}"})
              </p>
              <br />
              <p>def product_detail(request, pk):</p>
              <p> product = get_object_or_404(Product, pk=pk)</p>
              <p>
                {" "}
                return render(request, 'products/detail.html', {"{"}"product":
                product{"}"})
              </p>
              <br />
              <p># urls.py - Define URL patterns</p>
              <p>from django.urls import path</p>
              <p>from . import views</p>
              <br />
              <p>urlpatterns = [</p>
              <p>
                {" "}
                path('products/', views.product_list, name='product_list'),
              </p>
              <p>
                {" "}
                path('products/&lt;int:pk&gt;/', views.product_detail,
                name='product_detail'),
              </p>
              <p>]</p>
            </div>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>
                Django's MVT Architecture:
              </h3>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="border p-3 rounded">
                  <h4 className="font-bold mb-1">Model</h4>
                  <p className="text-sm">
                    Defines data structure and database interactions
                  </p>
                </div>
                <div className="border p-3 rounded">
                  <h4 className="font-bold mb-1">View</h4>
                  <p className="text-sm">
                    Handles business logic and processes requests
                  </p>
                </div>
                <div className="border p-3 rounded">
                  <h4 className="font-bold mb-1">Template</h4>
                  <p className="text-sm">
                    Defines how data is presented to users
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-100 p-4 rounded text-yellow-800 mb-6">
              <h3 className="font-bold">Challenge:</h3>
              <p>
                In Django, what is used to define a database table structure?
              </p>
              <p>A) View</p>
              <p>B) Controller</p>
              <p>C) Template</p>
              <p>D) Model</p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => {
                  updateSkill("django", skills.django + 1);
                  addToInventory("Django Staff");
                  goToScene("djangoComplete");
                }}
                className={`${currentTheme.primary} text-white px-6 py-2 rounded-lg`}
              >
                Complete Quest (Answer: D)
              </button>

              <button
                onClick={() => goToScene("hub")}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg"
              >
                Return to Hub
              </button>
            </div>
          </div>
        </div>
      </div>
    ),

    djangoComplete: (
      <div
        className={`${currentTheme.background} p-6 min-h-screen ${textClass}`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className={`${currentTheme.panel} p-8 rounded-xl mb-6`}>
            <h1 className={`text-4xl font-bold ${currentTheme.accent} mb-6`}>
              Django Quest Complete!
            </h1>

            <div className="mb-6">
              <div className="w-24 h-24 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-4xl">✓</span>
              </div>
              <p className="text-xl">You've mastered Django!</p>
            </div>

            <div className="mb-8">
              <p className="mb-4">You now understand:</p>
              <ul className="list-disc text-left max-w-md mx-auto">
                <li>Django's MVT architecture</li>
                <li>ORM for database operations</li>
                <li>Admin interface customization</li>
                <li>Forms and model forms</li>
                <li>Authentication and authorization</li>
                <li>Creating robust web applications</li>
              </ul>
            </div>

            <div className="mb-8">
              <p className="font-bold">XP Gained: +100</p>
              <p>New item: Django Staff added to inventory</p>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => goToScene("hub")}
                className={`${currentTheme.primary} text-white px-6 py-2 rounded-lg`}
              >
                Return to Hub
              </button>

              <button
                onClick={() =>
                  allLanguageQuestsCompleted()
                    ? goToScene("finalProject")
                    : null
                }
                className={`${allLanguageQuestsCompleted() ? currentTheme.secondary : "bg-gray-400"} text-white px-6 py-2 rounded-lg`}
                disabled={!allLanguageQuestsCompleted()}
              >
                {allLanguageQuestsCompleted()
                  ? "Start Final Project"
                  : "Complete All Quests First"}
              </button>
            </div>
          </div>
        </div>
      </div>
    ),

    // FINAL PROJECT

    finalProject: (
      <div
        className={`${currentTheme.background} p-6 min-h-screen ${textClass}`}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-3xl font-bold ${currentTheme.accent} mb-6`}>
            Final Project: Full-Stack Application
          </h1>

          <div className={`${currentTheme.panel} p-6 rounded-xl mb-6`}>
            <p className="mb-4">
              Congratulations on completing all the programming quests! You've
              learned a wide range of technologies that allow you to build
              complete web applications. Your final challenge is to apply
              everything you've learned to create a full-stack project.
            </p>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>
                Project Overview:
              </h3>
              <p>
                Create a personal portfolio website with the following features:
              </p>
              <ul className="list-disc pl-5 mt-2">
                <li>Responsive design that looks great on all devices</li>
                <li>Project showcase with filtering options</li>
                <li>Contact form that stores messages in a database</li>
                <li>Admin dashboard to manage projects and messages</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>
                Technical Requirements:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border p-3 rounded">
                  <h4 className="font-bold mb-1">Frontend:</h4>
                  <ul className="list-disc pl-5 text-sm">
                    <li>React for UI components</li>
                    <li>Tailwind CSS for styling</li>
                    <li>Responsive design (mobile-first)</li>
                    <li>State management with React hooks</li>
                    <li>Form validation with JavaScript</li>
                  </ul>
                </div>
                <div className="border p-3 rounded">
                  <h4 className="font-bold mb-1">Backend:</h4>
                  <ul className="list-disc pl-5 text-sm">
                    <li>Python with Django or Flask</li>
                    <li>RESTful API endpoints</li>
                    <li>Database models for projects and messages</li>
                    <li>User authentication for admin access</li>
                    <li>Form data processing and validation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>
                Project Architecture Diagram:
              </h3>
              <div className="bg-white p-4 rounded-lg border">
                <pre className="text-xs overflow-x-auto">
                  {`┌─────────────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
│                     │     │                     │     │                     │
│  React Frontend     │     │  API Endpoints      │     │  Database           │
│                     │     │                     │     │                     │
│  ┌───────────────┐  │     │  ┌───────────────┐  │     │  ┌───────────────┐  │
│  │ Components    │  │     │  │ /api/projects │  │     │  │ Projects      │  │
│  │ - ProjectList │──┼─────┼──┤ GET, POST     │──┼─────┼──┤ - id          │  │
│  │ - ProjectCard │  │     │  └───────────────┘  │     │  │ - title       │  │
│  │ - ContactForm │  │     │                     │     │  │ - description │  │
│  └───────────────┘  │     │  ┌───────────────┐  │     │  │ - image       │  │
│                     │     │  │ /api/contact  │  │     │  │ - tags        │  │
│  ┌───────────────┐  │     │  │ POST          │──┼─────┼──┤               │  │
│  │ State         │  │     │  └───────────────┘  │     │  └───────────────┘  │
│  │ - Projects    │  │     │                     │     │                     │
│  │ - Filter      │  │     │  ┌───────────────┐  │     │  ┌───────────────┐  │
│  │ - Form        │  │     │  │ /api/auth     │  │     │  │ Messages      │  │
│  └───────────────┘  │     │  │ POST, GET     │──┼─────┼──┤ - id          │  │
│                     │     │  └───────────────┘  │     │  │ - name        │  │
└─────────────────────┘     └─────────────────────┘     │  │ - email       │  │
                                                         │  │ - message     │  │
                                                         │  │ - date        │  │
                                                         │  └───────────────┘  │
                                                         └─────────────────────┘`}
                </pre>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => {
                  updatePlayerStats("experience", playerStats.experience + 500);
                  addToInventory("Master Developer Certificate");
                  goToScene("gameComplete");
                }}
                className={`${currentTheme.primary} text-white px-6 py-2 rounded-lg`}
              >
                Complete Final Project
              </button>

              <button
                onClick={() => goToScene("hub")}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg"
              >
                Return to Hub
              </button>
            </div>
          </div>
        </div>
      </div>
    ),

    // GAME COMPLETION

    gameComplete: (
      <div
        className={`${currentTheme.background} p-6 min-h-screen ${textClass} flex items-center justify-center`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className={`${currentTheme.panel} p-10 rounded-xl mb-6`}>
            <h1 className={`text-5xl font-bold ${currentTheme.accent} mb-8`}>
              Congratulations, Master Developer!
            </h1>

            <div className="mb-10">
              <div className="w-32 h-32 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-6xl">🏆</span>
              </div>
              <p className="text-2xl mb-4">
                You've completed Code Quest: The Path of the Programmer!
              </p>
              <p className="text-xl">
                Your journey from novice to full-stack developer is complete.
              </p>
            </div>

            <div className="mb-8 bg-white bg-opacity-20 p-6 rounded-lg">
              <h2 className={`text-2xl font-bold ${currentTheme.accent} mb-4`}>
                Your Achievements:
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <h3 className="font-bold mb-2">Core Programming Concepts:</h3>
                  <ul className="list-disc pl-5">
                    <li>Variables & Data Types</li>
                    <li>Conditionals & Logic</li>
                    <li>Loops & Iteration</li>
                    <li>Functions & Methods</li>
                    <li>Data Structures</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Technologies Mastered:</h3>
                  <ul className="list-disc pl-5">
                    <li>HTML, CSS, JavaScript</li>
                    <li>Tailwind CSS</li>
                    <li>React</li>
                    <li>Python</li>
                    <li>Flask & Django</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h2 className={`text-2xl font-bold ${currentTheme.accent} mb-4`}>
                Your Next Steps:
              </h2>
              <p className="mb-4">
                This is just the beginning of your coding journey! Here are some
                ways to continue growing:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Build Projects</h3>
                  <p className="text-sm">
                    Create your own applications to strengthen your skills and
                    build your portfolio.
                  </p>
                </div>
                <div className="border p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Learn Advanced Topics</h3>
                  <p className="text-sm">
                    Explore state management, databases, deployment, testing,
                    and more.
                  </p>
                </div>
                <div className="border p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Contribute to Open Source</h3>
                  <p className="text-sm">
                    Join the developer community and collaborate on real-world
                    projects.
                  </p>
                </div>
              </div>
            </div>

            {/* Player Stats Summary */}
            <div className="mb-10 bg-white bg-opacity-20 p-6 rounded-lg">
              <h2 className={`text-2xl font-bold ${currentTheme.accent} mb-4`}>
                Your Final Stats:
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-white bg-opacity-30 p-3 rounded-lg">
                  <p className="text-3xl font-bold">{playerStats.level}</p>
                  <p className="text-sm">Level</p>
                </div>
                <div className="bg-white bg-opacity-30 p-3 rounded-lg">
                  <p className="text-3xl font-bold">{playerStats.experience}</p>
                  <p className="text-sm">Experience</p>
                </div>
                <div className="bg-white bg-opacity-30 p-3 rounded-lg">
                  <p className="text-3xl font-bold">{completedQuests.length}</p>
                  <p className="text-sm">Quests</p>
                </div>
                <div className="bg-white bg-opacity-30 p-3 rounded-lg">
                  <p className="text-3xl font-bold">{inventory.length}</p>
                  <p className="text-sm">Items</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => goToScene("intro")}
                className={`${currentTheme.primary} text-white px-8 py-3 rounded-lg`}
              >
                Start a New Adventure
              </button>

              <button
                onClick={() => saveProgress()}
                className={`${currentTheme.secondary} text-white px-8 py-3 rounded-lg`}
              >
                Save Progress
              </button>
            </div>

            <p className="mt-6 text-sm opacity-75">
              Thank you for completing Code Quest! Your coding adventure has
              only just begun.
            </p>
          </div>
        </div>

        {/* Confetti effect */}
        <div className="fixed inset-0 pointer-events-none">
          {/* Animated confetti would be implemented here in a full application */}
        </div>
      </div>
    ),

    // Enhanced Data Structure quest - for more advanced learning
    dataStructures: (
      <div
        className={`${currentTheme.background} p-6 min-h-screen ${textClass}`}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-3xl font-bold ${currentTheme.accent} mb-6`}>
            Data Structures
          </h1>

          <div className={`${currentTheme.panel} p-6 rounded-xl mb-6`}>
            <p className="mb-4">
              Data structures are specialized formats for organizing,
              processing, retrieving, and storing data. Efficient data
              structures are fundamental to designing efficient algorithms and
              building optimized software.
            </p>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>
                Common Data Structures:
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Arrays:</strong> Ordered collection of elements,
                  accessed by index
                </li>
                <li>
                  <strong>Linked Lists:</strong> Sequence of nodes with data and
                  references to next node
                </li>
                <li>
                  <strong>Stacks:</strong> Last-in, first-out (LIFO) collection
                </li>
                <li>
                  <strong>Queues:</strong> First-in, first-out (FIFO) collection
                </li>
                <li>
                  <strong>Hash Tables:</strong> Key-value pairs with efficient
                  lookup
                </li>
                <li>
                  <strong>Trees:</strong> Hierarchical structure with
                  parent-child relationships
                </li>
                <li>
                  <strong>Graphs:</strong> Collection of nodes connected by
                  edges
                </li>
              </ul>
            </div>

            <div className="bg-gray-100 p-4 rounded font-mono text-sm text-gray-800 mb-6">
              <p className="text-gray-500">
                // JavaScript Object implementation (Hash Table)
              </p>
              <p>const studentGrades = {"{"}</p>
              <p> 'Alice': 92,</p>
              <p> 'Bob': 85,</p>
              <p> 'Charlie': 88</p>
              <p>{"}"};</p>
              <p>console.log(studentGrades['Alice']); // Output: 92</p>
              <br />
              <p className="text-gray-500">// JavaScript Array methods</p>
              <p>const stack = [];</p>
              <p>stack.push('item1'); // Add to end</p>
              <p>stack.push('item2');</p>
              <p>const lastItem = stack.pop(); // Remove from end (LIFO)</p>
              <br />
              <p>const queue = [];</p>
              <p>queue.push('item1'); // Add to end</p>
              <p>queue.push('item2');</p>
              <p>
                const firstItem = queue.shift(); // Remove from front (FIFO)
              </p>
              <br />
              <p className="text-gray-500"># Python dictionary (Hash Table)</p>
              <p>student_grades = {"{"}</p>
              <p> "Alice": 92,</p>
              <p> "Bob": 85,</p>
              <p> "Charlie": 88</p>
              <p>{"}"}</p>
              <p>print(student_grades["Alice"]) # Output: 92</p>
            </div>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>
                Common Operations & Complexity:
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2">Data Structure</th>
                      <th className="border p-2">Access</th>
                      <th className="border p-2">Search</th>
                      <th className="border p-2">Insertion</th>
                      <th className="border p-2">Deletion</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2">Array</td>
                      <td className="border p-2">O(1)</td>
                      <td className="border p-2">O(n)</td>
                      <td className="border p-2">O(n)</td>
                      <td className="border p-2">O(n)</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Linked List</td>
                      <td className="border p-2">O(n)</td>
                      <td className="border p-2">O(n)</td>
                      <td className="border p-2">O(1)</td>
                      <td className="border p-2">O(1)</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Hash Table</td>
                      <td className="border p-2">N/A</td>
                      <td className="border p-2">O(1) avg</td>
                      <td className="border p-2">O(1) avg</td>
                      <td className="border p-2">O(1) avg</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Binary Search Tree</td>
                      <td className="border p-2">N/A</td>
                      <td className="border p-2">O(log n) avg</td>
                      <td className="border p-2">O(log n) avg</td>
                      <td className="border p-2">O(log n) avg</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-yellow-100 p-4 rounded text-yellow-800 mb-6">
              <h3 className="font-bold">Challenge:</h3>
              <p>
                If you have a queue of [1, 2, 3, 4] and perform these
                operations: dequeue, enqueue 5, dequeue, enqueue 6, what will
                the final queue be?
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => {
                  updateSkill("dataStructures", skills.dataStructures + 1);
                  addToInventory("Data Structure Tome");
                  goToScene("hub");
                }}
                className={`${currentTheme.primary} text-white px-6 py-2 rounded-lg`}
              >
                Complete Quest (Answer: [3, 4, 5, 6])
              </button>

              <button
                onClick={() => goToScene("hub")}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg"
              >
                Return to Hub
              </button>
            </div>
          </div>
        </div>
      </div>
    ),
  };

  // Profile selection screen
  const ProfileSelectionScreen = () => (
    <div
      className={`${currentTheme.background} min-h-screen p-8 flex flex-col items-center justify-center`}
    >
      <div
        className={`${currentTheme.panel} p-8 rounded-xl max-w-4xl w-full mx-auto ${textClass}`}
      >
        <h1
          className={`text-4xl font-bold ${currentTheme.accent} mb-6 text-center`}
        >
          Code Quest
        </h1>
        <h2 className="text-2xl mb-8 text-center">Choose Your Profile</h2>

        {/* Profile list */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Existing Profiles</h3>

          {profiles.length === 0 ? (
            <p className="text-center py-4 italic">
              No profiles found. Create a new one to get started!
            </p>
          ) : (
            <div className="grid gap-4 max-h-64 overflow-y-auto p-2">
              {profiles.map((profile) => (
                <div
                  key={profile.id}
                  onClick={() => loadProfile(profile.id)}
                  className={`${currentTheme.border} border rounded-lg p-4 flex justify-between items-center cursor-pointer hover:bg-opacity-50 hover:bg-gray-100 transition-colors`}
                >
                  <div>
                    <h4 className="font-bold text-lg">{profile.name}</h4>
                    <div className="text-sm opacity-75">
                      <p>
                        Level: {profile.level} • XP: {profile.experience}
                      </p>
                      <p>
                        Quests: {profile.completedQuests} • Last played:{" "}
                        {formatDate(profile.lastSaved)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={(e) => deleteProfile(profile.id, e)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition-colors"
                    >
                      🗑️
                    </button>
                    <button
                      className={`${currentTheme.primary} text-white px-4 py-2 rounded-lg ml-4`}
                    >
                      Play
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Create new profile */}
        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold mb-4">Create New Profile</h3>
          <div className="flex gap-4">
            <input
              type="text"
              value={newProfileName}
              onChange={handleNewProfileNameInput}
              placeholder="Enter profile name"
              className={`flex-1 border ${currentTheme.border} rounded-lg p-3 focus:ring-2 focus:ring-opacity-50 focus:outline-none`}
            />
            <button
              onClick={createNewProfile}
              disabled={!newProfileName.trim()}
              className={`${currentTheme.secondary} text-white px-6 py-2 rounded-lg disabled:opacity-50`}
            >
              Create Profile
            </button>
          </div>
        </div>

        {/* Theme selection */}
        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-semibold mb-4">Game Theme</h3>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setTheme("fantasy")}
              className={`px-4 py-2 rounded-lg transition-all ${theme === "fantasy" ? "bg-indigo-600 text-white scale-110" : "bg-indigo-200 text-indigo-800"}`}
            >
              Fantasy
            </button>
            <button
              onClick={() => setTheme("cyber")}
              className={`px-4 py-2 rounded-lg transition-all ${theme === "cyber" ? "bg-blue-600 text-white scale-110" : "bg-blue-200 text-blue-800"}`}
            >
              Cyberpunk
            </button>
            <button
              onClick={() => setTheme("space")}
              className={`px-4 py-2 rounded-lg transition-all ${theme === "space" ? "bg-purple-600 text-white scale-110" : "bg-purple-200 text-purple-800"}`}
            >
              Space
            </button>
          </div>
        </div>

        {/* Settings */}
        <div className="mt-8 border-t pt-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <label className="mr-2">Auto-save:</label>
              <button
                onClick={() => setIsAutoSaveEnabled(!isAutoSaveEnabled)}
                className={`w-12 h-6 rounded-full transition-colors ${isAutoSaveEnabled ? "bg-green-500" : "bg-gray-300"} relative`}
              >
                <span
                  className={`absolute w-5 h-5 rounded-full bg-white top-0.5 transition-all ${isAutoSaveEnabled ? "right-0.5" : "left-0.5"}`}
                ></span>
              </button>
            </div>
            <div className="flex items-center">
              <label className="mr-2">Sound:</label>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                {soundEnabled ? "🔊" : "🔇"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Animation */}
      {showAnimation && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-yellow-400 text-yellow-900 text-3xl font-bold py-4 px-8 rounded-lg animate-bounce shadow-lg">
            {animationMessage}
          </div>
        </div>
      )}
    </div>
  );

  // Add logout button to hub scene
  const originalHubScene = scenes.hub;
  scenes.hub = (
    <div className={originalHubScene.props.className}>
      {originalHubScene.props.children}
      <button
        onClick={logOut}
        className={`fixed top-4 right-4 ${currentTheme.secondary} text-white px-4 py-2 rounded-lg flex items-center`}
      >
        <span className="mr-2">Logout</span>
        <span>🚪</span>
      </button>
    </div>
  );

  return (
    <div className="h-screen overflow-y-auto">
      {showProfileScreen ? <ProfileSelectionScreen /> : scenes[currentScene]}
    </div>
  );
};

export default EnhancedCodeQuest;
