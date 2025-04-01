import { useState, useContext } from 'react';
import { ProfileContext } from '../context/ProfileContext';
import { TextField, Button, Box, Paper, Typography } from '@mui/material';
import ProfileList from '../components/ProfileList';
import './AdminPage.css';

function AdminPage() {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const profileData = {
      ...formData,
      interests: formData.interests.split(',').map(i => i.trim())
    };

    if (editingId) {
      updateProfile({ ...profileData, id: editingId });
    } else {
      addProfile({ ...profileData, id: Date.now() });
    }
    resetForm();
  };

  const handleEdit = (profile) => {
    setFormData({
      ...profile,
      interests: profile.interests?.join(', ') || ''
    });
    setEditingId(profile.id);
  };

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

export default AdminPage;