export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="navbar-logo-icon" style={{ width: '32px', height: '32px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>ED</div>
            <div>
              <span className="footer-text" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>ED Project Help</span>
              <p style={{ color: 'var(--accent-green)', fontSize: '0.75rem', marginTop: '4px', fontWeight: 500 }}>
                ✅ Free Guidance for Your ED Assignment
              </p>
            </div>
          </div>
          <div className="footer-links">
            <a href="#gallery" className="footer-link">Gallery</a>
            <a href="#notice" className="footer-link">About</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} ED Project Help • UIET CSJMU • Made with ❤️ by Himanshu</p>
        </div>
      </div>
    </footer>
  );
}
