# 🌍 Profile Mapper

A React-based profile management web application with map integration. Users and admins can view profile details along with their geolocation rendered via static maps powered by Google Maps. Built for clarity, modularity, and a better user/admin experience.

## ✨ Features

- 🔍 Geocoding with Google Maps API
- 🗺️ Static map rendering for profile locations
- 👤 Separate User and Admin views
- 📍 Click-to-view map modal in Admin dashboard

## 🛠️ Tech Stack

- **Frontend**: React
- **Geocoding & Maps**: Google Maps API

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- A Google Maps API key

### Installation

```bash
git clone https://github.com/your-username/profile-mapper.git
cd profile-mapper
npm install
```

### Running the App

1. Create a `.env` file and add your Google Maps API key:
   ```
   REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```

2. Start the development server:

```bash
npm start
```

The app will be running at http://localhost:3000

## 🌐 Map Integration Details

- `geocodeAddress(address)`: Converts an address into latitude and longitude using Google Maps Geocoding API.
- `getStaticMapUrl(lat, lon)`: Generates a static Google Maps image URL using coordinates.
- Admin dashboard displays a modal with the map when "View" is clicked, ensuring clean UI and performance.


## 🙌 Contributing

Pull requests are welcome! For major changes, open an issue to discuss what you’d like to improve or add.
