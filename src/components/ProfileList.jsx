
import ProfileCard from './ProfileCard';


export default function ProfileList({ profiles, onProfileSelect, onEdit, onDelete, adminMode = false }) {
  return (
    <div className="profile-list">
      {profiles.map(profile => (
        <ProfileCard 
          key={profile.id}
          profile={profile}
          onClick={() => onProfileSelect(profile)}
          onEdit={onEdit}
          onDelete={onDelete}
          adminMode={adminMode}
        />
      ))}
    </div>
  );
}


