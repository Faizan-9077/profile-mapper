import { createContext, useState, useEffect, useCallback } from 'react';
import { 
  fetchProfiles,  // Using the exact export name from apiService.js
  createProfile,
  updateProfile,
  deleteProfile 
} from '../services/apiService';

export const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Memoized fetch function
  const fetchProfilesData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await fetchProfiles();  // Using the correct function name
      setProfiles(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message || 'Failed to load profiles');
      console.error('Profile fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Enhanced addProfile with optimistic updates
  const addProfile = useCallback(async (newProfile) => {
    const tempId = `temp-${Date.now()}`; // Create temporary ID
    try {
      // Optimistic update with temporary ID
      setProfiles(prev => [...prev, { ...newProfile, id: tempId, _pending: true }]);
      
      // Actual API call (server will generate real ID)
      const createdProfile = await createProfile(newProfile);
      
      // Replace with server response
      setProfiles(prev => [
        ...prev.filter(p => p.id !== tempId),
        createdProfile
      ]);
      return createdProfile;
    } catch (err) {
      // Rollback on error
      setProfiles(prev => prev.filter(p => p.id !== tempId));
      throw err;
    }
  }, []);

  // Enhanced updateProfile
  const updateProfileContext = useCallback(async (id, profileData) => {
    try {
      // Optimistic update
      setProfiles(prev => prev.map(p => 
        p.id === id ? { ...profileData, _pending: true } : p
      ));
      
      // API call
      const result = await updateProfile(id, profileData);
      
      // Update with server response
      setProfiles(prev => prev.map(p => 
        p.id === id ? result : p
      ));
      return result;
    } catch (err) {
      // Revert on error
      setProfiles(prev => prev.map(p => 
        p.id === id ? { ...p, _pending: false } : p
      ));
      throw err;
    }
  }, []);

  // Enhanced deleteProfile
  const deleteProfileContext = useCallback(async (id) => {
    try {
      // Optimistic update
      setProfiles(prev => prev.filter(p => p.id !== id));
      
      // API call
      await deleteProfile(id);
    } catch (err) {
      // Re-fetch on error
      fetchProfilesData();
      throw err;
    }
  }, [fetchProfilesData]);

  // Automatic refresh every 5 minutes (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      fetchProfilesData();
    }, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [fetchProfilesData]);

  // Initial load
  useEffect(() => {
    fetchProfilesData();
  }, [fetchProfilesData]);

  return (
    <ProfileContext.Provider value={{ 
      profiles,
      loading,
      error,
      lastUpdated,
      addProfile,
      updateProfile: updateProfileContext,
      deleteProfile: deleteProfileContext,
      refetch: fetchProfilesData,
      getProfileById: (id) => profiles.find(p => p.id === id),
      isEmpty: !loading && profiles.length === 0
    }}>
      {children}
    </ProfileContext.Provider>
  );
}