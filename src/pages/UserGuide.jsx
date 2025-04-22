// Code written and maintained by Elisee Kajingu
import React from 'react';

export default function UserGuide() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6">Code Quest User Guide</h1>
        
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">1. Introduction</h2>
          <p>
            Welcome to Code Quest, an interactive coding platform designed to help you learn programming through 
            engaging challenges and personalized learning paths. This guide will help you navigate the platform 
            and make the most of its features.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">2. Getting Started</h2>
          
          <h3 className="text-lg font-medium mt-4 mb-2">2.1 Creating an Account</h3>
          <p>
            To get started with Code Quest, you'll need to create an account:
          </p>
          <ol className="list-decimal pl-6 mb-4">
            <li>Visit the Code Quest homepage and click "Sign Up"</li>
            <li>Enter your email address and create a password</li>
            <li>Choose a username that will be displayed to other users</li>
            <li>Agree to the Terms and Conditions and Privacy Policy</li>
            <li>Click "Create Account"</li>
            <li>Verify your email address by clicking the link sent to your inbox</li>
          </ol>
          <p>
            Alternatively, you can sign up using your Google or GitHub account for a faster registration process.
          </p>
          
          <h3 className="text-lg font-medium mt-4 mb-2">2.2 Setting Up Your Profile</h3>
          <p>
            After creating your account, we recommend setting up your profile:
          </p>
          <ol className="list-decimal pl-6 mb-4">
            <li>Click on your username in the top-right corner and select "Profile"</li>
            <li>Add a profile picture to make your account more recognizable</li>
            <li>Update your bio to share information about yourself with the community</li>
            <li>Set your preferred programming languages and skill level</li>
            <li>Save your changes</li>
          </ol>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">3. Navigating the Platform</h2>
          
          <h3 className="text-lg font-medium mt-4 mb-2">3.1 Home Dashboard</h3>
          <p>
            The Home Dashboard is your central hub for tracking progress and accessing key features:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Progress Overview:</strong> View your overall progress, including completed challenges and skill levels</li>
            <li><strong>Recommended Challenges:</strong> Personalized challenge recommendations based on your skill level and learning history</li>
            <li><strong>Recent Activity:</strong> See your recent activity and achievements</li>
            <li><strong>Learning Path:</strong> Access your current learning path and track your progress</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-4 mb-2">3.2 Code Playground</h3>
          <p>
            The Code Playground is where you'll solve coding challenges:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Challenge Selection:</strong> Browse challenges by language, difficulty, or category</li>
            <li><strong>Code Editor:</strong> Write and edit your code in the integrated editor</li>
            <li><strong>Run Button:</strong> Execute your code to see the output</li>
            <li><strong>Test Cases:</strong> Run your solution against test cases to verify correctness</li>
            <li><strong>Hints:</strong> Access hints if you're stuck on a challenge</li>
            <li><strong>Solution:</strong> View the solution after completing a challenge or if you're really stuck</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-4 mb-2">3.3 Learning Paths</h3>
          <p>
            Learning Paths provide structured courses to help you master specific programming languages or concepts:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Path Selection:</strong> Choose from various learning paths based on your interests</li>
            <li><strong>Modules:</strong> Each path consists of modules that build upon each other</li>
            <li><strong>Challenges:</strong> Complete challenges within each module to progress</li>
            <li><strong>Assessments:</strong> Take assessments to test your knowledge and skills</li>
            <li><strong>Certificates:</strong> Earn certificates upon completing learning paths</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">4. Solving Challenges</h2>
          
          <h3 className="text-lg font-medium mt-4 mb-2">4.1 Understanding Challenge Types</h3>
          <p>
            Code Quest offers various types of challenges:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Coding Exercises:</strong> Write code to solve a specific problem</li>
            <li><strong>Bug Fixing:</strong> Find and fix bugs in existing code</li>
            <li><strong>Code Completion:</strong> Complete partially written code</li>
            <li><strong>Algorithm Challenges:</strong> Implement algorithms to solve complex problems</li>
            <li><strong>Project Challenges:</strong> Build small projects from scratch</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-4 mb-2">4.2 Using the Code Editor</h3>
          <p>
            The Code Editor includes several helpful features:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Syntax Highlighting:</strong> Code is colored based on syntax for better readability</li>
            <li><strong>Auto-Indentation:</strong> Code is automatically indented for proper formatting</li>
            <li><strong>Error Highlighting:</strong> Syntax errors are highlighted in real-time</li>
            <li><strong>Code Completion:</strong> Suggestions appear as you type to help complete code</li>
            <li><strong>Keyboard Shortcuts:</strong> Use shortcuts for common actions (Ctrl+S to save, Ctrl+Enter to run)</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-4 mb-2">4.3 Submitting Solutions</h3>
          <p>
            To submit your solution:
          </p>
          <ol className="list-decimal pl-6 mb-4">
            <li>Write your code in the editor</li>
            <li>Click "Run" to test your code against the provided test cases</li>
            <li>Review the output and make any necessary adjustments</li>
            <li>Once all tests pass, click "Submit" to finalize your solution</li>
            <li>After submission, you can view the solution and explanations</li>
          </ol>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">5. Tracking Your Progress</h2>
          
          <h3 className="text-lg font-medium mt-4 mb-2">5.1 Skill Levels</h3>
          <p>
            Your progress in different programming languages and concepts is tracked through skill levels:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Beginner (Level 1-3):</strong> Basic understanding of syntax and simple concepts</li>
            <li><strong>Intermediate (Level 4-6):</strong> Ability to solve moderate problems and use common patterns</li>
            <li><strong>Advanced (Level 7-9):</strong> Proficiency in complex problem-solving and advanced concepts</li>
            <li><strong>Expert (Level 10-12):</strong> Mastery of the language and ability to optimize solutions</li>
            <li><strong>Master (Level 13+):</strong> Expert-level knowledge with deep understanding of internals</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-4 mb-2">5.2 Achievements</h3>
          <p>
            Earn achievements by completing specific milestones:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Challenge Achievements:</strong> Complete a certain number of challenges</li>
            <li><strong>Language Achievements:</strong> Reach specific skill levels in programming languages</li>
            <li><strong>Streak Achievements:</strong> Maintain a daily learning streak</li>
            <li><strong>Speed Achievements:</strong> Solve challenges within a time limit</li>
            <li><strong>Community Achievements:</strong> Contribute to the community through comments and help</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">6. Adaptive Learning System</h2>
          
          <h3 className="text-lg font-medium mt-4 mb-2">6.1 Personalized Learning</h3>
          <p>
            Code Quest uses an adaptive learning system to personalize your experience:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Difficulty Adjustment:</strong> Challenge difficulty adapts based on your performance</li>
            <li><strong>Personalized Recommendations:</strong> Receive challenge recommendations tailored to your skill level</li>
            <li><strong>Spaced Repetition:</strong> Review concepts at optimal intervals for better retention</li>
            <li><strong>Weak Area Focus:</strong> Get more practice in areas where you struggle</li>
            <li><strong>Learning Style Adaptation:</strong> Content delivery adapts to your learning style</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-4 mb-2">6.2 AI-Powered Feedback</h3>
          <p>
            Receive AI-powered feedback on your code:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Code Quality Analysis:</strong> Get feedback on code style, efficiency, and best practices</li>
            <li><strong>Error Explanation:</strong> Receive clear explanations of errors in your code</li>
            <li><strong>Improvement Suggestions:</strong> Get suggestions for improving your solution</li>
            <li><strong>Concept Reinforcement:</strong> Review related concepts based on your solution</li>
            <li><strong>Performance Metrics:</strong> See how your solution compares to others in terms of efficiency</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">7. Community Features</h2>
          
          <h3 className="text-lg font-medium mt-4 mb-2">7.1 Discussion Forums</h3>
          <p>
            Engage with the community through discussion forums:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Challenge Discussions:</strong> Discuss specific challenges and share approaches</li>
            <li><strong>Language Forums:</strong> Discuss programming languages and related topics</li>
            <li><strong>Help Center:</strong> Ask questions and get help from the community</li>
            <li><strong>Feature Requests:</strong> Suggest new features for the platform</li>
            <li><strong>General Discussion:</strong> Engage in general programming discussions</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-4 mb-2">7.2 Leaderboards</h3>
          <p>
            Compare your progress with others on leaderboards:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Global Leaderboard:</strong> See the top performers across the platform</li>
            <li><strong>Language Leaderboards:</strong> View top performers in specific programming languages</li>
            <li><strong>Challenge Leaderboards:</strong> See the best solutions for specific challenges</li>
            <li><strong>Weekly Leaderboards:</strong> Compete in weekly challenges</li>
            <li><strong>Friend Leaderboards:</strong> Compare progress with friends</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">8. Account Management</h2>
          
          <h3 className="text-lg font-medium mt-4 mb-2">8.1 Profile Settings</h3>
          <p>
            Manage your profile settings:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Personal Information:</strong> Update your name, username, and bio</li>
            <li><strong>Profile Picture:</strong> Change your profile picture</li>
            <li><strong>Social Links:</strong> Add links to your GitHub, LinkedIn, or personal website</li>
            <li><strong>Privacy Settings:</strong> Control what information is visible to others</li>
            <li><strong>Notification Settings:</strong> Manage email and in-app notifications</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-4 mb-2">8.2 Account Security</h3>
          <p>
            Keep your account secure:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Password Management:</strong> Change your password regularly</li>
            <li><strong>Two-Factor Authentication:</strong> Enable 2FA for additional security</li>
            <li><strong>Connected Accounts:</strong> Manage connections to third-party services</li>
            <li><strong>Session Management:</strong> View and manage active sessions</li>
            <li><strong>Account Recovery:</strong> Set up recovery options for your account</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">9. Support and Feedback</h2>
          
          <h3 className="text-lg font-medium mt-4 mb-2">9.1 Getting Help</h3>
          <p>
            If you need assistance, there are several ways to get help:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Help Center:</strong> Access documentation and frequently asked questions</li>
            <li><strong>Community Forums:</strong> Ask questions and get help from the community</li>
            <li><strong>Support Tickets:</strong> Submit a support ticket for technical issues</li>
            <li><strong>Email Support:</strong> Contact support@codequest.com for assistance</li>
            <li><strong>Live Chat:</strong> Chat with support representatives during business hours</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-4 mb-2">9.2 Providing Feedback</h3>
          <p>
            We value your feedback to improve the platform:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Feature Requests:</strong> Suggest new features or improvements</li>
            <li><strong>Bug Reports:</strong> Report bugs or issues you encounter</li>
            <li><strong>Challenge Feedback:</strong> Provide feedback on specific challenges</li>
            <li><strong>User Experience:</strong> Share your thoughts on the platform's usability</li>
            <li><strong>Content Suggestions:</strong> Suggest new topics or learning paths</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">10. Conclusion</h2>
          <p>
            Code Quest is designed to make learning to code engaging, effective, and personalized. By following this guide, 
            you'll be able to navigate the platform and make the most of its features to accelerate your programming journey.
          </p>
          <p>
            Remember that consistent practice is key to improving your coding skills. We recommend setting aside regular time 
            for coding practice and taking advantage of the adaptive learning system to focus on areas where you need improvement.
          </p>
          <p>
            Happy coding, and welcome to the Code Quest community!
          </p>
        </div>
      </div>
    </div>
  );
}
