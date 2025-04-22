// Code written and maintained by Elisee Kajingu
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient';
import { showConfirmAlert } from '../utils/alerts';

export default function Navigation({ session, onSignOut }) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const userMenuRef = useRef(null);

  useEffect(() => {
    // Close menu when clicking outside
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  useEffect(() => {
    if (session) {
      const getProfile = async () => {
        try {
          const { user } = session;
          
          const { data, error } = await supabase
            .from('profiles')
            .select('username, avatar_url')
            .eq('id', user.id)
            .single();
          
          if (error) throw error;
          
          if (data) {
            setUsername(data.username || user.email.split('@')[0]);
            setAvatarUrl(data.avatar_url || '');
          }
        } catch (error) {
          console.error('Error loading profile:', error);
        }
      };
      
      getProfile();
    }
  }, [session]);

  const handleSignOut = async () => {
    const result = await showConfirmAlert(
      'Sign Out',
      'Are you sure you want to sign out?',
      'Yes, sign out',
      'Cancel'
    );
    
    if (result.isConfirmed) {
      const { error } = await supabase.auth.signOut();
      if (error) console.error('Error signing out:', error);
      if (onSignOut) onSignOut();
    }
  };

  return (
    <nav className="bg-indigo-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">Code Quest</span>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <a href="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-white hover:text-indigo-200">
                Home
              </a>
              <a href="/playground" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-white hover:text-indigo-200">
                Playground
              </a>
              <a href="/challenges" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-white hover:text-indigo-200">
                Challenges
              </a>
              <a href="/leaderboard" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-white hover:text-indigo-200">
                Leaderboard
              </a>
            </div>
          </div>
          
          {session ? (
            <div className="flex items-center">
              <div className="ml-3 relative" ref={userMenuRef}>
                <div>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="sr-only">Open user menu</span>
                    {avatarUrl ? (
                      <img
                        className="h-8 w-8 rounded-full"
                        src={avatarUrl}
                        alt="User avatar"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-indigo-300 flex items-center justify-center">
                        <span className="text-indigo-800 font-medium">
                          {username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </button>
                </div>
                
                {isUserMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      <p className="font-medium">{username}</p>
                      <p className="text-gray-500 truncate">{session.user.email}</p>
                    </div>
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Your Profile
                    </a>
                    <a
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </a>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              <a
                href="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
              >
                Sign in
              </a>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="md:hidden border-t border-indigo-500">
        <div className="pt-2 pb-3 space-y-1">
          <a
            href="/"
            className="block pl-3 pr-4 py-2 text-base font-medium text-white hover:bg-indigo-700"
          >
            Home
          </a>
          <a
            href="/playground"
            className="block pl-3 pr-4 py-2 text-base font-medium text-white hover:bg-indigo-700"
          >
            Playground
          </a>
          <a
            href="/challenges"
            className="block pl-3 pr-4 py-2 text-base font-medium text-white hover:bg-indigo-700"
          >
            Challenges
          </a>
          <a
            href="/leaderboard"
            className="block pl-3 pr-4 py-2 text-base font-medium text-white hover:bg-indigo-700"
          >
            Leaderboard
          </a>
        </div>
      </div>
    </nav>
  );
}
