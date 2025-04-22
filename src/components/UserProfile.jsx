// Code written and maintained by Elisee Kajingu
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { showSuccessAlert, showErrorAlert, showLoadingAlert, closeAlert, showConfirmAlert } from '../utils/alerts';

export default function UserProfile({ session, onSignOut }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [website, setWebsite] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [userStats, setUserStats] = useState({
    completedChallenges: 0,
    totalXP: 0,
    skillLevels: {}
  });

  useEffect(() => {
    if (session) {
      const getProfile = async () => {
        try {
          setLoading(true);
          
          const { user } = session;
          
          const { data, error } = await supabase
            .from('profiles')
            .select('username, website, avatar_url')
            .eq('id', user.id)
            .single();
          
          if (error) throw error;
          
          if (data) {
            setUsername(data.username || '');
            setWebsite(data.website || '');
            setAvatarUrl(data.avatar_url || '');
          }
        } catch (error) {
          showErrorAlert('Error loading profile', error.message);
        } finally {
          setLoading(false);
        }
      };

      const getUserStats = async () => {
        try {
          const { user } = session;
          
          // Get completed challenges
          const { data: challenges, error: challengesError } = await supabase
            .from('completed_challenges')
            .select('*')
            .eq('user_id', user.id);
          
          if (challengesError) throw challengesError;
          
          // Get skills
          const { data: skills, error: skillsError } = await supabase
            .from('skills')
            .select('*')
            .eq('user_id', user.id)
            .single();
          
          if (skillsError && skillsError.code !== 'PGRST116') throw skillsError;
          
          // Calculate total XP (50 XP per completed challenge)
          const totalXP = (challenges?.length || 0) * 50;
          
          // Format skill levels
          const skillLevels = {};
          if (skills) {
            Object.entries(skills).forEach(([key, value]) => {
              if (!['id', 'user_id', 'created_at', 'updated_at'].includes(key) && typeof value === 'number') {
                skillLevels[key] = value;
              }
            });
          }
          
          setUserStats({
            completedChallenges: challenges?.length || 0,
            totalXP,
            skillLevels
          });
          
        } catch (error) {
          console.error('Error loading user stats:', error);
        }
      };
      
      getProfile();
      getUserStats();
    }
  }, [session]);

  const updateProfile = async (e) => {
    e.preventDefault();
    
    try {
      showLoadingAlert('Updating profile...');
      setLoading(true);
      
      const { user } = session;
      
      const updates = {
        id: user.id,
        username,
        website,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      };
      
      const { error } = await supabase
        .from('profiles')
        .upsert(updates);
      
      if (error) throw error;
      
      closeAlert();
      showSuccessAlert('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      closeAlert();
      showErrorAlert('Error updating profile', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    const result = await showConfirmAlert(
      'Sign Out',
      'Are you sure you want to sign out?',
      'Yes, sign out',
      'Cancel'
    );
    
    if (result.isConfirmed) {
      showLoadingAlert('Signing out...');
      
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        
        closeAlert();
        showSuccessAlert('Signed out successfully');
        
        if (onSignOut) onSignOut();
      } catch (error) {
        closeAlert();
        showErrorAlert('Error signing out', error.message);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">User Profile</h2>
          <div>
            {isEditing ? (
              <div className="space-x-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={updateProfile}
                  disabled={loading}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden mb-4">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-indigo-100 text-indigo-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
              
              {isEditing && (
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Avatar URL
                  </label>
                  <input
                    type="text"
                    value={avatarUrl || ''}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="text"
                  value={session?.user?.email || ''}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={username || ''}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md ${!isEditing && 'bg-gray-50'}`}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <input
                  type="url"
                  value={website || ''}
                  onChange={(e) => setWebsite(e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md ${!isEditing && 'bg-gray-50'}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-6">Your Progress</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">Completed Challenges</h3>
            <p className="text-3xl font-bold">{userStats.completedChallenges}</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-700 mb-2">Total XP</h3>
            <p className="text-3xl font-bold">{userStats.totalXP}</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-700 mb-2">Languages</h3>
            <p className="text-3xl font-bold">{Object.keys(userStats.skillLevels).length}</p>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mb-4">Skill Levels</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(userStats.skillLevels).map(([skill, level]) => (
            <div key={skill} className="border rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium capitalize">{skill}</span>
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">Level {level}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${Math.min(level * 10, 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
        
        <div className="space-y-4">
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
