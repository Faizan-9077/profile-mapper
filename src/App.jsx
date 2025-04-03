import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import { ProfileProvider } from './context/ProfileContext';
import Navbar from './components/NavBar';


function App() {
  return (
    <ProfileProvider>
      <Router>
        <Navbar />
        <div className="app-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </div>
      </Router>
    </ProfileProvider>
  );
}
if (typeof window !== "undefined") {
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = { isDisabled: true };
}


export default App;