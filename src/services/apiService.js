const API_BASE_URL = process.env.REACT_APP_API_URL || "https://jsonplaceholder.typicode.com";

// Function to handle and process response
const handleResponse = async (response) => {
  const contentType = response.headers.get("content-type");

  if (!response.ok) {
    let errorMessage = "Request failed";

    // If the response is JSON, extract the error message
    if (contentType && contentType.includes("application/json")) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      errorMessage = errorData.message || errorMessage;
    } else {
      // Log the raw response for debugging
      const rawResponse = await response.text();
      console.error("Unexpected Response (Not JSON):", rawResponse);
      errorMessage = "Unexpected response from server.";
    }

    throw new Error(errorMessage);
  }

  return response.json();
};

// Fetch profiles (JSONPlaceholder doesn't have profiles, using 'users')
export const fetchProfiles = async () => {
  try {
    console.log("Fetching profiles from:", `${API_BASE_URL}/users`);
    const response = await fetch(`${API_BASE_URL}/users`);
    return await handleResponse(response);
  } catch (error) {
    console.error("Failed to fetch profiles:", error.message);
    throw new Error("Network error while fetching profiles");
  }
};

// Create new profile (This won't actually persist because JSONPlaceholder is read-only)
export const createProfile = async (profileData) => {
  try {
    console.log("Sending profile data:", profileData);
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profileData),
    });

    console.log("Response Status:", response.status);
    return await handleResponse(response);
  } catch (error) {
    console.error("Failed to create profile:", error.message);
    throw new Error("Network error while creating profile");
  }
};

// Update an existing profile (This won't actually persist)
export const updateProfile = async (id, profileData) => {
  try {
    console.log("Updating profile data:", profileData);
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profileData),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`Failed to update profile ${id}:`, error.message);
    throw new Error("Network error while updating profile");
  }
};

// Delete a profile (This won't actually delete since JSONPlaceholder is read-only)
export const deleteProfile = async (id) => {
  try {
    console.log("Deleting profile with ID:", id);
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "DELETE",
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`Failed to delete profile ${id}:`, error.message);
    throw new Error("Network error while deleting profile");
  }
};

// Log the API base URL to check
console.log("API Base URL:", API_BASE_URL);
console.log("process.env.REACT_APP_API_URL:", process.env.REACT_APP_API_URL);
