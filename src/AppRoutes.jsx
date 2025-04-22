// Code written and maintained by Elisee Kajingu
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import EnhancedCodeQuest from "./EnhancedCodeQuest";
import Auth from "./components/Auth";
import UserProfile from "./components/UserProfile";
import Navigation from "./components/Navigation";
import Playground from "./pages/Playground";
import Challenges from "./pages/Challenges";
import Leaderboard from "./pages/Leaderboard";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import UserGuide from "./pages/UserGuide";
import CookiePolicy from "./pages/CookiePolicy";
import Disclaimer from "./pages/Disclaimer";

// Protected route component
const ProtectedRoute = ({ element, session }) => {
  return session ? element : <Navigate to="/login" replace />;
};

export default function AppRoutes({ session }) {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navigation session={session} />
        <div className="flex-grow">
          <Routes>
            {/* Auth routes */}
            <Route
              path="/login"
              element={session ? <Navigate to="/" replace /> : <Auth />}
            />

            {/* Main app routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={<EnhancedCodeQuest session={session} />}
                  session={session}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  element={<UserProfile session={session} />}
                  session={session}
                />
              }
            />
            <Route
              path="/playground"
              element={
                <ProtectedRoute
                  element={<Playground session={session} />}
                  session={session}
                />
              }
            />
            <Route
              path="/challenges"
              element={
                <ProtectedRoute
                  element={<Challenges session={session} />}
                  session={session}
                />
              }
            />
            <Route
              path="/leaderboard"
              element={
                <ProtectedRoute
                  element={<Leaderboard session={session} />}
                  session={session}
                />
              }
            />

            {/* Policy pages (public) */}
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/user-guide" element={<UserGuide />} />
            <Route path="/cookies" element={<CookiePolicy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        {/* Footer with policy links */}
        <footer className="bg-gray-800 text-white py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-sm">
                  © {new Date().getFullYear()} Code Quest. All rights reserved.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <a href="/terms" className="text-gray-300 hover:text-white">
                  Terms & Conditions
                </a>
                <a href="/privacy" className="text-gray-300 hover:text-white">
                  Privacy Policy
                </a>
                <a href="/cookies" className="text-gray-300 hover:text-white">
                  Cookie Policy
                </a>
                <a
                  href="/disclaimer"
                  className="text-gray-300 hover:text-white"
                >
                  Disclaimer
                </a>
                <a
                  href="/user-guide"
                  className="text-gray-300 hover:text-white"
                >
                  User Guide
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
