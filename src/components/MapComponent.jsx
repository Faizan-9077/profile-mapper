import { useState, useEffect } from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import { geocodeAddress, getStaticMapUrl } from '../services/mapService';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import './MapComponent.css';

const containerStyle = {
  width: '100%',
  height: '400px'
};

export default function MapComponent({ address, coordinates, onClose }) {
  const [position, setPosition] = useState(coordinates);
  const [loading, setLoading] = useState(!coordinates);
  const [error, setError] = useState(null);
  const [staticMap, setStaticMap] = useState(false);

  useEffect(() => {
    const loadMapData = async () => {
      if (coordinates) {
        setPosition(coordinates);
        return;
      }

      if (!address) {
        setError('No address provided');
        return;
      }

      try {
        setLoading(true);
        const result = await geocodeAddress(address);
        setPosition({ lat: result.lat, lng: result.lng });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadMapData();
  }, [address, coordinates]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!position) return <ErrorMessage message="Location data not available" />;

  if (staticMap) {
    return (
      <div className="map-container">
        <img 
          src={getStaticMapUrl(position.lat, position.lng)} 
          alt="Static map" 
          className="static-map"
        />
        <button onClick={() => setStaticMap(false)} className="map-toggle-button">
          Switch to Interactive Map
        </button>
        {onClose && <button onClick={onClose} className="close-map-button">Close Map</button>}
      </div>
    );
  }

  return (
    <div className="map-container">
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        loadingElement={<LoadingSpinner />}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={position}
          zoom={14}
          options={{
            streetViewControl: false,
            mapTypeControl: true,
            fullscreenControl: false
          }}
        >
          <Marker position={position} />
        </GoogleMap>
      </LoadScript>
      <button onClick={() => setStaticMap(true)} className="map-toggle-button">
        Switch to Static Map
      </button>
      {onClose && <button onClick={onClose} className="close-map-button">Close Map</button>}
    </div>
  );
}