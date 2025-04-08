import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import { getStaticMapUrl } from '../services/mapService'; 

export default function ProfileCard({ profile, onClick, onEdit, onDelete, adminMode }) {
  return (
    <Card 
      className="profile-card" 
      onClick={onClick}
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
            {typeof profile.address === 'string'
              ? profile.address
              : [profile.address.street, profile.address.suite, profile.address.city, profile.address.zipcode]
                  .filter(Boolean)
                  .join(', ')
            }
          </Typography>
        )}

        {/* SHOW THE STATIC MAP HERE */}
        {profile.lat && profile.lng && (
          <img
            src={getStaticMapUrl(profile.lat, profile.lng)}
            alt="Map"
            style={{ width: '100%', marginTop: '10px', borderRadius: '8px' }}
          />
        )}
      </CardContent>

      {adminMode && (
        <CardActions onClick={e => e.stopPropagation()}>
          <Button 
            size="small" 
            onClick={(e) => {
              e.stopPropagation();
              onEdit(profile); 
            }}
          >
            Edit
          </Button>
          <Button 
            size="small" 
            color="error"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(profile.id); 
            }}
          >
            Delete
          </Button>
        </CardActions>      
      )}
    </Card>
  );
}
