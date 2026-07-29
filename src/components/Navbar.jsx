import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleGalleryClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const galleryElement = document.getElementById('gallery');
      if (galleryElement) {
        galleryElement.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="navbar-logo-icon">ED</div>
          <span className="navbar-logo-text">ED Project Help</span>
        </Link>

        <button className="navbar-menu-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
          {isMenuOpen ? '✕' : '☰'}
        </button>

        <div className={`navbar-links ${isMenuOpen ? 'navbar-links-open' : ''}`}>
          <Link to="/" className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <a href="/#gallery" className="navbar-link" onClick={handleGalleryClick}>Gallery</a>
          
          {currentUser ? (
            <>
              <Link to="/admin" className="navbar-link">Dashboard</Link>
              <button onClick={handleLogout} className="navbar-link" style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Logout</button>
            </>
          ) : (
            <Link to="/admin/login" className="navbar-admin-btn">Admin Side</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
