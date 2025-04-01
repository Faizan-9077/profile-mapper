// src/components/ProfileCard.jsx
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';

function ProfileCard({ profile, onEdit, onDelete, adminMode }) {
  return (
    <Card className="profile-card">
      <CardContent>
        <Typography variant="h6">{profile.name}</Typography>
        <Typography variant="body2">{profile.shortDescription}</Typography>
      </CardContent>
      {adminMode && (
        <CardActions>
          <Button size="small" onClick={() => onEdit(profile)}>Edit</Button>
          <Button size="small" color="error" onClick={() => onDelete(profile.id)}>Delete</Button>
        </CardActions>
      )}
    </Card>
  );
}

// Make sure this is exported as default
export default ProfileCard;