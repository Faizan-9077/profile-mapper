export const geocodeAddress = async (address) => {
  if (!process.env.REACT_APP_GOOGLE_MAPS_API_KEY) {
    throw new Error('Google Maps API key is missing');
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${
        encodeURIComponent(address)
      }&key=${
        process.env.REACT_APP_GOOGLE_MAPS_API_KEY
      }`
    );
    
    const data = await response.json();
    
    if (data.status !== 'OK') {
      throw new Error(data.error_message || 'Geocoding failed');
    }
    
    return {
      lat: data.results[0].geometry.location.lat,
      lng: data.results[0].geometry.location.lng,
      formattedAddress: data.results[0].formatted_address
    };
  } catch (error) {
    console.error('Geocoding error:', error);
    throw new Error('Failed to geocode address');
  }
};

export const getStaticMapUrl = (lat, lng, zoom = 14, size = '600x400') => {
  if (!process.env.REACT_APP_GOOGLE_MAPS_API_KEY) {
    throw new Error('Google Maps API key is missing');
  }

  return `https://maps.googleapis.com/maps/api/staticmap?center=${
    lat
  },${
    lng
  }&zoom=${
    zoom
  }&size=${
    size
  }&markers=color:red%7C${
    lat
  },${
    lng
  }&key=${
    process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  }`;
};