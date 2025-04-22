// Code written and maintained by Elisee Kajingu
import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "../supabaseClient";

export default function Challenges() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [difficulty, setDifficulty] = useState("all");

  const fetchChallenges = useCallback(async () => {
    // Fetch challenges based on current filters
    try {
      setLoading(true);

      try {
        let query = supabase.from("challenges").select("*");

        // Apply filters
        if (filter !== "all") {
          query = query.eq("category", filter);
        }

        if (difficulty !== "all") {
          query = query.eq("difficulty", difficulty);
        }

        // Order by created_at
        query = query.order("created_at", { ascending: false });

        const { data, error } = await query;

        if (error) {
          // If the table doesn't exist or other error, use sample challenges
          console.warn("Using sample challenges due to error:", error.message);
          setChallenges(sampleChallenges);
        } else {
          // If no challenges in the database yet, use sample challenges
          if (!data || data.length === 0) {
            setChallenges(sampleChallenges);
          } else {
            setChallenges(data);
          }
        }
      } catch (innerError) {
        console.warn(
          "Using sample challenges due to error:",
          innerError.message,
        );
        setChallenges(sampleChallenges);
      }
    } catch (error) {
      console.error("Error in fetchChallenges:", error);
      // Don't show an alert, just use sample challenges
      setChallenges(sampleChallenges);
    } finally {
      setLoading(false);
    }
  }, [filter, difficulty]);

  // Fetch challenges on component mount and when filters change
  useEffect(() => {
    fetchChallenges();
  }, [fetchChallenges]);

  const difficultyColor = (level) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-blue-100 text-blue-800";
      case "Advanced":
        return "bg-purple-100 text-purple-800";
      case "Expert":
        return "bg-orange-100 text-orange-800";
      case "Master":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
        Coding Challenges
      </h1>

      <div className="mb-6 sm:mb-8 bg-white p-3 sm:p-4 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg sm:text-xl font-semibold mb-2">Filters</h2>
            <div className="flex flex-wrap gap-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full sm:w-auto px-2 sm:px-3 py-1 sm:py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Categories</option>
                <option value="algorithms">Algorithms</option>
                <option value="data-structures">Data Structures</option>
                <option value="web-development">Web Development</option>
                <option value="databases">Databases</option>
                <option value="machine-learning">Machine Learning</option>
              </select>

              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full sm:w-auto px-2 sm:px-3 py-1 sm:py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Difficulties</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
                <option value="Master">Master</option>
              </select>
            </div>
          </div>

          <div className="w-full md:w-auto">
            <button
              onClick={fetchChallenges}
              className="w-full md:w-auto px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
            >
              Refresh Challenges
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-3 sm:p-6">
                <div className="flex justify-between items-start mb-2 sm:mb-4">
                  <h3 className="text-lg sm:text-xl font-bold">
                    {challenge.title}
                  </h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${difficultyColor(challenge.difficulty)}`}
                  >
                    {challenge.difficulty}
                  </span>
                </div>

                <p className="text-gray-600 mb-2 sm:mb-4 line-clamp-3 text-sm sm:text-base">
                  {challenge.description}
                </p>

                <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                  {challenge.tags &&
                    challenge.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 text-gray-800 px-1 sm:px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-gray-500">
                    XP: {challenge.xp || 50}
                  </span>
                  <a
                    href={`/playground?challenge=${challenge.id}`}
                    className="px-3 sm:px-4 py-1 sm:py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-xs sm:text-sm"
                  >
                    Start Challenge
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Sample challenges to display when no challenges exist in the database
const sampleChallenges = [
  {
    id: "sample-1",
    title: "Reverse a String",
    description:
      "Write a function that reverses a string. The input string is given as an array of characters.",
    difficulty: "Beginner",
    category: "algorithms",
    tags: ["Strings", "Arrays"],
    xp: 50,
    created_at: new Date().toISOString(),
  },
  {
    id: "sample-2",
    title: "Two Sum",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    difficulty: "Beginner",
    category: "algorithms",
    tags: ["Arrays", "Hash Table"],
    xp: 75,
    created_at: new Date().toISOString(),
  },
  {
    id: "sample-3",
    title: "Linked List Cycle",
    description:
      "Given head, the head of a linked list, determine if the linked list has a cycle in it.",
    difficulty: "Intermediate",
    category: "data-structures",
    tags: ["Linked List", "Two Pointers"],
    xp: 100,
    created_at: new Date().toISOString(),
  },
  {
    id: "sample-4",
    title: "Binary Search",
    description:
      "Implement a binary search algorithm to find a target value in a sorted array.",
    difficulty: "Intermediate",
    category: "algorithms",
    tags: ["Binary Search", "Arrays"],
    xp: 100,
    created_at: new Date().toISOString(),
  },
  {
    id: "sample-5",
    title: "Implement a Queue using Stacks",
    description:
      "Implement a first in first out (FIFO) queue using only two stacks.",
    difficulty: "Advanced",
    category: "data-structures",
    tags: ["Stack", "Queue", "Design"],
    xp: 150,
    created_at: new Date().toISOString(),
  },
  {
    id: "sample-6",
    title: "Build a Responsive Navbar",
    description:
      "Create a responsive navigation bar that collapses into a hamburger menu on mobile devices.",
    difficulty: "Intermediate",
    category: "web-development",
    tags: ["HTML", "CSS", "JavaScript"],
    xp: 100,
    created_at: new Date().toISOString(),
  },
  {
    id: "sample-7",
    title: "SQL Query Optimization",
    description:
      "Optimize a complex SQL query to improve performance on a large database.",
    difficulty: "Advanced",
    category: "databases",
    tags: ["SQL", "Performance"],
    xp: 150,
    created_at: new Date().toISOString(),
  },
  {
    id: "sample-8",
    title: "Implement a Neural Network",
    description:
      "Build a simple neural network from scratch to classify handwritten digits.",
    difficulty: "Expert",
    category: "machine-learning",
    tags: ["Python", "Neural Networks", "Classification"],
    xp: 200,
    created_at: new Date().toISOString(),
  },
  {
    id: "sample-9",
    title: "Merge Sort Implementation",
    description:
      "Implement the merge sort algorithm to sort an array of integers.",
    difficulty: "Intermediate",
    category: "algorithms",
    tags: ["Sorting", "Divide and Conquer"],
    xp: 100,
    created_at: new Date().toISOString(),
  },
];
