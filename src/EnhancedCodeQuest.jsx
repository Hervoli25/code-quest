import React, { useState } from 'react';

const EnhancedCodeQuest = () => {
  // Game state
  const [currentScene, setCurrentScene] = useState('intro');
  const [inventory, setInventory] = useState([]);
  const [playerStats, setPlayerStats] = useState({
    playerName: '',
    experience: 0,
    level: 1,
    skillPoints: 0
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
    tailwind: 0
  });

  // Track completed quests
  const [completedQuests, setCompletedQuests] = useState([]);

  // Audio effects
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Theme selection
  const [theme, setTheme] = useState('fantasy'); // fantasy, cyber, space

  // Animation state
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationMessage, setAnimationMessage] = useState('');

  // Function to add item to inventory
  const addToInventory = (item) => {
    if (!inventory.includes(item)) {
      setInventory([...inventory, item]);
      playSound('collectItem');
      triggerAnimation(`${item} acquired!`);
    }
  };

  // Function to update player stats
  const updatePlayerStats = (stat, value) => {
    setPlayerStats({
      ...playerStats,
      [stat]: value
    });
  };

  // Function to update skills
  const updateSkill = (skill, value) => {
    setSkills({
      ...skills,
      [skill]: value
    });

    // Check for level up
    const totalSkillPoints = Object.values(skills).reduce((sum, current) => sum + current, 0) + value - skills[skill];
    const newLevel = Math.floor(totalSkillPoints / 5) + 1;

    if (newLevel > playerStats.level) {
      levelUp(newLevel);
    }
  };

  // Level up function
  const levelUp = (newLevel) => {
    setPlayerStats({
      ...playerStats,
      level: newLevel,
      skillPoints: playerStats.skillPoints + 1
    });
    playSound('levelUp');
    triggerAnimation('Level Up!');
  };

  // Function to handle name input
  const handleNameInput = (e) => {
    updatePlayerStats('playerName', e.target.value);
  };

  // Function to proceed to next scene
  const goToScene = (scene) => {
    setCurrentScene(scene);
    playSound('navigate');

    // Mark quest as completed if moving to outcome scene
    if (['htmlComplete', 'cssComplete', 'jsComplete', 'pythonComplete', 'reactComplete', 'djangoComplete', 'flaskComplete', 'tailwindComplete'].includes(scene)) {
      const quest = scene.replace('Complete', '');
      if (!completedQuests.includes(quest)) {
        setCompletedQuests([...completedQuests, quest]);
        updatePlayerStats('experience', playerStats.experience + 100);
      }
    }
  };

  // Function to play sound effects
  const playSound = (soundType) => {
    if (!soundEnabled) return;

    // Sound would be implemented here in a full application
    console.log(`Playing sound: ${soundType}`);
  };

  // Function to trigger animations
  const triggerAnimation = (message) => {
    setAnimationMessage(message);
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
  };

  // Check if all main quests are completed
  const allMainQuestsCompleted = () => {
    const mainQuests = ['variables', 'conditionals', 'loops', 'functions'];
    return mainQuests.every(quest => skills[quest] > 0);
  };

  // Check if all language quests are completed
  const allLanguageQuestsCompleted = () => {
    const languageQuests = ['html', 'css', 'javascript', 'python', 'react', 'django', 'flask', 'tailwind'];
    return languageQuests.every(quest => skills[quest] > 0);
  };

  // Theme-specific styles
  const themeStyles = {
    fantasy: {
      background: "bg-gradient-to-br from-indigo-100 to-purple-200",
      primary: "bg-indigo-600 hover:bg-indigo-700",
      secondary: "bg-purple-500 hover:bg-purple-600",
      accent: "text-indigo-800",
      panel: "bg-white bg-opacity-80 shadow-lg",
      border: "border-indigo-300"
    },
    cyber: {
      background: "bg-gradient-to-br from-gray-900 to-blue-900",
      primary: "bg-blue-600 hover:bg-blue-700",
      secondary: "bg-green-500 hover:bg-green-600",
      accent: "text-cyan-400",
      panel: "bg-gray-800 bg-opacity-90 shadow-lg",
      border: "border-cyan-700",
      text: "text-gray-100"
    },
    space: {
      background: "bg-gradient-to-br from-gray-800 to-purple-900",
      primary: "bg-purple-600 hover:bg-purple-700",
      secondary: "bg-pink-500 hover:bg-pink-600",
      accent: "text-purple-300",
      panel: "bg-gray-800 bg-opacity-80 shadow-lg",
      border: "border-purple-700",
      text: "text-gray-100"
    }
  };

  const currentTheme = themeStyles[theme];
  const textClass = theme === 'fantasy' ? 'text-gray-800' : 'text-gray-100';

  // Game scenes
  const scenes = {
    intro: (
      <div className={`${currentTheme.background} p-8 rounded-xl shadow-2xl min-h-screen flex flex-col items-center justify-center transition-all duration-500`}>
        <div className={`${currentTheme.panel} p-10 rounded-xl max-w-2xl mx-auto text-center ${textClass}`}>
          <h1 className={`text-5xl font-bold ${currentTheme.accent} mb-6`}>Code Quest</h1>
          <h2 className="text-3xl mb-8">The Path of the Programmer</h2>

          <p className="mb-6 text-lg">Welcome, brave soul! You stand at the threshold of a journey that will transform you into a master programmer.</p>
          <p className="mb-8">In this world, code shapes reality, and you will learn to wield its power.</p>

          <div className="mb-8">
            <label className="block mb-2 text-lg">What shall I call you, future coding wizard?</label>
            <input
              type="text"
              value={playerStats.playerName}
              onChange={handleNameInput}
              placeholder="Enter your name"
              className={`w-full border ${currentTheme.border} rounded-lg p-3 bg-opacity-30 bg-white ${theme === 'fantasy' ? 'text-gray-800' : 'text-white'} focus:ring-2 focus:ring-opacity-50 focus:ring-indigo-500 focus:outline-none text-center text-xl`}
            />
          </div>

          <div className="mb-6">
            <p className="mb-4">Choose your adventure theme:</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setTheme('fantasy')}
                className={`px-4 py-2 rounded-lg transition-all ${theme === 'fantasy' ? 'bg-indigo-600 text-white scale-110' : 'bg-indigo-200 text-indigo-800'}`}
              >
                Fantasy
              </button>
              <button
                onClick={() => setTheme('cyber')}
                className={`px-4 py-2 rounded-lg transition-all ${theme === 'cyber' ? 'bg-blue-600 text-white scale-110' : 'bg-blue-200 text-blue-800'}`}
              >
                Cyberpunk
              </button>
              <button
                onClick={() => setTheme('space')}
                className={`px-4 py-2 rounded-lg transition-all ${theme === 'space' ? 'bg-purple-600 text-white scale-110' : 'bg-purple-200 text-purple-800'}`}
              >
                Space
              </button>
            </div>
          </div>

          <button
            onClick={() => goToScene('hub')}
            disabled={!playerStats.playerName}
            className={`${currentTheme.primary} text-white text-xl px-8 py-3 rounded-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:transform-none`}
          >
            Begin Your Journey
          </button>

          <p className="mt-6 text-sm opacity-75">
            This adventure will teach you real programming skills across multiple languages and frameworks. 
            <small>
                Written By <a href="Elisee Kajingu" className="text-indigo-500 hover:underline">Elisee Kajingu</a>
            </small>
          </p>
        </div>

        {/* Sound toggle */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="absolute top-4 right-4 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30"
        >
          {soundEnabled ? '🔊' : '🔇'}
        </button>
      </div>
    ),

    hub: (
      <div className={`${currentTheme.background} p-6 min-h-screen ${textClass}`}>
        <div className="max-w-6xl mx-auto">
          <header className="flex justify-between items-center mb-8">
            <h1 className={`text-3xl font-bold ${currentTheme.accent}`}>Code Quest: Central Hub</h1>
            <div className="flex items-center space-x-2">
              <div className={`${currentTheme.panel} p-2 rounded-lg`}>
                <p>Level: {playerStats.level}</p>
                <p>XP: {playerStats.experience}</p>
              </div>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30"
              >
                {soundEnabled ? '🔊' : '🔇'}
              </button>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main quests panel */}
            <div className={`${currentTheme.panel} p-6 rounded-xl col-span-1`}>
              <h2 className={`text-2xl font-bold mb-4 ${currentTheme.accent}`}>Coding Fundamentals</h2>
              <p className="mb-4">Master the basics that apply to all programming languages:</p>

              <div className="space-y-3">
                <button
                  onClick={() => goToScene('variables')}
                  className={`w-full ${skills.variables > 0 ? 'bg-green-600 hover:bg-green-700' : currentTheme.primary} text-white p-3 rounded-lg flex justify-between items-center`}
                  disabled={skills.variables > 3}
                >
                  <span>Variables & Data Types</span>
                  {skills.variables > 0 && <span>✓</span>}
                </button>

                <button
                  onClick={() => goToScene('conditionals')}
                  className={`w-full ${skills.conditionals > 0 ? 'bg-green-600 hover:bg-green-700' : currentTheme.primary} text-white p-3 rounded-lg flex justify-between items-center`}
                  disabled={skills.conditionals > 3}
                >
                  <span>Conditionals & Logic</span>
                  {skills.conditionals > 0 && <span>✓</span>}
                </button>

                <button
                  onClick={() => goToScene('loops')}
                  className={`w-full ${skills.loops > 0 ? 'bg-green-600 hover:bg-green-700' : currentTheme.primary} text-white p-3 rounded-lg flex justify-between items-center`}
                  disabled={skills.loops > 3}
                >
                  <span>Loops & Iteration</span>
                  {skills.loops > 0 && <span>✓</span>}
                </button>

                <button
                  onClick={() => goToScene('functions')}
                  className={`w-full ${skills.functions > 0 ? 'bg-green-600 hover:bg-green-700' : currentTheme.primary} text-white p-3 rounded-lg flex justify-between items-center`}
                  disabled={skills.functions > 3}
                >
                  <span>Functions & Methods</span>
                  {skills.functions > 0 && <span>✓</span>}
                </button>

                <button
                  onClick={() => goToScene('dataStructures')}
                  className={`w-full ${skills.dataStructures > 0 ? 'bg-green-600 hover:bg-green-700' : currentTheme.primary} text-white p-3 rounded-lg flex justify-between items-center`}
                  disabled={skills.dataStructures > 3 || !allMainQuestsCompleted()}
                >
                  <span>Data Structures</span>
                  {!allMainQuestsCompleted() && <span>🔒</span>}
                  {skills.dataStructures > 0 && <span>✓</span>}
                </button>
              </div>
            </div>

            {/* Frontend quest panel */}
            <div className={`${currentTheme.panel} p-6 rounded-xl col-span-1`}>
              <h2 className={`text-2xl font-bold mb-4 ${currentTheme.accent}`}>Frontend Development</h2>
              <p className="mb-4">Build the visible parts of websites and applications:</p>

              <div className="space-y-3">
                <button
                  onClick={() => goToScene('html')}
                  className={`w-full ${skills.html > 0 ? 'bg-green-600 hover:bg-green-700' : currentTheme.primary} text-white p-3 rounded-lg flex justify-between items-center`}
                  disabled={skills.html > 3}
                >
                  <span>HTML - Structure</span>
                  {skills.html > 0 && <span>✓</span>}
                </button>

                <button
                  onClick={() => goToScene('css')}
                  className={`w-full ${skills.css > 0 ? 'bg-green-600 hover:bg-green-700' : currentTheme.primary} text-white p-3 rounded-lg flex justify-between items-center`}
                  disabled={skills.css > 3 || skills.html === 0}
                >
                  <span>CSS - Styling</span>
                  {skills.html === 0 && <span>🔒</span>}
                  {skills.css > 0 && <span>✓</span>}
                </button>

                <button
                  onClick={() => goToScene('javascript')}
                  className={`w-full ${skills.javascript > 0 ? 'bg-green-600 hover:bg-green-700' : currentTheme.primary} text-white p-3 rounded-lg flex justify-between items-center`}
                  disabled={skills.javascript > 3 || skills.html === 0 || skills.css === 0}
                >
                  <span>JavaScript - Interactivity</span>
                  {(skills.html === 0 || skills.css === 0) && <span>🔒</span>}
                  {skills.javascript > 0 && <span>✓</span>}
                </button>

                <button
                  onClick={() => goToScene('tailwind')}
                  className={`w-full ${skills.tailwind > 0 ? 'bg-green-600 hover:bg-green-700' : currentTheme.primary} text-white p-3 rounded-lg flex justify-between items-center`}
                  disabled={skills.tailwind > 3 || skills.css === 0}
                >
                  <span>Tailwind CSS</span>
                  {skills.css === 0 && <span>🔒</span>}
                  {skills.tailwind > 0 && <span>✓</span>}
                </button>

                <button
                  onClick={() => goToScene('react')}
                  className={`w-full ${skills.react > 0 ? 'bg-green-600 hover:bg-green-700' : currentTheme.primary} text-white p-3 rounded-lg flex justify-between items-center`}
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
              <h2 className={`text-2xl font-bold mb-4 ${currentTheme.accent}`}>Backend Development</h2>
              <p className="mb-4">Create the logic and data systems powering applications:</p>

              <div className="space-y-3">
                <button
                  onClick={() => goToScene('python')}
                  className={`w-full ${skills.python > 0 ? 'bg-green-600 hover:bg-green-700' : currentTheme.primary} text-white p-3 rounded-lg flex justify-between items-center`}
                  disabled={skills.python > 3 || !allMainQuestsCompleted()}
                >
                  <span>Python Basics</span>
                  {!allMainQuestsCompleted() && <span>🔒</span>}
                  {skills.python > 0 && <span>✓</span>}
                </button>

                <button
                  onClick={() => goToScene('flask')}
                  className={`w-full ${skills.flask > 0 ? 'bg-green-600 hover:bg-green-700' : currentTheme.primary} text-white p-3 rounded-lg flex justify-between items-center`}
                  disabled={skills.flask > 3 || skills.python === 0}
                >
                  <span>Flask Framework</span>
                  {skills.python === 0 && <span>🔒</span>}
                  {skills.flask > 0 && <span>✓</span>}
                </button>

                <button
                  onClick={() => goToScene('django')}
                  className={`w-full ${skills.django > 0 ? 'bg-green-600 hover:bg-green-700' : currentTheme.primary} text-white p-3 rounded-lg flex justify-between items-center`}
                  disabled={skills.django > 3 || skills.python === 0}
                >
                  <span>Django Framework</span>
                  {skills.python === 0 && <span>🔒</span>}
                  {skills.django > 0 && <span>✓</span>}
                </button>

                <button
                  onClick={() => allLanguageQuestsCompleted() ? goToScene('finalProject') : null}
                  className={`w-full ${allLanguageQuestsCompleted() ? currentTheme.secondary : 'bg-gray-400'} text-white p-3 rounded-lg flex justify-between items-center`}
                  disabled={!allLanguageQuestsCompleted()}
                >
                  <span>Final Project</span>
                  {!allLanguageQuestsCompleted() && <span>🔒</span>}
                </button>
              </div>
            </div>
          </div>

          {/* Player status and inventory */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className={`${currentTheme.panel} p-6 rounded-xl`}>
              <h2 className={`text-2xl font-bold mb-4 ${currentTheme.accent}`}>Player Status</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p><strong>Name:</strong> {playerStats.playerName}</p>
                  <p><strong>Level:</strong> {playerStats.level}</p>
                  <p><strong>Experience:</strong> {playerStats.experience}</p>
                  <p><strong>Skill Points:</strong> {playerStats.skillPoints}</p>
                </div>
                <div>
                  <p><strong>Quests Completed:</strong> {completedQuests.length}</p>
                  <div className="mt-2">
                    <div className="w-full bg-gray-300 rounded-full h-4">
                      <div
                        className="bg-green-600 h-4 rounded-full"
                        style={{ width: `${Math.min(completedQuests.length / 13 * 100, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs mt-1 text-center">{completedQuests.length}/13 Complete</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${currentTheme.panel} p-6 rounded-xl`}>
              <h2 className={`text-2xl font-bold mb-4 ${currentTheme.accent}`}>Inventory</h2>
              {inventory.length === 0 ? (
                <p>Your inventory is empty. Complete quests to earn items!</p>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {inventory.map((item, index) => (
                    <div key={index} className={`p-2 rounded border ${currentTheme.border}`}>
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

    // FUNDAMENTAL CONCEPT QUESTS

    variables: (
      <div className={`${currentTheme.background} p-6 min-h-screen ${textClass}`}>
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-3xl font-bold ${currentTheme.accent} mb-6`}>Variables & Data Types</h1>

          <div className={`${currentTheme.panel} p-6 rounded-xl mb-6`}>
            <p className="mb-4">Variables are containers for storing data values. In programming, we use them to temporarily hold information that can be referenced and manipulated in a computer program.</p>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>Common Data Types:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Strings:</strong> Text values like "Hello World"</li>
                <li><strong>Numbers:</strong> Integers (42) or floating-point (3.14)</li>
                <li><strong>Booleans:</strong> True or False values</li>
                <li><strong>Arrays/Lists:</strong> Collections of values [1, 2, 3]</li>
                <li><strong>Objects/Dictionaries:</strong> Collections of key-value pairs</li>
              </ul>
            </div>

            <div className="bg-gray-100 p-4 rounded font-mono text-sm text-gray-800 mb-6">
              <p className="text-gray-500">// JavaScript example</p>
              <p>let name = "Alice";</p>
              <p>let age = 25;</p>
              <p>let isStudent = true;</p>
              <p>let hobbies = ["reading", "coding", "gaming"];</p>
              <p>let person = {'{'} name: "Bob", age: 30 {'}'};</p>
              <br />
              <p className="text-gray-500">// Python example</p>
              <p>name = "Alice"</p>
              <p>age = 25</p>
              <p>is_student = True</p>
              <p>hobbies = ["reading", "coding", "gaming"]</p>
              <p>person = {'{'}"name": "Bob", "age": 30{'}'}</p>
            </div>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>Real-World Application:</h3>
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
              <p>If a variable <code>score</code> starts at 0 and increases by 10 with each correct answer, what's the value after 7 correct answers?</p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => {
                  updateSkill('variables', skills.variables + 1);
                  addToInventory('Variable Scroll');
                  goToScene('hub');
                }}
                className={`${currentTheme.primary} text-white px-6 py-2 rounded-lg`}
              >
                Complete Quest (Answer: 70)
              </button>

              <button
                onClick={() => goToScene('hub')}
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
      <div className={`${currentTheme.background} p-6 min-h-screen ${textClass}`}>
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-3xl font-bold ${currentTheme.accent} mb-6`}>Conditionals & Logic</h1>

          <div className={`${currentTheme.panel} p-6 rounded-xl mb-6`}>
            <p className="mb-4">Conditional statements help your program make decisions. They allow different code to execute depending on whether a condition is true or false.</p>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>Key Concepts:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>if statements:</strong> Execute code if a condition is true</li>
                <li><strong>else statements:</strong> Execute alternative code if the condition is false</li>
                <li><strong>else if:</strong> Check multiple conditions in sequence</li>
                <li><strong>Comparison operators:</strong> ==, !=, &gt;, &lt;, &gt;=, &lt;=</li>
                <li><strong>Logical operators:</strong> AND (&&), OR (||), NOT (!)</li>
              </ul>
            </div>

            <div className="bg-gray-100 p-4 rounded font-mono text-sm text-gray-800 mb-6">
              <p className="text-gray-500">// JavaScript example</p>
              <p>let temperature = 75;</p>
              <p>if (temperature &gt; 90) {'{'}</p>
              <p>  console.log("It's hot outside!");</p>
              <p>{'}'} else if (temperature &gt; 70) {'{'}</p>
              <p>  console.log("It's warm outside.");</p>
              <p>{'}'} else {'{'}</p>
              <p>  console.log("It's cool outside.");</p>
              <p>{'}'}</p>
              <br />
              <p className="text-gray-500"># Python example</p>
              <p>temperature = 75</p>
              <p>if temperature &gt; 90:</p>
              <p>    print("It's hot outside!")</p>
              <p>elif temperature &gt; 70:</p>
              <p>    print("It's warm outside.")</p>
              <p>else:</p>
              <p>    print("It's cool outside.")</p>
            </div>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>Real-World Application:</h3>
              <p>Conditionals are used to create branching logic in applications:</p>
              <ul className="list-disc pl-5">
                <li>User authentication (if password correct, allow access)</li>
                <li>Form validation (if email format invalid, show error)</li>
                <li>Game mechanics (if player health = 0, game over)</li>
                <li>Responsive design (if screen size &lt; 768px, show mobile layout)</li>
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
                  updateSkill('conditionals', skills.conditionals + 1);
                  addToInventory('Logic Crystal');
                  goToScene('hub');
                }}
                className={`${currentTheme.primary} text-white px-6 py-2 rounded-lg`}
              >
                Complete Quest (Answer: Grade: B)
              </button>

              <button
                onClick={() => goToScene('hub')}
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
      <div className={`${currentTheme.background} p-6 min-h-screen ${textClass}`}>
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-3xl font-bold ${currentTheme.accent} mb-6`}>Loops & Iteration</h1>

          <div className={`${currentTheme.panel} p-6 rounded-xl mb-6`}>
            <p className="mb-4">Loops allow you to execute a block of code multiple times. They're essential for working with collections of data or performing repetitive tasks efficiently.</p>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>Common Loop Types:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>for loops:</strong> Execute code a specific number of times</li>
                <li><strong>while loops:</strong> Execute code as long as a condition is true</li>
                <li><strong>for...of / for...in:</strong> Iterate over elements in arrays or objects</li>
                <li><strong>forEach / map:</strong> Higher-order array methods for iteration</li>
              </ul>
            </div>

            <div className="bg-gray-100 p-4 rounded font-mono text-sm text-gray-800 mb-6">
              <p className="text-gray-500">// JavaScript for loop</p>
              <p>for (let i = 0; i &lt; 5; i++) {'{'}</p>
              <p>  console.log("Iteration: " + i);</p>
              <p>{'}'}</p>
              <br />
              <p className="text-gray-500">// JavaScript while loop</p>
              <p>let count = 0;</p>
              <p>while (count &lt; 5) {'{'}</p>
              <p>  console.log("Count: " + count);</p>
              <p>  count++;</p>
              <p>{'}'}</p>
              <br />
              <p className="text-gray-500"># Python for loop</p>
              
              <p>for i in range(5):</p>
              <p>    print(f"Iteration: {'{'} i {'}'}")</p>
              
              <br />
              <p className="text-gray-500"># Python while loop</p>
              
              <p>count = 0</p>
              <p>while count &lt; 5:</p>
              <p>    print(f"Count: {'{'} count {'}'}")</p>
              <p>    count += 1</p>
              
            </div>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>Real-World Application:</h3>
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
                  updateSkill('loops', skills.loops + 1);
                  addToInventory('Loop Talisman');
                  goToScene('hub');
                }}
                className={`${currentTheme.primary} text-white px-6 py-2 rounded-lg`}
              >
                Complete Quest (Answer: 55)
              </button>

              <button
                onClick={() => goToScene('hub')}
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
      <div className={`${currentTheme.background} p-6 min-h-screen ${textClass}`}>
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-3xl font-bold ${currentTheme.accent} mb-6`}>Functions & Methods</h1>

          <div className={`${currentTheme.panel} p-6 rounded-xl mb-6`}>
            <p className="mb-4">Functions are reusable blocks of code designed to perform specific tasks. They help organize code, reduce repetition, and improve maintainability.</p>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>Key Concepts:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Function declaration:</strong> Defining a function</li>
                <li><strong>Parameters:</strong> Inputs that a function accepts</li>
                <li><strong>Return values:</strong> Output that a function provides</li>
                <li><strong>Arrow functions:</strong> A concise way to write functions (JavaScript)</li>
                <li><strong>Methods:</strong> Functions that belong to objects or classes</li>
              </ul>
            </div>

            <div className="bg-gray-100 p-4 rounded font-mono text-sm text-gray-800 mb-6">
              <p className="text-gray-500">// JavaScript function declaration</p>
              <p>function greet(name) {'{'}</p>
              <p>  return "Hello, " + name + "!";</p>
              <p>{'}'}</p>
              <p>console.log(greet("Alice")); // Output: Hello, Alice!</p>
              <br />
              <p className="text-gray-500">// JavaScript arrow function</p>
              <p>const add = (a, b) =&gt; {'{'}</p>
              <p>  return a + b;</p>
              <p>{'}'};</p>
              <p>console.log(add(5, 3)); // Output: 8</p>
              <br />
              <p className="text-gray-500"># Python function</p>
              <p>def greet(name):</p>
              <p>    return f"Hello, {'{'} name {'}'}!"</p>
              <p>print(greet("Alice"))  # Output: Hello, Alice!</p>
              <br />
              <p className="text-gray-500"># Python lambda function (similar to arrow functions)</p>
              <p>add = lambda a, b: a + b</p>
              <p>print(add(5, 3))  # Output: 8</p>
            </div>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>Real-World Application:</h3>
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
              <p>What will this function return when called with calculateArea(4, 5)?</p>
              <pre className="font-mono text-sm mt-2">
{`function calculateArea(length, width) {
  return length * width;
}`}
              </pre>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => {
                  updateSkill('functions', skills.functions + 1);
                  addToInventory('Function Medallion');
                  goToScene('hub');
                }}
                className={`${currentTheme.primary} text-white px-6 py-2 rounded-lg`}
              >
                Complete Quest (Answer: 20)
              </button>

              <button
                onClick={() => goToScene('hub')}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg"
              >
                Return to Hub
              </button>
            </div>
          </div>
        </div>
      </div>
    ),

    // FRONTEND DEVELOPMENT QUESTS

    html: (
      <div className={`${currentTheme.background} p-6 min-h-screen ${textClass}`}>
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-3xl font-bold ${currentTheme.accent} mb-6`}>HTML - Structure</h1>

          <div className={`${currentTheme.panel} p-6 rounded-xl mb-6`}>
            <p className="mb-4">HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It defines the structure and content of web pages.</p>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>Key Concepts:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Elements:</strong> The building blocks of HTML (e.g., paragraphs, headings, lists)</li>
                <li><strong>Tags:</strong> Opening and closing markers for elements (e.g., &lt;p&gt; and &lt;/p&gt;)</li>
                <li><strong>Attributes:</strong> Additional information about elements (e.g., class, id, src)</li>
                <li><strong>Nesting:</strong> Placing elements inside other elements</li>
                <li><strong>Semantic HTML:</strong> Using elements that convey meaning about their content</li>
              </ul>
            </div>

            <div className="bg-gray-100 p-4 rounded font-mono text-sm text-gray-800 mb-6">
              <p>&lt;!DOCTYPE html&gt;</p>
              <p>&lt;html lang="en"&gt;</p>
              <p>&lt;head&gt;</p>
              <p>  &lt;meta charset="UTF-8"&gt;</p>
              <p>  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</p>
              <p>  &lt;title&gt;My First Webpage&lt;/title&gt;</p>
              <p>&lt;/head&gt;</p>
              <p>&lt;body&gt;</p>
              <p>  &lt;header&gt;</p>
              <p>    &lt;h1&gt;Welcome to My Website&lt;/h1&gt;</p>
              <p>    &lt;nav&gt;</p>
              <p>      &lt;ul&gt;</p>
              <p>        &lt;li&gt;&lt;a href="#"&gt;Home&lt;/a&gt;&lt;/li&gt;</p>
              <p>        &lt;li&gt;&lt;a href="#"&gt;About&lt;/a&gt;&lt;/li&gt;</p>
              <p>        &lt;li&gt;&lt;a href="#"&gt;Contact&lt;/a&gt;&lt;/li&gt;</p>
              <p>      &lt;/ul&gt;</p>
              <p>    &lt;/nav&gt;</p>
              <p>  &lt;/header&gt;</p>
              <p>  &lt;main&gt;</p>
              <p>    &lt;section&gt;</p>
              <p>      &lt;h2&gt;About Me&lt;/h2&gt;</p>
              <p>      &lt;p&gt;This is a paragraph about me.&lt;/p&gt;</p>
              <p>      &lt;img src="profile.jpg" alt="My profile picture"&gt;</p>
              <p>    &lt;/section&gt;</p>
              <p>  &lt;/main&gt;</p>
              <p>  &lt;footer&gt;</p>
              <p>    &lt;p&gt;&copy; 2025 My Website&lt;/p&gt;</p>
              <p>  &lt;/footer&gt;</p>
              <p>&lt;/body&gt;</p>
              <p>&lt;/html&gt;</p>
            </div>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>Common HTML Elements:</h3>
              <ul className="list-disc pl-5 grid grid-cols-2 gap-2">
                <li><code>&lt;h1&gt; - &lt;h6&gt;</code>: Headings</li>
                <li><code>&lt;p&gt;</code>: Paragraphs</li>
                <li><code>&lt;a&gt;</code>: Links</li>
                <li><code>&lt;img&gt;</code>: Images</li>
                <li><code>&lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;</code>: Lists</li>
                <li><code>&lt;div&gt;</code>: Generic container</li>
                <li><code>&lt;span&gt;</code>: Inline container</li>
                <li><code>&lt;form&gt;, &lt;input&gt;</code>: Forms</li>
                <li><code>&lt;table&gt;</code>: Tables</li>
                <li><code>&lt;button&gt;</code>: Buttons</li>
              </ul>
            </div>

            <div className="bg-yellow-100 p-4 rounded text-yellow-800 mb-6">
              <h3 className="font-bold">Challenge:</h3>
              <p>What HTML element would you use to create a dropdown selection menu?</p>
              <p>A) &lt;dropdown&gt;</p>
              <p>B) &lt;select&gt;</p>
              <p>C) &lt;option&gt;</p>
              <p>D) &lt;menu&gt;</p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => {
                  updateSkill('html', skills.html + 1);
                  addToInventory('HTML Blueprint');
                  goToScene('htmlComplete');
                }}
                className={`${currentTheme.primary} text-white px-6 py-2 rounded-lg`}
              >
                Complete Quest (Answer: B)
              </button>

              <button
                onClick={() => goToScene('hub')}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg"
              >
                Return to Hub
              </button>
            </div>
          </div>
        </div>
      </div>
    ),

    htmlComplete: (
      <div className={`${currentTheme.background} p-6 min-h-screen ${textClass}`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className={`${currentTheme.panel} p-8 rounded-xl mb-6`}>
            <h1 className={`text-4xl font-bold ${currentTheme.accent} mb-6`}>HTML Quest Complete!</h1>

            <div className="mb-6">
              <div className="w-24 h-24 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-4xl">✓</span>
              </div>
              <p className="text-xl">You've learned the fundamentals of HTML!</p>
            </div>

            <div className="mb-8">
              <p className="mb-4">You now understand:</p>
              <ul className="list-disc text-left max-w-md mx-auto">
                <li>HTML structure and basic elements</li>
                <li>How to create headings, paragraphs, links, and images</li>
                <li>Form elements and user inputs</li>
                <li>Semantic HTML for better accessibility</li>
              </ul>
            </div>

            <div className="mb-8">
              <p className="font-bold">XP Gained: +100</p>
              <p>New item: HTML Blueprint added to inventory</p>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => goToScene('hub')}
                className={`${currentTheme.primary} text-white px-6 py-2 rounded-lg`}
              >
                Return to Hub
              </button>

              <button
                onClick={() => goToScene('css')}
                className={`${currentTheme.secondary} text-white px-6 py-2 rounded-lg`}
              >
                Continue to CSS Quest
              </button>
            </div>
          </div>
        </div>
      </div>
    ),

    css: (
      <div className={`${currentTheme.background} p-6 min-h-screen ${textClass}`}>
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-3xl font-bold ${currentTheme.accent} mb-6`}>CSS - Styling</h1>

          <div className={`${currentTheme.panel} p-6 rounded-xl mb-6`}>
            <p className="mb-4">CSS (Cascading Style Sheets) is used to style and lay out web pages. It controls how HTML elements are displayed on screen, providing colors, layouts, and visual effects.</p>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>Key Concepts:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Selectors:</strong> Target HTML elements to apply styles</li>
                <li><strong>Properties:</strong> Aspects of an element you can change (color, size, etc.)</li>
                <li><strong>Values:</strong> Settings for properties (red, 16px, etc.)</li>
                <li><strong>Box Model:</strong> Content, padding, border, and margin</li>
                <li><strong>Flexbox/Grid:</strong> Advanced layout systems</li>
                <li><strong>Media Queries:</strong> Responsive design for different screen sizes</li>
              </ul>
            </div>

            <div className="bg-gray-100 p-4 rounded font-mono text-sm text-gray-800 mb-6">
              <p className="text-gray-500">/* Basic CSS syntax */</p>
              <p>selector {'{'}</p>
              <p>  property: value;</p>
              <p>{'}'}</p>
              <br />
              <p className="text-gray-500">/* Examples */</p>
              <p>/* Element selector */</p>
              <p>body {'{'}</p>
              <p>  font-family: Arial, sans-serif;</p>
              <p>  margin: 0;</p>
              <p>  padding: 0;</p>
              <p>  background-color: #f5f5f5;</p>
              <p>{'}'}</p>
              <br />
              <p>/* Class selector */</p>
              <p>.card {'{'}</p>
              <p>  background-color: white;</p>
              <p>  border-radius: 8px;</p>
              <p>  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);</p>
              <p>  padding: 16px;</p>
              <p>  margin-bottom: 16px;</p>
              <p>{'}'}</p>
              <br />
              <p>/* ID selector */</p>
              <p>#header {'{'}</p>
              <p>  height: 60px;</p>
              <p>  background-color: #333;</p>
              <p>  color: white;</p>
              <p>{'}'}</p>
            </div>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>CSS Layout Systems:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="border p-3 rounded">
                  <h4 className="font-bold mb-2">Flexbox</h4>
                  <p className="text-sm">One-dimensional layout system for rows or columns</p>
                  <div className="mt-2 text-xs">
                    <code>display: flex;</code><br />
                    <code>flex-direction: row;</code><br />
                    <code>justify-content: space-between;</code>
                  </div>
                </div>
                <div className="border p-3 rounded">
                  <h4 className="font-bold mb-2">Grid</h4>
                  <p className="text-sm">Two-dimensional layout system for rows and columns</p>
                  <div className="mt-2 text-xs">
                    <code>display: grid;</code><br />
                    <code>grid-template-columns: 1fr 2fr;</code><br />
                    <code>gap: 16px;</code>
                  </div>
                </div>
                <div className="border p-3 rounded">
                  <h4 className="font-bold mb-2">Positioning</h4>
                  <p className="text-sm">Control element placement</p>
                  <div className="mt-2 text-xs">
                    <code>position: relative;</code><br />
                    <code>position: absolute;</code><br />
                    <code>position: fixed;</code>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-100 p-4 rounded text-yellow-800 mb-6">
              <h3 className="font-bold">Challenge:</h3>
              <p>Which CSS property would you use to create space INSIDE an element?</p>
              <p>A) margin</p>
              <p>B) padding</p>
              <p>C) border</p>
              <p>D) spacing</p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => {
                  updateSkill('css', skills.css + 1);
                  addToInventory('Style Palette');
                  goToScene('cssComplete');
                }}
                className={`${currentTheme.primary} text-white px-6 py-2 rounded-lg`}
              >
                Complete Quest (Answer: B)
              </button>

              <button
                onClick={() => goToScene('hub')}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg"
              >
                Return to Hub
              </button>
            </div>
          </div>
        </div>
      </div>
    ),

    javascript: (
      <div className={`${currentTheme.background} p-6 min-h-screen ${textClass}`}>
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-3xl font-bold ${currentTheme.accent} mb-6`}>JavaScript - Interactivity</h1>

          <div className={`${currentTheme.panel} p-6 rounded-xl mb-6`}>
            <p className="mb-4">JavaScript is a programming language that allows you to implement complex features on web pages. It adds interactivity, dynamic content updates, and handles user interactions.</p>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>Key Concepts:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>DOM Manipulation:</strong> Changing HTML elements dynamically</li>
                <li><strong>Event Handling:</strong> Responding to user actions</li>
                <li><strong>Asynchronous Programming:</strong> Promises, async/await, AJAX</li>
                <li><strong>ES6+ Features:</strong> Arrow functions, template literals, destructuring</li>
                <li><strong>JSON:</strong> Working with data</li>
                <li><strong>APIs:</strong> Interacting with external services</li>
              </ul>
            </div>

            <div className="bg-gray-100 p-4 rounded font-mono text-sm text-gray-800 mb-6">
              <p className="text-gray-500">// DOM Manipulation</p>
              <p>const heading = document.getElementById('title');</p>
              <p>heading.textContent = 'New Title';</p>
              <p>heading.style.color = 'blue';</p>
              <br />
              <p className="text-gray-500">// Event Handling</p>
              <p>const button = document.querySelector('button');</p>
              <p>button.addEventListener('click', () =&gt; {'{'}</p>
              <p>  alert('Button clicked!');</p>
              <p>{'}'});</p>
              <br />
              <p className="text-gray-500">// Fetch API (AJAX)</p>
              <p>fetch('https://api.example.com/data')</p>
              <p>  .then(response =&gt; response.json())</p>
              <p>  .then(data =&gt; {'{'}</p>
              <p>    console.log(data);</p>
              <p>  {'}'})</p>
              <p>  .catch(error =&gt; {'{'}</p>
              <p>    console.error('Error:', error);</p>
              <p>  {'}'});</p>
            </div>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>Real-World Applications:</h3>
              <ul className="list-disc pl-5">
                <li>Form validation and submission</li>
                <li>Interactive maps and data visualizations</li>
                <li>Single-page applications</li>
                <li>Real-time notifications and updates</li>
                <li>Games and interactive experiences</li>
              </ul>
            </div>

            <div className="bg-yellow-100 p-4 rounded text-yellow-800 mb-6">
              <h3 className="font-bold">Challenge:</h3>
              <p>What will this code output to the console?</p>
              <pre className="font-mono text-sm mt-2">
{`const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
console.log(doubled);`}
              </pre>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => {
                  updateSkill('javascript', skills.javascript + 1);
                  addToInventory('Script Scroll');
                  goToScene('javascriptComplete');
                }}
                className={`${currentTheme.primary} text-white px-6 py-2 rounded-lg`}
              >
                Complete Quest (Answer: [2, 4, 6, 8, 10])
              </button>

              <button
                onClick={() => goToScene('hub')}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg"
              >
                Return to Hub
              </button>
            </div>
          </div>
        </div>
      </div>
    ),

    javascriptComplete: (
      <div className={`${currentTheme.background} p-6 min-h-screen ${textClass}`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className={`${currentTheme.panel} p-8 rounded-xl mb-6`}>
            <h1 className={`text-4xl font-bold ${currentTheme.accent} mb-6`}>JavaScript Quest Complete!</h1>

            <div className="mb-6">
              <div className="w-24 h-24 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-4xl">✓</span>
              </div>
              <p className="text-xl">You've learned the fundamentals of JavaScript!</p>
            </div>

            <div className="mb-8">
              <p className="mb-4">You now understand:</p>
              <ul className="list-disc text-left max-w-md mx-auto">
                <li>How to manipulate the DOM to change webpage content</li>
                <li>Handling user events like clicks and form submissions</li>
                <li>Working with arrays, objects, and modern JavaScript features</li>
                <li>Making API requests and handling asynchronous operations</li>
              </ul>
            </div>

            <div className="mb-8">
              <p className="font-bold">XP Gained: +100</p>
              <p>New item: Script Scroll added to inventory</p>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => goToScene('hub')}
                className={`${currentTheme.primary} text-white px-6 py-2 rounded-lg`}
              >
                Return to Hub
              </button>

              <button
                onClick={() => goToScene('react')}
                className={`${currentTheme.secondary} text-white px-6 py-2 rounded-lg`}
              >
                Continue to React Quest
              </button>
            </div>
          </div>
        </div>
      </div>
    ),

    tailwind: (
      <div className={`${currentTheme.background} p-6 min-h-screen ${textClass}`}>
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-3xl font-bold ${currentTheme.accent} mb-6`}>Tailwind CSS</h1>

          <div className={`${currentTheme.panel} p-6 rounded-xl mb-6`}>
            <p className="mb-4">Tailwind CSS is a utility-first CSS framework that allows you to build designs directly in your markup. Unlike traditional CSS frameworks, Tailwind doesn't provide pre-designed components. Instead, it gives you low-level utility classes to build custom designs.</p>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>Key Concepts:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Utility Classes:</strong> Small, single-purpose classes (e.g., <code>text-red-500</code>, <code>py-4</code>)</li>
                <li><strong>Responsive Design:</strong> Using prefixes like <code>sm:</code>, <code>md:</code>, <code>lg:</code></li>
                <li><strong>Pseudo-classes:</strong> Adding <code>hover:</code>, <code>focus:</code>, etc.</li>
                <li><strong>Customization:</strong> Extending the default configuration</li>
                <li><strong>JIT (Just-In-Time) Mode:</strong> On-demand utility generation</li>
              </ul>
            </div>

            <div className="bg-gray-100 p-4 rounded font-mono text-sm text-gray-800 mb-6">
              <p>&lt;!-- Traditional CSS approach --&gt;</p>
              <p>&lt;div class="card"&gt;</p>
              <p>  &lt;h2 class="card-title"&gt;Hello World&lt;/h2&gt;</p>
              <p>  &lt;p class="card-text"&gt;This is a card.&lt;/p&gt;</p>
              <p>&lt;/div&gt;</p>
              <br />
              <p>&lt;!-- Tailwind CSS approach --&gt;</p>
              <p>&lt;div class="bg-white rounded-lg shadow-md p-6 m-4"&gt;</p>
              <p>  &lt;h2 class="text-xl font-bold text-gray-800 mb-2"&gt;Hello World&lt;/h2&gt;</p>
              <p>  &lt;p class="text-gray-600"&gt;This is a card.&lt;/p&gt;</p>
              <p>&lt;/div&gt;</p>
              <br />
              <p>&lt;!-- Responsive design with Tailwind --&gt;</p>
              <p>&lt;div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"&gt;</p>
              <p>  &lt;!-- Content here --&gt;</p>
              <p>&lt;/div&gt;</p>
            </div>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>Common Utility Categories:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="border p-2 rounded">
                  <span className="font-bold">Layout:</span>
                  <span className="text-sm"><code>container</code>, <code>flex</code>, <code>grid</code></span>
                </div>
                <div className="border p-2 rounded">
                  <span className="font-bold">Spacing:</span>
                  <span className="text-sm"><code>p-4</code>, <code>m-2</code>, <code>gap-6</code></span>
                </div>
                <div className="border p-2 rounded">
                  <span className="font-bold">Sizing:</span>
                  <span className="text-sm"><code>w-full</code>, <code>h-screen</code></span>
                </div>
                <div className="border p-2 rounded">
                  <span className="font-bold">Typography:</span>
                  <span className="text-sm"><code>text-xl</code>, <code>font-bold</code></span>
                </div>
                <div className="border p-2 rounded">
                  <span className="font-bold">Colors:</span>
                  <span className="text-sm"><code>text-blue-500</code>, <code>bg-gray-100</code></span>
                </div>
                <div className="border p-2 rounded">
                  <span className="font-bold">Effects:</span>
                  <span className="text-sm"><code>shadow-md</code>, <code>opacity-50</code></span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-100 p-4 rounded text-yellow-800 mb-6">
              <h3 className="font-bold">Challenge:</h3>
              <p>Which Tailwind class would you use to make text bold?</p>
              <p>A) <code>text-bold</code></p>
              <p>B) <code>bold</code></p>
              <p>C) <code>font-bold</code></p>
              <p>D) <code>weight-bold</code></p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => {
                  updateSkill('tailwind', skills.tailwind + 1);
                  addToInventory('Utility Belt');
                  goToScene('tailwindComplete');
                }}
                className={`${currentTheme.primary} text-white px-6 py-2 rounded-lg`}
              >
                Complete Quest (Answer: C)
              </button>

              <button
                onClick={() => goToScene('hub')}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg"
              >
                Return to Hub
              </button>
            </div>
          </div>
        </div>
      </div>
    ),

    react: (
      <div className={`${currentTheme.background} p-6 min-h-screen ${textClass}`}>
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-3xl font-bold ${currentTheme.accent} mb-6`}>React Framework</h1>

          <div className={`${currentTheme.panel} p-6 rounded-xl mb-6`}>
            <p className="mb-4">React is a JavaScript library for building user interfaces, particularly single-page applications. It allows you to create reusable UI components and efficiently update the DOM when data changes.</p>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>Key Concepts:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Components:</strong> Reusable, self-contained pieces of UI</li>
                <li><strong>Props:</strong> Pass data from parent to child components</li>
                <li><strong>State:</strong> Component-level data that changes over time</li>
                <li><strong>Hooks:</strong> Functions that let you use state and other React features</li>
                <li><strong>JSX:</strong> JavaScript syntax extension for describing UI</li>
                <li><strong>Virtual DOM:</strong> Efficient rendering through diffing algorithm</li>
              </ul>
            </div>

            <div className="bg-gray-100 p-4 rounded font-mono text-sm text-gray-800 mb-6">
              <p>// Functional component with hooks</p>
              <p>import React, {'{ useState }'} from 'react';</p>
              <br />
              <p>function Counter() {'{'}</p>
              <p>  const [count, setCount] = useState(0);</p>
              <br />
              <p>  return (</p>
              <p>    &lt;div&gt;</p>
              <p>      &lt;h2&gt;Count: {'{count}'}&lt;/h2&gt;</p>
              <p>      &lt;button onClick={'{() => setCount(count + 1)}'}&gt;</p>
              <p>        Increment</p>
              <p>      &lt;/button&gt;</p>
              <p>    &lt;/div&gt;</p>
              <p>  );</p>
              <p>{'}'}</p>
              <br />
              <p>// Parent component passing props</p>
              <p>function App() {'{'}</p>
              <p>  return (</p>
              <p>    &lt;div&gt;</p>
              <p>      &lt;h1&gt;My Counter App&lt;/h1&gt;</p>
              <p>      &lt;Counter /&gt;</p>
              <p>    &lt;/div&gt;</p>
              <p>  );</p>
              <p>{'}'}</p>
            </div>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>Common React Hooks:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="border p-2 rounded">
                  <span className="font-bold">useState:</span>
                  <span className="text-sm">Manage local component state</span>
                </div>
                <div className="border p-2 rounded">
                  <span className="font-bold">useEffect:</span>
                  <span className="text-sm">Perform side effects (API calls, subscriptions)</span>
                </div>
                <div className="border p-2 rounded">
                  <span className="font-bold">useContext:</span>
                  <span className="text-sm">Access context data without prop drilling</span>
                </div>
                <div className="border p-2 rounded">
                  <span className="font-bold">useRef:</span>
                  <span className="text-sm">Hold mutable values and access DOM elements</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-100 p-4 rounded text-yellow-800 mb-6">
              <h3 className="font-bold">Challenge:</h3>
              <p>What React hook would you use to run code on component mount and when dependencies change?</p>
              <p>A) <code>useState</code></p>
              <p>B) <code>useEffect</code></p>
              <p>C) <code>useContext</code></p>
              <p>D) <code>useReducer</code></p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => {
                  updateSkill('react', skills.react + 1);
                  addToInventory('Component Crystal');
                  goToScene('reactComplete');
                }}
                className={`${currentTheme.primary} text-white px-6 py-2 rounded-lg`}
              >
                Complete Quest (Answer: B)
              </button>

              <button
                onClick={() => goToScene('hub')}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg"
              >
                Return to Hub
              </button>
            </div>
          </div>
        </div>
      </div>
    ),

    reactComplete: (
      <div className={`${currentTheme.background} p-6 min-h-screen ${textClass}`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className={`${currentTheme.panel} p-8 rounded-xl mb-6`}>
            <h1 className={`text-4xl font-bold ${currentTheme.accent} mb-6`}>React Quest Complete!</h1>

            <div className="mb-6">
              <div className="w-24 h-24 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-4xl">✓</span>
              </div>
              <p className="text-xl">You've mastered React!</p>
            </div>

            <div className="mb-8">
              <p className="mb-4">You now understand:</p>
              <ul className="list-disc text-left max-w-md mx-auto">
                <li>Component-based architecture</li>
                <li>Props and state management</li>
                <li>React Hooks and lifecycle</li>
                <li>JSX syntax</li>
                <li>Building interactive UIs</li>
              </ul>
            </div>

            <div className="mb-8">
              <p className="font-bold">XP Gained: +100</p>
              <p>New item: Component Crystal added to inventory</p>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => goToScene('hub')}
                className={`${currentTheme.primary} text-white px-6 py-2 rounded-lg`}
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
      <div className={`${currentTheme.background} p-6 min-h-screen ${textClass}`}>
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-3xl font-bold ${currentTheme.accent} mb-6`}>Python Basics</h1>

          <div className={`${currentTheme.panel} p-6 rounded-xl mb-6`}>
            <p className="mb-4">Python is a high-level, interpreted programming language known for its readability and versatility. It's used for web development, data analysis, AI, scientific computing, and more.</p>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>Key Features:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Readability:</strong> Clean syntax with significant whitespace</li>
                <li><strong>Versatility:</strong> Used across many domains and applications</li>
                <li><strong>Extensive Libraries:</strong> Rich standard library and third-party packages</li>
                <li><strong>Interpreted:</strong> No compilation step needed</li>
                <li><strong>Dynamically Typed:</strong> Variable types determined at runtime</li>
                <li><strong>Object-Oriented:</strong> Supports OOP paradigms</li>
              </ul>
            </div>

            <div className="bg-gray-100 p-4 rounded font-mono text-sm text-gray-800 mb-6">
              <p># Variables and data types</p>
              <p>name = "Python Learner"</p>
              <p>age = 25</p>
              <p>is_coding = True</p>
              <p>skills = ["HTML", "CSS", "JavaScript"]</p>
              <p>profile = {"{"}"name": name, "age": age{"}"}</p>
              <br />
              <p># Conditional statement</p>
              <p>if age &gt; 18:</p>
              <p>    print("Adult")</p>
              <p>else:</p>
              <p>    print("Minor")</p>
              <br />
              <p># Loop example</p>
              
              <p>for skill in skills:</p>
              <p>    print(f"I know {'{'} skill {'}'}")</p>
              
              <br />
              <p># Function definition</p>
             
              <p>def greet(person_name):</p>
              <p>    return f"Hello, {'{'} person_name {'}'} !"</p>
             
              <br />
              <p>message = greet(name)</p>
              <p>print(message)  # Output: Hello, Python Learner!</p>
            </div>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>Common Python Libraries:</h3>
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
                  updateSkill('python', skills.python + 1);
                  addToInventory('Python Grimoire');
                  goToScene('pythonComplete');
                }}
                className={`${currentTheme.primary} text-white px-6 py-2 rounded-lg`}
              >
                Complete Quest (Answer: [2, 4, 6, 8])
              </button>

              <button
                onClick={() => goToScene('hub')}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg"
              >
                Return to Hub
              </button>
            </div>
          </div>
        </div>
      </div>
    ),

    flask: (
      <div className={`${currentTheme.background} p-6 min-h-screen ${textClass}`}>
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-3xl font-bold ${currentTheme.accent} mb-6`}>Flask Framework</h1>

          <div className={`${currentTheme.panel} p-6 rounded-xl mb-6`}>
            <p className="mb-4">Flask is a lightweight Python web framework that provides the essentials for building web applications. It's known for its simplicity and flexibility, making it great for small to medium-sized projects.</p>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>Key Features:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Minimalistic:</strong> Small core with extensible architecture</li>
                <li><strong>Flexible:</strong> Few constraints on how to structure applications</li>
                <li><strong>Jinja2 Templating:</strong> Powerful template engine</li>
                <li><strong>Built-in Development Server:</strong> Easy local testing</li>
                <li><strong>RESTful Request Handling:</strong> Route-based URL dispatching</li>
                <li><strong>WSGI Compliant:</strong> Works with standard Python web servers</li>
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
              <p>    return render_template('index.html')</p>
              <br />
              <p># Route with path parameter</p>
              <p>@app.route('/user/&lt;username&gt;')</p>
             
              <p>def user_profile(username):</p>
              <p>    return f"Profile page for {'{'} username {'}'}"</p>
              
              <br />
              <p># API endpoint returning JSON</p>
              <p>@app.route('/api/data')</p>
              <p>def get_data():</p>
              <p>    data = {"{"}</p>
              <p>        "name": "Sample API",</p>
              <p>        "version": "1.0",</p>
              <p>        "items": [1, 2, 3]</p>
              <p>    {"}"}</p>
              <p>    return jsonify(data)</p>
              <br />
              <p>if __name__ == '__main__':</p>
              <p>    app.run(debug=True)</p>
            </div>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>Flask Project Structure:</h3>
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
              <p>A) <code>@app.url()</code></p>
              <p>B) <code>@app.route()</code></p>
              <p>C) <code>@app.endpoint()</code></p>
              <p>D) <code>@app.view()</code></p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => {
                  updateSkill('flask', skills.flask + 1);
                  addToInventory('Flask Vial');
                  goToScene('flaskComplete');
                }}
                className={`${currentTheme.primary} text-white px-6 py-2 rounded-lg`}
              >
                Complete Quest (Answer: B)
              </button>

              <button
                onClick={() => goToScene('hub')}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg"
              >
                Return to Hub
              </button>
            </div>
          </div>
        </div>
      </div>
    ),

    django: (
      <div className={`${currentTheme.background} p-6 min-h-screen ${textClass}`}>
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-3xl font-bold ${currentTheme.accent} mb-6`}>Django Framework</h1>

          <div className={`${currentTheme.panel} p-6 rounded-xl mb-6`}>
            <p className="mb-4">Django is a high-level Python web framework that follows the "batteries-included" philosophy. It provides a robust set of tools and features for building large, scalable web applications with less code and faster development.</p>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>Key Features:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>ORM (Object-Relational Mapping):</strong> Work with databases using Python objects</li>
                <li><strong>Admin Interface:</strong> Built-in administrative panel</li>
                <li><strong>URL Routing:</strong> Flexible and powerful URL dispatching</li>
                <li><strong>Template System:</strong> HTML templates with Python-like syntax</li>
                <li><strong>Form Handling:</strong> Create, validate, and process forms</li>
                <li><strong>Authentication:</strong> User accounts, groups, permissions</li>
                <li><strong>Security Features:</strong> Protection against common attacks</li>
              </ul>
            </div>

            <div className="bg-gray-100 p-4 rounded font-mono text-sm text-gray-800 mb-6">
              <p># models.py - Define database models</p>
              <p>from django.db import models</p>
              <br />
              <p>class Product(models.Model):</p>
              <p>    name = models.CharField(max_length=100)</p>
              <p>    price = models.DecimalField(max_digits=10, decimal_places=2)</p>
              <p>    description = models.TextField()</p>
              <p>    created_at = models.DateTimeField(auto_now_add=True)</p>
              <br />
              <p>    def __str__(self):</p>
              <p>        return self.name</p>
              <br />
              <p># views.py - Define views</p>
              <p>from django.shortcuts import render, get_object_or_404</p>
              <p>from .models import Product</p>
              <br />
              <p>def product_list(request):</p>
              <p>    products = Product.objects.all()</p>
              <p>    return render(request, 'products/list.html', {'{'}"products": products{'}'})</p>
              <br />
              <p>def product_detail(request, pk):</p>
              <p>    product = get_object_or_404(Product, pk=pk)</p>
              <p>    return render(request, 'products/detail.html', {'{'}"product": product{'}'})</p>
              <br />
              <p># urls.py - Define URL patterns</p>
              <p>from django.urls import path</p>
              <p>from . import views</p>
              <br />
              <p>urlpatterns = [</p>
              <p>    path('products/', views.product_list, name='product_list'),</p>
              <p>    path('products/&lt;int:pk&gt;/', views.product_detail, name='product_detail'),</p>
              <p>]</p>
            </div>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>Django's MVT Architecture:</h3>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="border p-3 rounded">
                  <h4 className="font-bold mb-1">Model</h4>
                  <p className="text-sm">Defines data structure and database interactions</p>
                </div>
                <div className="border p-3 rounded">
                  <h4 className="font-bold mb-1">View</h4>
                  <p className="text-sm">Handles business logic and processes requests</p>
                </div>
                <div className="border p-3 rounded">
                  <h4 className="font-bold mb-1">Template</h4>
                  <p className="text-sm">Defines how data is presented to users</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-100 p-4 rounded text-yellow-800 mb-6">
              <h3 className="font-bold">Challenge:</h3>
              <p>In Django, what is used to define a database table structure?</p>
              <p>A) View</p>
              <p>B) Controller</p>
              <p>C) Template</p>
              <p>D) Model</p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => {
                  updateSkill('django', skills.django + 1);
                  addToInventory('Django Staff');
                  goToScene('djangoComplete');
                }}
                className={`${currentTheme.primary} text-white px-6 py-2 rounded-lg`}
              >
                Complete Quest (Answer: D)
              </button>

              <button
                onClick={() => goToScene('hub')}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg"
              >
                Return to Hub
              </button>
            </div>
          </div>
        </div>
      </div>
    ),

    // FINAL PROJECT

    finalProject: (
      <div className={`${currentTheme.background} p-6 min-h-screen ${textClass}`}>
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-3xl font-bold ${currentTheme.accent} mb-6`}>Final Project: Full-Stack Application</h1>

          <div className={`${currentTheme.panel} p-6 rounded-xl mb-6`}>
            <p className="mb-4">Congratulations on completing all the programming quests! You've learned a wide range of technologies that allow you to build complete web applications. Your final challenge is to apply everything you've learned to create a full-stack project.</p>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>Project Overview:</h3>
              <p>Create a personal portfolio website with the following features:</p>
              <ul className="list-disc pl-5 mt-2">
                <li>Responsive design that looks great on all devices</li>
                <li>Project showcase with filtering options</li>
                <li>Contact form that stores messages in a database</li>
                <li>Admin dashboard to manage projects and messages</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>Technical Requirements:</h3>
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
              <h3 className={`text-xl font-bold ${currentTheme.accent} mb-2`}>Project Architecture Diagram:</h3>
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
                  updatePlayerStats('experience', playerStats.experience + 500);
                  addToInventory('Master Developer Certificate');
                  goToScene('gameComplete');
                }}
                className={`${currentTheme.primary} text-white px-6 py-2 rounded-lg`}
              >
                Complete Final Project
              </button>

              <button
                onClick={() => goToScene('hub')}
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
      <div className={`${currentTheme.background} p-6 min-h-screen ${textClass} flex items-center justify-center`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className={`${currentTheme.panel} p-10 rounded-xl mb-6`}>
            <h1 className={`text-5xl font-bold ${currentTheme.accent} mb-8`}>Congratulations, Master Developer!</h1>

            <div className="mb-10">
              <div className="w-32 h-32 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-6xl">🏆</span>
              </div>
              <p className="text-2xl mb-4">You've completed Code Quest: The Path of the Programmer!</p>
              <p className="text-xl">Your journey from novice to full-stack developer is complete.</p>
            </div>

            <div className="mb-8 bg-white bg-opacity-20 p-6 rounded-lg">
              <h2 className={`text-2xl font-bold ${currentTheme.accent} mb-4`}>Your Achievements:</h2>
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
              <h2 className={`text-2xl font-bold ${currentTheme.accent} mb-4`}>Your Next Steps:</h2>
              <p className="mb-4">This is just the beginning of your coding journey! Here are some ways to continue growing:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Build Projects</h3>
                  <p className="text-sm">Create your own applications to strengthen your skills and build your portfolio.</p>
                </div>
                <div className="border p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Learn Advanced Topics</h3>
                  <p className="text-sm">Explore state management, databases, deployment, testing, and more.</p>
                </div>
                <div className="border p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Contribute to Open Source</h3>
                  <p className="text-sm">Join the developer community and collaborate on real-world projects.</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => goToScene('intro')}
                className={`${currentTheme.primary} text-white px-8 py-3 rounded-lg`}
              >
                Start a New Adventure
              </button>
            </div>
          </div>
        </div>
      </div>
    ),

    // COMPLETION SCREENS FOR OTHER TECHNOLOGIES

    cssComplete: (
      <div className={`${currentTheme.background} p-6 min-h-screen ${textClass}`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className={`${currentTheme.panel} p-8 rounded-xl mb-6`}>
            <h1 className={`text-4xl font-bold ${currentTheme.accent} mb-6`}>CSS Quest Complete!</h1>

            <div className="mb-6">
              <div className="w-24 h-24 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-4xl">✓</span>
              </div>
              <p className="text-xl">You've mastered Cascading Style Sheets!</p>
            </div>

            <div className="mb-8">
              <p className="mb-4">You now understand:</p>
              <ul className="list-disc text-left max-w-md mx-auto">
                <li>Selectors, properties, and values</li>
                <li>The CSS Box Model</li>
                <li>Layout systems (Flexbox, Grid)</li>
                <li>Responsive design principles</li>
                <li>CSS positioning and effects</li>
              </ul>
            </div>

            <div className="mb-8">
              <p className="font-bold">XP Gained: +100</p>
              <p>New item: Style Palette added to inventory</p>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => goToScene('hub')}
                className={`${currentTheme.primary} text-white px-6 py-2 rounded-lg`}
              >
                Return to Hub
              </button>

              <button
                onClick={() => goToScene('javascript')}
                className={`${currentTheme.secondary} text-white px-6 py-2 rounded-lg`}
              >
                Continue to JavaScript Quest
              </button>
            </div>
          </div>
        </div>
      </div>
    ),

    tailwindComplete: (
      <div className={`${currentTheme.background} p-6 min-h-screen ${textClass}`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className={`${currentTheme.panel} p-8 rounded-xl mb-6`}>
            <h1 className={`text-4xl font-bold ${currentTheme.accent} mb-6`}>Tailwind CSS Quest Complete!</h1>

            <div className="mb-6">
              <div className="w-24 h-24 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-4xl">✓</span>
              </div>
              <p className="text-xl">You've mastered utility-first CSS!</p>
            </div>

            <div className="mb-8">
              <p className="mb-4">You now understand:</p>
              <ul className="list-disc text-left max-w-md mx-auto">
                <li>Utility-first CSS philosophy</li>
                <li>Responsive design with breakpoint prefixes</li>
                <li>State variants like hover and focus</li>
                <li>Customizing and extending Tailwind</li>
                <li>Building complex designs without writing custom CSS</li>
              </ul>
            </div>

            <div className="mb-8">
              <p className="font-bold">XP Gained: +100</p>
              <p>New item: Utility Belt added to inventory</p>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => goToScene('hub')}
                className={`${currentTheme.primary} text-white px-6 py-2 rounded-lg`}
              >
                Return to Hub
              </button>
            </div>
          </div>
        </div>
      </div>
    ),

    pythonComplete: (
      <div className={`${currentTheme.background} p-6 min-h-screen ${textClass}`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className={`${currentTheme.panel} p-8 rounded-xl mb-6`}>
            <h1 className={`text-4xl font-bold ${currentTheme.accent} mb-6`}>Python Quest Complete!</h1>

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
                onClick={() => goToScene('hub')}
                className={`${currentTheme.primary} text-white px-6 py-2 rounded-lg`}
              >
                Return to Hub
              </button>

              <button
                onClick={() => goToScene('flask')}
                className={`${currentTheme.secondary} text-white px-6 py-2 rounded-lg`}
              >
                Continue to Flask Quest
              </button>
            </div>
          </div>
        </div>
      </div>
    ),

    flaskComplete: (
      <div className={`${currentTheme.background} p-6 min-h-screen ${textClass}`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className={`${currentTheme.panel} p-8 rounded-xl mb-6`}>
            <h1 className={`text-4xl font-bold ${currentTheme.accent} mb-6`}>Flask Quest Complete!</h1>

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
                onClick={() => goToScene('hub')}
                className={`${currentTheme.primary} text-white px-6 py-2 rounded-lg`}
              >
                Return to Hub
              </button>

              <button
                onClick={() => goToScene('django')}
                className={`${currentTheme.secondary} text-white px-6 py-2 rounded-lg`}
              >
                Continue to Django Quest
              </button>
            </div>
          </div>
        </div>
      </div>
    ),

    djangoComplete: (
      <div className={`${currentTheme.background} p-6 min-h-screen ${textClass}`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className={`${currentTheme.panel} p-8 rounded-xl mb-6`}>
            <h1 className={`text-4xl font-bold ${currentTheme.accent} mb-6`}>Django Quest Complete!</h1>

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
                onClick={() => goToScene('hub')}
                className={`${currentTheme.primary} text-white px-6 py-2 rounded-lg`}
              >
                Return to Hub
              </button>

              <button
                onClick={() => allLanguageQuestsCompleted() ? goToScene('finalProject') : null}
                className={`${allLanguageQuestsCompleted() ? currentTheme.secondary : 'bg-gray-400'} text-white px-6 py-2 rounded-lg`}
                disabled={!allLanguageQuestsCompleted()}
              >
                {allLanguageQuestsCompleted() ? 'Start Final Project' : 'Complete All Quests First'}
              </button>
            </div>
          </div>
        </div>
      </div>
    ),
  };

  return (
    <div className="transition-all duration-500">
      {scenes[currentScene]}

      {/* Level up animation */}
      {showAnimation && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-yellow-400 text-yellow-900 text-3xl font-bold py-4 px-8 rounded-lg animate-bounce shadow-lg">
            {animationMessage}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedCodeQuest;