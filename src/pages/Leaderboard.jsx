// Code written and maintained by Elisee Kajingu
import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { showErrorAlert } from "../utils/alerts";

export default function Leaderboard({ session }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("all-time");
  const [category, setCategory] = useState("xp");

  useEffect(() => {
    fetchLeaderboard();
  }, [timeframe, category]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);

      try {
        // In a real app, you would have a more complex query based on timeframe and category
        // For now, we'll use a simple query and filter in the frontend
        const { data: profiles, error: profilesError } = await supabase
          .from("profiles")
          .select(
            "id, username, experience, level, skill_points, total_play_time, sessions_completed",
          )
          .order(getSortColumn(), { ascending: false });

        if (profilesError) {
          console.warn(
            "Using sample users due to error:",
            profilesError.message,
          );
          setUsers(sampleUsers);
        } else {
          // If no real data, use sample data
          if (!profiles || profiles.length === 0) {
            setUsers(sampleUsers);
          } else {
            // Add avatar_url property if it doesn't exist
            const processedProfiles = profiles.map((profile) => ({
              ...profile,
              avatar_url: profile.avatar_url || null,
            }));
            setUsers(processedProfiles);
          }
        }
      } catch (innerError) {
        console.warn("Using sample users due to error:", innerError.message);
        setUsers(sampleUsers);
      }
    } catch (error) {
      console.error("Error in fetchLeaderboard:", error);
      // Don't show an alert, just use sample data
      setUsers(sampleUsers);
    } finally {
      setLoading(false);
    }
  };

  const getSortColumn = () => {
    switch (category) {
      case "xp":
        return "experience";
      case "level":
        return "level";
      case "challenges":
        return "sessions_completed";
      case "time":
        return "total_play_time";
      default:
        return "experience";
    }
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>

      <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-semibold mb-2">Filters</h2>
            <div className="flex flex-wrap gap-2">
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all-time">All Time</option>
                <option value="this-month">This Month</option>
                <option value="this-week">This Week</option>
                <option value="today">Today</option>
              </select>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="xp">Experience Points</option>
                <option value="level">Level</option>
                <option value="challenges">Completed Challenges</option>
                <option value="time">Time Spent</option>
              </select>
            </div>
          </div>

          <div>
            <button
              onClick={fetchLeaderboard}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Refresh Leaderboard
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Rank
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  User
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Level
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  XP
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Challenges
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Time Spent
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr key={user.id} className={index < 3 ? "bg-yellow-50" : ""}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {index === 0 && (
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-400 text-white rounded-full mr-2">
                          1
                        </span>
                      )}
                      {index === 1 && (
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-300 text-white rounded-full mr-2">
                          2
                        </span>
                      )}
                      {index === 2 && (
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 text-white rounded-full mr-2">
                          3
                        </span>
                      )}
                      {index > 2 && (
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-100 text-gray-700 rounded-full mr-2">
                          {index + 1}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {user.avatar_url ? (
                          <img
                            className="h-10 w-10 rounded-full"
                            src={user.avatar_url}
                            alt=""
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-indigo-700 font-medium">
                              {user.username
                                ? user.username.charAt(0).toUpperCase()
                                : "U"}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.username || "Anonymous User"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.level}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {user.experience.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {user.sessions_completed}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatTime(user.total_play_time)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Sample users for the leaderboard when no real data exists
const sampleUsers = [
  {
    id: "sample-1",
    username: "CodeMaster",
    avatar_url: null,
    experience: 15750,
    level: 12,
    skill_points: 45,
    total_play_time: 1260, // in minutes
    sessions_completed: 87,
  },
  {
    id: "sample-2",
    username: "AlgorithmWizard",
    avatar_url: null,
    experience: 12340,
    level: 10,
    skill_points: 38,
    total_play_time: 980,
    sessions_completed: 72,
  },
  {
    id: "sample-3",
    username: "ByteNinja",
    avatar_url: null,
    experience: 10890,
    level: 9,
    skill_points: 32,
    total_play_time: 840,
    sessions_completed: 65,
  },
  {
    id: "sample-4",
    username: "DevGuru",
    avatar_url: null,
    experience: 9250,
    level: 8,
    skill_points: 28,
    total_play_time: 720,
    sessions_completed: 58,
  },
  {
    id: "sample-5",
    username: "CodeCraftsman",
    avatar_url: null,
    experience: 7680,
    level: 7,
    skill_points: 24,
    total_play_time: 620,
    sessions_completed: 52,
  },
  {
    id: "sample-6",
    username: "SyntaxSage",
    avatar_url: null,
    experience: 6420,
    level: 6,
    skill_points: 20,
    total_play_time: 540,
    sessions_completed: 45,
  },
  {
    id: "sample-7",
    username: "LogicLegend",
    avatar_url: null,
    experience: 5340,
    level: 5,
    skill_points: 17,
    total_play_time: 460,
    sessions_completed: 38,
  },
  {
    id: "sample-8",
    username: "BugHunter",
    avatar_url: null,
    experience: 4250,
    level: 4,
    skill_points: 14,
    total_play_time: 380,
    sessions_completed: 32,
  },
  {
    id: "sample-9",
    username: "DataDruid",
    avatar_url: null,
    experience: 3180,
    level: 3,
    skill_points: 11,
    total_play_time: 320,
    sessions_completed: 26,
  },
  {
    id: "sample-10",
    username: "FunctionFanatic",
    avatar_url: null,
    experience: 2150,
    level: 2,
    skill_points: 8,
    total_play_time: 260,
    sessions_completed: 20,
  },
];
