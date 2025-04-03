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

  const addProfile = useCallback(async (newProfile) => {
    const tempId = `temp-${Date.now()}`; // Create temporary ID
    try {
      
      setProfiles(prev => [...prev, { ...newProfile, id: tempId, _pending: true }]);
      
      
      const createdProfile = await createProfile(newProfile);
      
     
      setProfiles(prev => [
        ...prev.filter(p => p.id !== tempId),
        createdProfile
      ]);
      return createdProfile;
    } catch (err) {
      
      setProfiles(prev => prev.filter(p => p.id !== tempId));
      throw err;
    }
  }, []);


  const updateProfileContext = useCallback(async (id, profileData) => {
    try {
      
      setProfiles(prev => prev.map(p => 
        p.id === id ? { ...profileData, _pending: true } : p
      ));
      
     
      const result = await updateProfile(id, profileData);
      
      
      setProfiles(prev => prev.map(p => 
        p.id === id ? result : p
      ));
      return result;
    } catch (err) {
      
      setProfiles(prev => prev.map(p => 
        p.id === id ? { ...p, _pending: false } : p
      ));
      throw err;
    }
  }, []);


  const deleteProfileContext = useCallback(async (id) => {
    try {
      
      setProfiles(prev => prev.filter(p => p.id !== id));
      
     
      await deleteProfile(id);
    } catch (err) {
      
      fetchProfilesData();
      throw err;
    }
  }, [fetchProfilesData]);

 
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