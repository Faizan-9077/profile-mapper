import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';

export default function ProfileCard({ profile, onProfileSelect, onEdit, onDelete, adminMode }) {
  return (
    <Card 
      className="profile-card" 
      onClick={onProfileSelect}
      sx={{ 
        cursor: 'pointer',
        marginBottom: 2,
        '&:hover': { boxShadow: 3 }
      }}
    >
      <CardContent>
        <Typography variant="h6">{profile.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {profile.shortDescription}
        </Typography>
        {profile.address && (
          <Typography variant="body2" mt={1}>
            {profile.address}
          </Typography>
        )}
      </CardContent>
      
      {adminMode && (
        <CardActions onClick={e => e.stopPropagation()}>
          <Button 
            size="small" 
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            Edit
          </Button>
          <Button 
            size="small" 
            color="error"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            Delete
          </Button>
        </CardActions>
      )}
    </Card>
  );
}

