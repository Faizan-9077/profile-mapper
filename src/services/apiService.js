const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Request failed');
  }
  return response.json();
};

export const fetchProfiles = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/profiles`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to fetch profiles:', error);
    throw new Error('Network error while fetching profiles');
  }
};

export const createProfile = async (profileData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/profiles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData)
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to create profile:', error);
    throw new Error('Network error while creating profile');
  }
};

export const updateProfile = async (id, profileData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/profiles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData)
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`Failed to update profile ${id}:`, error);
    throw new Error('Network error while updating profile');
  }
};

export const deleteProfile = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/profiles/${id}`, {
      method: 'DELETE'
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`Failed to delete profile ${id}:`, error);
    throw new Error('Network error while deleting profile');
  }
};