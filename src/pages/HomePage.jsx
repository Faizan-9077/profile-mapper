import { useState, useContext } from 'react';
import { ProfileContext } from '../context/ProfileContext';
import { geocodeAddress } from '../services/mapService';
import MapComponent from '../components/MapComponent';
import ProfileList from '../components/ProfileList';
import SearchFilter from '../components/SearchFilter';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import './HomePage.css';

export default function HomePage() {
  const { profiles, loading, error, refetch } = useContext(ProfileContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [mapLoading, setMapLoading] = useState(false);
  const [mapError, setMapError] = useState(null);

  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (profile.address && profile.address.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleProfileSelect = async (profile) => {
    setSelectedProfile(profile);
    if (!profile.coordinates && profile.address) {
      try {
        setMapLoading(true);
        setMapError(null);
        const location = await geocodeAddress(profile.address);
        setSelectedProfile(prev => ({
          ...prev,
          coordinates: { lat: location.lat, lng: location.lng }
        }));
      } catch (err) {
        setMapError('Failed to load map location');
        console.error('Geocoding error:', err);
      } finally {
        setMapLoading(false);
      }
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  return (
    <div className="home-page">
      <div className="search-container">
        <SearchFilter onSearch={setSearchTerm} />
      </div>
      
      <ProfileList 
        profiles={filteredProfiles} 
        onProfileSelect={handleProfileSelect}
      />
      
      {selectedProfile && (
        <div className="profile-details-modal">
          <button 
            className="close-modal-button"
            onClick={() => setSelectedProfile(null)}
          >
            ×
          </button>
          {mapError && <ErrorMessage message={mapError} />}
          {mapLoading ? (
            <LoadingSpinner />
          ) : (
            <MapComponent 
              address={selectedProfile.address} 
              coordinates={selectedProfile.coordinates}
            />
          )}
        </div>
      )}
    </div>
  );
}