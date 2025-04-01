// src/components/ProfileList.jsx
import ProfileCard from './ProfileCard';

function ProfileList({ profiles, onEdit, onDelete, adminMode }) {
  return (
    <div className="profile-list">
      {profiles.map(profile => (
        <ProfileCard 
          key={profile.id}
          profile={profile}
          onEdit={onEdit}
          onDelete={onDelete}
          adminMode={adminMode}
        />
      ))}
    </div>
  );
}

// Make sure this is exported as default
export default ProfileList;