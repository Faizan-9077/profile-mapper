import { useState, useContext } from 'react';
import { ProfileContext } from '../context/ProfileContext';
import { TextField, Button, Box, Paper, Typography } from '@mui/material';
import ProfileList from '../components/ProfileList';
import './AdminPage.css';

export default function AdminPage() {
  // Get all context values at once inside the component
  const { profiles, addProfile, updateProfile, deleteProfile } = useContext(ProfileContext);
  
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    photo: '',
    address: '',
    shortDescription: '',
    email: '',
    interests: []
  });
  const [editingId, setEditingId] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission (Add/Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Ensure interests is a string before splitting
    const formattedInterests = Array.isArray(formData.interests) 
      ? formData.interests 
      : (formData.interests || "").toString().split(',').map(i => i.trim());
  
    const profileData = {
      ...formData,
      interests: formattedInterests  // Assign the correctly formatted interests array
    };
  
    try {
      if (editingId) {
        await updateProfile(editingId, profileData);  // Update profile
      } else {
        await addProfile({ ...profileData, id: Date.now() });  // Add new profile
      }
      resetForm();  // Reset form after submission
    } catch (err) {
      console.error('Failed to submit profile:', err);
    }
  };
  

  // Handle editing a profile
  const handleEdit = (profile) => {
    setFormData({
      ...profile,
      interests: profile.interests?.join(', ') || ''
    });
    setEditingId(profile.id);
  };

  // Reset the form
  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      photo: '',
      address: '',
      shortDescription: '',
      email: '',
      interests: []
    });
    setEditingId(null);
  };

  return (
    <div className="admin-page">
      <Paper elevation={3} className="admin-form">
        <Typography variant="h5" gutterBottom>
          {editingId ? 'Edit Profile' : 'Add New Profile'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Photo URL"
            name="photo"
            value={formData.photo}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Short Description"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleInputChange}
            multiline
            rows={2}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Interests (comma separated)"
            name="interests"
            value={formData.interests}
            onChange={handleInputChange}
          />
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              {editingId ? 'Update' : 'Add'} Profile
            </Button>
            {editingId && (
              <Button variant="outlined" onClick={resetForm}>
                Cancel
              </Button>
            )}
          </Box>
        </Box>
      </Paper>

      <ProfileList 
        profiles={profiles || []} 
        onEdit={handleEdit}
        onDelete={deleteProfile}
        adminMode
      />
    </div>
  );
}


