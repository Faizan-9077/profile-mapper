import { useState, useContext, useRef } from 'react';
import { geocodeAddress } from '../services/mapService'; 
import { ProfileContext } from '../context/ProfileContext';
import { TextField, Button, Box, Paper, Typography } from '@mui/material';
import ProfileList from '../components/ProfileList';
import './AdminPage.css';




export default function AdminPage() {
  
  const { profiles, addProfile, updateProfile, deleteProfile } = useContext(ProfileContext);
  const formRef = useRef(null); 
  
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    photo: '',
    address: '',
    shortDescription: '',
    email: '',
    interests: [],
    lat: null,      
    lng: null  
  });
  const [editingId, setEditingId] = useState(null);

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

 
 

const handleSubmit = async (e) => {
  e.preventDefault();

  const formattedInterests = Array.isArray(formData.interests)
    ? formData.interests
    : (formData.interests || "").toString().split(',').map(i => i.trim());

  try {
    
    const geo = await geocodeAddress(formData.address);

    const profileData = {
      ...formData,
      interests: formattedInterests,
      lat: geo.lat,
      lng: geo.lng,
      address: geo.formattedAddress  // replace raw address with Google's version
    };

    if (editingId) {
      await updateProfile(editingId, profileData);
    } else {
      await addProfile({ ...profileData, id: Date.now() });
    }

    resetForm();  

  } catch (err) {
    console.error('Failed to submit profile:', err);
    alert("Could not geocode address. Please check the address or your API key.");
  }
};


  const handleEdit = (profile) => {
    const addressObj = profile.address || {};
  
    const addressString = [addressObj.street, addressObj.suite, addressObj.city, addressObj.zipcode]
      .filter(Boolean)
      .join(', ');
  
    setFormData({
      ...profile,
      address: addressString, 
      interests: profile.interests?.join(', ') || ''
    });
  
    setEditingId(profile.id);
  
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
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
      <Paper elevation={3} className="admin-form" ref={formRef}>
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



