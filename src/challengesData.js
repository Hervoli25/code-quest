// Sample code challenges for Code Quest
const codeChallenges = {
  // JAVASCRIPT CHALLENGES
  javascript: [
    // Variables & Data Types
    {
      id: "js-variables-1",
      title: "Create Variables",
      description:
        'Create three variables: a string called "name" with your name, a number called "age" with any age, and a boolean called "isStudent" set to true.',
      difficulty: "beginner",
      category: "variables",
      language: "javascript",
      starterCode:
        '// Create your variables here\n\n// Don\'t modify the code below\nconsole.log("Name:", name);\nconsole.log("Age:", age);\nconsole.log("Is Student:", isStudent);',
      hints: [
        "Use let or const to declare variables",
        "Strings need quotation marks around them",
        "Booleans are either true or false (no quotes)",
      ],
      tests: [
        {
          description: 'Variable "name" should be a string',
          test: 'if (typeof name !== "string") throw new Error("name should be a string");',
        },
        {
          description: 'Variable "age" should be a number',
          test: 'if (typeof age !== "number") throw new Error("age should be a number");',
        },
        {
          description: 'Variable "isStudent" should be a boolean',
          test: 'if (typeof isStudent !== "boolean") throw new Error("isStudent should be a boolean");',
        },
      ],
      solution:
        'let name = "CodeQuest Player";\nlet age = 25;\nlet isStudent = true;\n\n// Don\'t modify the code below\nconsole.log("Name:", name);\nconsole.log("Age:", age);\nconsole.log("Is Student:", isStudent);',
    },

    // Conditionals
    {
      id: "js-conditionals-1",
      title: "Grade Calculator",
      description:
        'Write a function called "getGrade" that takes a score (0-100) and returns the corresponding letter grade: A (90-100), B (80-89), C (70-79), D (60-69), F (0-59).',
      difficulty: "beginner",
      category: "conditionals",
      language: "javascript",
      starterCode:
        'function getGrade(score) {\n  // Your code here\n  \n}\n\n// Test your function\nconsole.log(getGrade(95)); // should return "A"\nconsole.log(getGrade(82)); // should return "B"\nconsole.log(getGrade(75)); // should return "C"\nconsole.log(getGrade(65)); // should return "D"\nconsole.log(getGrade(42)); // should return "F"',
      hints: [
        "Use if, else if, and else statements to check score ranges",
        "Start with the highest grade and work down",
        "Make sure to return the letter grade as a string",
      ],
      tests: [
        {
          description: 'Should return "A" for score 95',
          test: 'if (getGrade(95) !== "A") throw new Error("Expected A for score 95");',
        },
        {
          description: 'Should return "B" for score 82',
          test: 'if (getGrade(82) !== "B") throw new Error("Expected B for score 82");',
        },
        {
          description: 'Should return "C" for score 75',
          test: 'if (getGrade(75) !== "C") throw new Error("Expected C for score 75");',
        },
        {
          description: 'Should return "D" for score 65',
          test: 'if (getGrade(65) !== "D") throw new Error("Expected D for score 65");',
        },
        {
          description: 'Should return "F" for score 42',
          test: 'if (getGrade(42) !== "F") throw new Error("Expected F for score 42");',
        },
      ],
      solution:
        'function getGrade(score) {\n  if (score >= 90) {\n    return "A";\n  } else if (score >= 80) {\n    return "B";\n  } else if (score >= 70) {\n    return "C";\n  } else if (score >= 60) {\n    return "D";\n  } else {\n    return "F";\n  }\n}\n\n// Test your function\nconsole.log(getGrade(95)); // should return "A"\nconsole.log(getGrade(82)); // should return "B"\nconsole.log(getGrade(75)); // should return "C"\nconsole.log(getGrade(65)); // should return "D"\nconsole.log(getGrade(42)); // should return "F"',
    },

    // Loops
    {
      id: "js-loops-1",
      title: "Sum of Numbers",
      description:
        'Write a function called "sumNumbers" that calculates the sum of all numbers from 1 to n (where n is passed as a parameter).',
      difficulty: "beginner",
      category: "loops",
      language: "javascript",
      starterCode:
        "function sumNumbers(n) {\n  // Your code here\n  \n}\n\n// Test your function\nconsole.log(sumNumbers(5)); // should return 15 (1+2+3+4+5)\nconsole.log(sumNumbers(10)); // should return 55",
      hints: [
        "Use a for loop that goes from 1 to n",
        "Create a variable to keep track of the sum",
        "Add each number to the sum in each iteration",
      ],
      tests: [
        {
          description: "Should return 15 for n=5",
          test: 'if (sumNumbers(5) !== 15) throw new Error("Expected 15 for n=5");',
        },
        {
          description: "Should return 55 for n=10",
          test: 'if (sumNumbers(10) !== 55) throw new Error("Expected 55 for n=10");',
        },
        {
          description: "Should return 1 for n=1",
          test: 'if (sumNumbers(1) !== 1) throw new Error("Expected 1 for n=1");',
        },
      ],
      solution:
        "function sumNumbers(n) {\n  let sum = 0;\n  for (let i = 1; i <= n; i++) {\n    sum += i;\n  }\n  return sum;\n}\n\n// Test your function\nconsole.log(sumNumbers(5)); // should return 15 (1+2+3+4+5)\nconsole.log(sumNumbers(10)); // should return 55",
    },

    // Functions
    {
      id: "js-functions-1",
      title: "Multiply and Format",
      description:
        'Write a function called "multiplyAndFormat" that takes two numbers, multiplies them, and returns a formatted string with the result and a dollar sign (e.g., "$15.00").',
      difficulty: "beginner",
      category: "functions",
      language: "javascript",
      starterCode:
        'function multiplyAndFormat(a, b) {\n  // Your code here\n  \n}\n\n// Test your function\nconsole.log(multiplyAndFormat(5, 3)); // should return "$15.00"\nconsole.log(multiplyAndFormat(10.5, 2)); // should return "$21.00"',
      hints: [
        "Multiply the numbers first",
        "Use .toFixed(2) to format to 2 decimal places",
        "Add a dollar sign to the beginning of the string",
      ],
      tests: [
        {
          description: 'Should return "$15.00" for 5 and 3',
          test: 'if (multiplyAndFormat(5, 3) !== "$15.00") throw new Error("Expected $15.00 for 5 * 3");',
        },
        {
          description: 'Should return "$21.00" for 10.5 and 2',
          test: 'if (multiplyAndFormat(10.5, 2) !== "$21.00") throw new Error("Expected $21.00 for 10.5 * 2");',
        },
        {
          description: 'Should return "$0.00" for 0 and 5',
          test: 'if (multiplyAndFormat(0, 5) !== "$0.00") throw new Error("Expected $0.00 for 0 * 5");',
        },
      ],
      solution:
        'function multiplyAndFormat(a, b) {\n  const result = a * b;\n  return "$" + result.toFixed(2);\n}\n\n// Test your function\nconsole.log(multiplyAndFormat(5, 3)); // should return "$15.00"\nconsole.log(multiplyAndFormat(10.5, 2)); // should return "$21.00"',
    },

    // Arrays
    {
      id: "js-arrays-1",
      title: "Filter Even Numbers",
      description:
        'Write a function called "filterEvenNumbers" that takes an array of numbers and returns a new array containing only the even numbers.',
      difficulty: "intermediate",
      category: "arrays",
      language: "javascript",
      starterCode:
        "function filterEvenNumbers(numbers) {\n  // Your code here\n  \n}\n\n// Test your function\nconsole.log(filterEvenNumbers([1, 2, 3, 4, 5, 6])); // should return [2, 4, 6]\nconsole.log(filterEvenNumbers([7, 9, 11, 13])); // should return []",
      hints: [
        "Use the array filter() method",
        "A number is even if number % 2 === 0",
        "You can also use a for loop with a new array if you prefer",
      ],
      tests: [
        {
          description: "Should return [2, 4, 6] for [1, 2, 3, 4, 5, 6]",
          test: 'const result = filterEvenNumbers([1, 2, 3, 4, 5, 6]);\nif (!Array.isArray(result)) throw new Error("Should return an array");\nif (result.length !== 3) throw new Error("Should return array with 3 items");\nif (result[0] !== 2 || result[1] !== 4 || result[2] !== 6) throw new Error("Expected [2, 4, 6]");',
        },
        {
          description: "Should return [] for [7, 9, 11, 13]",
          test: 'const result = filterEvenNumbers([7, 9, 11, 13]);\nif (!Array.isArray(result)) throw new Error("Should return an array");\nif (result.length !== 0) throw new Error("Should return empty array");',
        },
      ],
      solution:
        "function filterEvenNumbers(numbers) {\n  return numbers.filter(number => number % 2 === 0);\n}\n\n// Test your function\nconsole.log(filterEvenNumbers([1, 2, 3, 4, 5, 6])); // should return [2, 4, 6]\nconsole.log(filterEvenNumbers([7, 9, 11, 13])); // should return []",
    },

    // Advanced - Closures
    {
      id: "js-closures-1",
      title: "Create a Counter Factory",
      description:
        'Create a function called "createCounter" that returns a counter function. Each counter function should maintain its own count that starts at 0 and increments by 1 each time it\'s called.',
      difficulty: "advanced",
      category: "closures",
      language: "javascript",
      starterCode:
        "function createCounter() {\n  // Your code here\n  \n}\n\n// Test your function\nconst counter1 = createCounter();\nconst counter2 = createCounter();\n\nconsole.log(counter1()); // should return 0\nconsole.log(counter1()); // should return 1\nconsole.log(counter2()); // should return 0 (separate counter)\nconsole.log(counter1()); // should return 2\nconsole.log(counter2()); // should return 1",
      hints: [
        "Use a closure to maintain state between function calls",
        "Initialize a local variable in the outer function",
        "Return a function that has access to that variable",
      ],
      tests: [
        {
          description: "First call to counter should return 0",
          test: 'const counter = createCounter(); if (counter() !== 0) throw new Error("First call should return 0");',
        },
        {
          description: "Second call to counter should return 1",
          test: 'const counter = createCounter(); counter(); if (counter() !== 1) throw new Error("Second call should return 1");',
        },
        {
          description: "Separate counters should maintain separate counts",
          test: 'const c1 = createCounter(); const c2 = createCounter(); c1(); if (c2() !== 0) throw new Error("Second counter should start at 0");',
        },
      ],
      solution:
        "function createCounter() {\n  let count = -1;\n  return function() {\n    count += 1;\n    return count;\n  };\n}\n\n// Test your function\nconst counter1 = createCounter();\nconst counter2 = createCounter();\n\nconsole.log(counter1()); // should return 0\nconsole.log(counter1()); // should return 1\nconsole.log(counter2()); // should return 0 (separate counter)\nconsole.log(counter1()); // should return 2\nconsole.log(counter2()); // should return 1",
    },

    // Expert - Async Programming
    {
      id: "js-async-1",
      title: "Promise Chain",
      description:
        'Create a function called "processInSequence" that takes an array of asynchronous functions and executes them in sequence, passing the result of each function to the next one. Return a promise that resolves with the final result.',
      difficulty: "expert",
      category: "async-programming",
      language: "javascript",
      starterCode:
        "function processInSequence(asyncFunctions, initialValue) {\n  // Your code here\n  \n}\n\n// Test your function\nconst asyncDouble = x => Promise.resolve(x * 2);\nconst asyncIncrement = x => Promise.resolve(x + 1);\nconst asyncSquare = x => Promise.resolve(x * x);\n\nprocessInSequence([asyncDouble, asyncIncrement, asyncSquare], 3)\n  .then(result => console.log(result)) // should log 49: (3*2+1)^2 = 7^2 = 49\n  .catch(error => console.error(error));",
      hints: [
        "Use Array.reduce() with promises",
        "Start with Promise.resolve(initialValue)",
        "Chain each async function using .then()",
      ],
      tests: [
        {
          description: "Should process functions in sequence",
          test: "const asyncDouble = x => Promise.resolve(x * 2); const asyncIncrement = x => Promise.resolve(x + 1); const asyncSquare = x => Promise.resolve(x * x); return processInSequence([asyncDouble, asyncIncrement, asyncSquare], 3).then(result => { if (result !== 49) throw new Error(`Expected 49, got ${result}`); });",
        },
      ],
      solution:
        "function processInSequence(asyncFunctions, initialValue) {\n  return asyncFunctions.reduce(\n    (promise, asyncFunc) => promise.then(asyncFunc),\n    Promise.resolve(initialValue)\n  );\n}\n\n// Test your function\nconst asyncDouble = x => Promise.resolve(x * 2);\nconst asyncIncrement = x => Promise.resolve(x + 1);\nconst asyncSquare = x => Promise.resolve(x * x);\n\nprocessInSequence([asyncDouble, asyncIncrement, asyncSquare], 3)\n  .then(result => console.log(result)) // should log 49: (3*2+1)^2 = 7^2 = 49\n  .catch(error => console.error(error));",
    },

    // Master - Design Patterns
    {
      id: "js-design-patterns-1",
      title: "Implement the Observer Pattern",
      description:
        'Implement a simple event system with "subscribe", "unsubscribe", and "publish" methods. The system should allow callbacks to subscribe to events, unsubscribe from events, and publish events with data.',
      difficulty: "master",
      category: "design-patterns",
      language: "javascript",
      starterCode:
        "class EventSystem {\n  // Your code here\n  \n}\n\n// Test your implementation\nconst events = new EventSystem();\n\n// Subscribe to events\nconst handler1 = data => console.log('Handler 1:', data);\nconst handler2 = data => console.log('Handler 2:', data);\n\nevents.subscribe('userLoggedIn', handler1);\nevents.subscribe('userLoggedIn', handler2);\nevents.subscribe('userLoggedOut', handler1);\n\n// Publish events\nevents.publish('userLoggedIn', { user: 'Alice' });\n// Should log:\n// Handler 1: { user: 'Alice' }\n// Handler 2: { user: 'Alice' }\n\n// Unsubscribe handler1 from userLoggedIn\nevents.unsubscribe('userLoggedIn', handler1);\n\n// Publish again\nevents.publish('userLoggedIn', { user: 'Bob' });\n// Should only log:\n// Handler 2: { user: 'Bob' }\n\nevents.publish('userLoggedOut', { user: 'Alice' });\n// Should log:\n// Handler 1: { user: 'Alice' }",
      hints: [
        "Use a Map to store event types and their handlers",
        "Each event type should have an array of handler functions",
        "Make sure to handle cases where events or handlers don't exist",
      ],
      tests: [
        {
          description: "Should allow subscribing to events",
          test: 'const events = new EventSystem(); let called = false; events.subscribe("test", () => { called = true; }); events.publish("test"); if (!called) throw new Error("Event handler was not called");',
        },
        {
          description: "Should allow unsubscribing from events",
          test: 'const events = new EventSystem(); let called = false; const handler = () => { called = true; }; events.subscribe("test", handler); events.unsubscribe("test", handler); events.publish("test"); if (called) throw new Error("Event handler was called after unsubscribing");',
        },
      ],
      solution:
        "class EventSystem {\n  constructor() {\n    this.events = new Map();\n  }\n  \n  subscribe(eventName, handler) {\n    if (!this.events.has(eventName)) {\n      this.events.set(eventName, []);\n    }\n    \n    this.events.get(eventName).push(handler);\n  }\n  \n  unsubscribe(eventName, handler) {\n    if (!this.events.has(eventName)) return;\n    \n    const handlers = this.events.get(eventName);\n    const index = handlers.indexOf(handler);\n    \n    if (index !== -1) {\n      handlers.splice(index, 1);\n    }\n  }\n  \n  publish(eventName, data) {\n    if (!this.events.has(eventName)) return;\n    \n    const handlers = this.events.get(eventName);\n    handlers.forEach(handler => handler(data));\n  }\n}\n\n// Test your implementation\nconst events = new EventSystem();\n\n// Subscribe to events\nconst handler1 = data => console.log('Handler 1:', data);\nconst handler2 = data => console.log('Handler 2:', data);\n\nevents.subscribe('userLoggedIn', handler1);\nevents.subscribe('userLoggedIn', handler2);\nevents.subscribe('userLoggedOut', handler1);\n\n// Publish events\nevents.publish('userLoggedIn', { user: 'Alice' });\n// Should log:\n// Handler 1: { user: 'Alice' }\n// Handler 2: { user: 'Alice' }\n\n// Unsubscribe handler1 from userLoggedIn\nevents.unsubscribe('userLoggedIn', handler1);\n\n// Publish again\nevents.publish('userLoggedIn', { user: 'Bob' });\n// Should only log:\n// Handler 2: { user: 'Bob' }\n\nevents.publish('userLoggedOut', { user: 'Alice' });\n// Should log:\n// Handler 1: { user: 'Alice' }",
    },
  ],

  // HTML CHALLENGES
  html: [
    // Basic Structure
    {
      id: "html-structure-1",
      title: "Create a Basic Webpage",
      description:
        "Create a simple webpage with a heading, a paragraph, and an image. Use proper HTML structure.",
      difficulty: "beginner",
      category: "html-structure",
      language: "html",
      starterCode: "<!-- Create your webpage here -->",
      hints: [
        "Start with <!DOCTYPE html> and <html> tags",
        "Include <head> and <body> sections",
        "Use <h1> for the main heading, <p> for a paragraph, and <img> for an image",
      ],
      tests: [
        // HTML doesn't have automated tests in this simple implementation
        // Tests would be handled differently for HTML
      ],
      solution:
        '<!DOCTYPE html>\n<html>\n<head>\n  <title>My Webpage</title>\n</head>\n<body>\n  <h1>Welcome to My Webpage</h1>\n  <p>This is a paragraph of text on my webpage.</p>\n  <img src="https://via.placeholder.com/150" alt="Placeholder Image">\n</body>\n</html>',
    },

    // Forms
    {
      id: "html-forms-1",
      title: "Create a Contact Form",
      description:
        "Create a contact form with fields for name, email, and a message. Include a submit button.",
      difficulty: "beginner",
      category: "html-forms",
      language: "html",
      starterCode: "<!-- Create your contact form here -->",
      hints: [
        "Use the <form> element to create a form",
        "Add <input> elements for name and email with appropriate types",
        "Use <textarea> for the message field",
        'Include a <button> with type="submit"',
      ],
      tests: [],
      solution:
        '<form>\n  <div>\n    <label for="name">Name:</label>\n    <input type="text" id="name" name="name" required>\n  </div>\n  <div>\n    <label for="email">Email:</label>\n    <input type="email" id="email" name="email" required>\n  </div>\n  <div>\n    <label for="message">Message:</label>\n    <textarea id="message" name="message" rows="4" required></textarea>\n  </div>\n  <button type="submit">Send Message</button>\n</form>',
    },
  ],

  // CSS CHALLENGES (could be implemented in HTML with embedded CSS)
  css: [
    // Basic Styling
    {
      id: "css-styling-1",
      title: "Style a Card",
      description:
        "Style the provided HTML to create a card with rounded corners, a shadow, padding, and centered text.",
      difficulty: "beginner",
      category: "css-styling",
      language: "html",
      starterCode:
        '<style>\n  /* Add your CSS here */\n  \n</style>\n\n<div class="card">\n  <h2>Card Title</h2>\n  <p>This is some content inside the card. Style it to look nice!</p>\n</div>',
      hints: [
        "Use the .card selector to target the div",
        "Add padding, border-radius, and box-shadow properties",
        "Use text-align: center for centered text",
      ],
      tests: [],
      solution:
        '<style>\n  .card {\n    padding: 20px;\n    border-radius: 8px;\n    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n    text-align: center;\n    background-color: white;\n    margin: 20px;\n  }\n  \n  h2 {\n    color: #333;\n  }\n  \n  p {\n    color: #666;\n  }\n</style>\n\n<div class="card">\n  <h2>Card Title</h2>\n  <p>This is some content inside the card. Style it to look nice!</p>\n</div>',
    },
  ],

  // PYTHON CHALLENGES
  python: [
    // Basic Functions
    {
      id: "py-functions-1",
      title: "Temperature Converter",
      description:
        'Write a function called "celsius_to_fahrenheit" that converts a temperature from Celsius to Fahrenheit using the formula: F = C × 9/5 + 32',
      difficulty: "beginner",
      category: "functions",
      language: "python",
      starterCode:
        "def celsius_to_fahrenheit(celsius):\n    # Your code here\n    pass\n\n# Test your function\nprint(celsius_to_fahrenheit(0))  # should return 32.0\nprint(celsius_to_fahrenheit(100))  # should return 212.0\nprint(celsius_to_fahrenheit(-40))  # should return -40.0",
      hints: [
        "Use the formula F = C × 9/5 + 32",
        "Make sure to return the result, not just print it",
        "Python uses * for multiplication and / for division",
      ],
      tests: [],
      solution:
        "def celsius_to_fahrenheit(celsius):\n    return celsius * 9/5 + 32\n\n# Test your function\nprint(celsius_to_fahrenheit(0))  # should return 32.0\nprint(celsius_to_fahrenheit(100))  # should return 212.0\nprint(celsius_to_fahrenheit(-40))  # should return -40.0",
    },

    // Intermediate - List Comprehensions
    {
      id: "py-list-comp-1",
      title: "List Comprehension Filter",
      description:
        'Write a function called "filter_words" that takes a list of words and a minimum length, and returns a new list containing only the words that have at least that many characters. Use a list comprehension.',
      difficulty: "intermediate",
      category: "list-comprehensions",
      language: "python",
      starterCode:
        "def filter_words(words, min_length):\n    # Your code here using list comprehension\n    pass\n\n# Test your function\nwords = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig']\nprint(filter_words(words, 5))  # should return ['apple', 'banana', 'cherry', 'elderberry']\nprint(filter_words(words, 6))  # should return ['banana', 'cherry', 'elderberry']",
      hints: [
        "Use the syntax [expression for item in iterable if condition]",
        "The condition should check if len(word) >= min_length",
        "List comprehensions are more concise than using a for loop",
      ],
      tests: [],
      solution:
        "def filter_words(words, min_length):\n    return [word for word in words if len(word) >= min_length]\n\n# Test your function\nwords = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig']\nprint(filter_words(words, 5))  # should return ['apple', 'banana', 'cherry', 'elderberry']\nprint(filter_words(words, 6))  # should return ['banana', 'cherry', 'elderberry']",
    },

    // Advanced - Decorators
    {
      id: "py-decorators-1",
      title: "Create a Timing Decorator",
      description:
        'Create a decorator called "timing_decorator" that measures and prints the time it takes for a function to execute.',
      difficulty: "advanced",
      category: "decorators",
      language: "python",
      starterCode:
        "import time\n\n# Create your timing_decorator here\n\n\n# Test your decorator\n@timing_decorator\ndef slow_function():\n    # Simulate a slow function\n    time.sleep(1)\n    return 'Function completed'\n\nprint(slow_function())  # Should print timing info and return 'Function completed'",
      hints: [
        "Use the time module to measure execution time",
        "A decorator is a function that takes another function as an argument",
        "Use a nested wrapper function to capture the function's execution time",
      ],
      tests: [],
      solution:
        "import time\n\ndef timing_decorator(func):\n    def wrapper(*args, **kwargs):\n        start_time = time.time()\n        result = func(*args, **kwargs)\n        end_time = time.time()\n        print(f'Function {func.__name__} took {end_time - start_time:.4f} seconds to run')\n        return result\n    return wrapper\n\n# Test your decorator\n@timing_decorator\ndef slow_function():\n    # Simulate a slow function\n    time.sleep(1)\n    return 'Function completed'\n\nprint(slow_function())  # Should print timing info and return 'Function completed'",
    },

    // Expert - Generators
    {
      id: "py-generators-1",
      title: "Implement a Prime Number Generator",
      description:
        'Create a generator function called "prime_generator" that yields prime numbers indefinitely. A prime number is a natural number greater than 1 that is not divisible by any positive integer other than 1 and itself.',
      difficulty: "expert",
      category: "generators",
      language: "python",
      starterCode:
        "def prime_generator():\n    # Your code here\n    pass\n\n# Test your generator\nprimes = prime_generator()\nfor _ in range(10):\n    print(next(primes))  # Should print the first 10 prime numbers: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29",
      hints: [
        "Use the 'yield' keyword to create a generator function",
        "Check if a number is prime by testing divisibility by all integers from 2 to sqrt(n)",
        "Use a while True loop to generate primes indefinitely",
      ],
      tests: [],
      solution:
        "def prime_generator():\n    # Start with 2, the first prime number\n    yield 2\n    \n    # Check odd numbers starting from 3\n    num = 3\n    while True:\n        is_prime = True\n        # Check divisibility up to the square root of num\n        for i in range(2, int(num**0.5) + 1):\n            if num % i == 0:\n                is_prime = False\n                break\n        \n        if is_prime:\n            yield num\n        \n        # Move to the next odd number (skip even numbers)\n        num += 2\n\n# Test your generator\nprimes = prime_generator()\nfor _ in range(10):\n    print(next(primes))  # Should print the first 10 prime numbers: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29",
    },

    // Master - Metaclasses
    {
      id: "py-metaclasses-1",
      title: "Create a Singleton Metaclass",
      description:
        'Implement a metaclass called "SingletonMeta" that ensures any class using it as a metaclass will only ever have one instance, no matter how many times the class is instantiated.',
      difficulty: "master",
      category: "metaclasses",
      language: "python",
      starterCode:
        "# Define your SingletonMeta metaclass here\n\n\n# Test your metaclass\nclass Database(metaclass=SingletonMeta):\n    def __init__(self):\n        print('Database initialized')\n\n# These should refer to the same instance\ndb1 = Database()\ndb2 = Database()\n\n# Should print True\nprint(db1 is db2)",
      hints: [
        "A metaclass is a class that defines how other classes are created",
        "Override the __call__ method to control instance creation",
        "Use a class variable to store the single instance",
      ],
      tests: [],
      solution:
        "class SingletonMeta(type):\n    _instances = {}\n    \n    def __call__(cls, *args, **kwargs):\n        if cls not in cls._instances:\n            cls._instances[cls] = super().__call__(*args, **kwargs)\n        return cls._instances[cls]\n\n# Test your metaclass\nclass Database(metaclass=SingletonMeta):\n    def __init__(self):\n        print('Database initialized')\n\n# These should refer to the same instance\ndb1 = Database()\ndb2 = Database()\n\n# Should print True\nprint(db1 is db2)",
    },
  ],

  // JAVA CHALLENGES
  java: [
    {
      id: "java-basics-1",
      title: "Hello Java",
      description:
        "Create a simple Java program that prints 'Hello, Java!' to the console.",
      difficulty: "beginner",
      category: "basics",
      language: "java",
      starterCode:
        "public class HelloJava {\n    public static void main(String[] args) {\n        // Your code here\n        \n    }\n}",
      hints: [
        "Use System.out.println() to print to the console",
        "Make sure to include the semicolon at the end of the statement",
        "Java is case-sensitive",
      ],
      tests: [],
      solution:
        'public class HelloJava {\n    public static void main(String[] args) {\n        System.out.println("Hello, Java!");\n    }\n}',
    },

    // OOP - Classes and Objects
    {
      id: "java-oop-1",
      title: "Create a Student Class",
      description:
        "Create a Student class with name, age, and grade properties, a constructor, and a method to display student information.",
      difficulty: "intermediate",
      category: "object-oriented-programming",
      language: "java",
      starterCode:
        '// Create your Student class here\n\n\n// Test your class\npublic class Main {\n    public static void main(String[] args) {\n        Student student = new Student("Alice", 15, 10);\n        student.displayInfo();  // Should print: Name: Alice, Age: 15, Grade: 10\n    }\n}',
      hints: [
        "Define instance variables for name, age, and grade",
        "Create a constructor that initializes these variables",
        "Implement a displayInfo() method to print the student's information",
      ],
      tests: [],
      solution:
        'class Student {\n    private String name;\n    private int age;\n    private int grade;\n    \n    public Student(String name, int age, int grade) {\n        this.name = name;\n        this.age = age;\n        this.grade = grade;\n    }\n    \n    public void displayInfo() {\n        System.out.println("Name: " + name + ", Age: " + age + ", Grade: " + grade);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Student student = new Student("Alice", 15, 10);\n        student.displayInfo();  // Should print: Name: Alice, Age: 15, Grade: 10\n    }\n}',
    },

    // Data Structures
    {
      id: "java-data-structures-1",
      title: "Implement a Stack",
      description:
        "Implement a simple stack data structure with push, pop, and peek operations using an array.",
      difficulty: "advanced",
      category: "data-structures",
      language: "java",
      starterCode:
        "class Stack {\n    // Your implementation here\n    \n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Stack stack = new Stack();\n        stack.push(1);\n        stack.push(2);\n        stack.push(3);\n        \n        System.out.println(stack.peek());  // Should print: 3\n        System.out.println(stack.pop());   // Should print: 3\n        System.out.println(stack.pop());   // Should print: 2\n        System.out.println(stack.pop());   // Should print: 1\n    }\n}",
      hints: [
        "Use an array to store the stack elements",
        "Keep track of the top of the stack with an index variable",
        "Handle edge cases like empty stack and stack overflow",
      ],
      tests: [],
      solution:
        'class Stack {\n    private int[] array;\n    private int top;\n    private int capacity;\n    \n    public Stack() {\n        capacity = 10;  // Default capacity\n        array = new int[capacity];\n        top = -1;  // Stack is initially empty\n    }\n    \n    public void push(int item) {\n        if (top == capacity - 1) {\n            // Stack overflow\n            System.out.println("Stack is full");\n            return;\n        }\n        \n        array[++top] = item;\n    }\n    \n    public int pop() {\n        if (top == -1) {\n            // Stack underflow\n            System.out.println("Stack is empty");\n            return -1;\n        }\n        \n        return array[top--];\n    }\n    \n    public int peek() {\n        if (top == -1) {\n            // Stack is empty\n            System.out.println("Stack is empty");\n            return -1;\n        }\n        \n        return array[top];\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Stack stack = new Stack();\n        stack.push(1);\n        stack.push(2);\n        stack.push(3);\n        \n        System.out.println(stack.peek());  // Should print: 3\n        System.out.println(stack.pop());   // Should print: 3\n        System.out.println(stack.pop());   // Should print: 2\n        System.out.println(stack.pop());   // Should print: 1\n    }\n}',
    },
  ],

  // RUBY CHALLENGES
  ruby: [
    {
      id: "ruby-basics-1",
      title: "Hello Ruby",
      description:
        "Create a simple Ruby program that prints 'Hello, Ruby!' to the console.",
      difficulty: "beginner",
      category: "basics",
      language: "ruby",
      starterCode: "# Your code here\n\n",
      hints: [
        "Use puts to print to the console",
        "Ruby doesn't require semicolons",
        "Strings can be enclosed in single or double quotes",
      ],
      tests: [],
      solution: 'puts "Hello, Ruby!"',
    },
  ],

  // GO CHALLENGES
  go: [
    {
      id: "go-basics-1",
      title: "Hello Go",
      description:
        "Create a simple Go program that prints 'Hello, Go!' to the console.",
      difficulty: "beginner",
      category: "basics",
      language: "go",
      starterCode:
        'package main\n\nimport "fmt"\n\nfunc main() {\n    // Your code here\n    \n}\n',
      hints: [
        "Use fmt.Println() to print to the console",
        "Go requires explicit imports",
        "The main function is the entry point of a Go program",
      ],
      tests: [],
      solution:
        'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, Go!")\n}\n',
    },
  ],

  // C# CHALLENGES
  csharp: [
    {
      id: "csharp-basics-1",
      title: "Hello C#",
      description:
        "Create a simple C# program that prints 'Hello, C#!' to the console.",
      difficulty: "beginner",
      category: "basics",
      language: "csharp",
      starterCode:
        "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        // Your code here\n        \n    }\n}\n",
      hints: [
        "Use Console.WriteLine() to print to the console",
        "C# statements end with a semicolon",
        "C# is case-sensitive",
      ],
      tests: [],
      solution:
        'using System;\n\nclass Program\n{\n    static void Main()\n    {\n        Console.WriteLine("Hello, C#!");\n    }\n}\n',
    },
  ],

  // SWIFT CHALLENGES
  swift: [
    {
      id: "swift-basics-1",
      title: "Hello Swift",
      description:
        "Create a simple Swift program that prints 'Hello, Swift!' to the console.",
      difficulty: "beginner",
      category: "basics",
      language: "swift",
      starterCode: "// Your code here\n\n",
      hints: [
        "Use print() to output to the console",
        "Swift doesn't require semicolons",
        "Strings are enclosed in double quotes",
      ],
      tests: [],
      solution: 'print("Hello, Swift!")',
    },
  ],
};

export default codeChallenges;
