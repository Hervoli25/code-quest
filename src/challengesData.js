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
  ],
};

export default codeChallenges;
