import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminModelForm from './AdminModelForm';
import AdminModelList from './AdminModelList';
import AdminNoticeEditor from './AdminNoticeEditor';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('add');
  const [refreshKey, setRefreshKey] = useState(0);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="admin-header">
          <div>
            <h1 className="section-title">Admin <span className="gradient-text">Dashboard</span></h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Manage your soap models and notices</p>
          </div>
          <button className="btn-secondary" onClick={handleLogout}>Logout</button>
        </div>
        
        <div className="admin-tabs">
          <button className={`admin-tab ${activeTab === 'add' ? 'active' : ''}`} onClick={() => setActiveTab('add')}>
            ➕ Add Model
          </button>
          <button className={`admin-tab ${activeTab === 'manage' ? 'active' : ''}`} onClick={() => setActiveTab('manage')}>
            📋 Manage Models
          </button>
          <button className={`admin-tab ${activeTab === 'notice' ? 'active' : ''}`} onClick={() => setActiveTab('notice')}>
            📢 Edit Notice
          </button>
        </div>
        
        <div className="admin-panel">
          {activeTab === 'add' && <AdminModelForm onModelAdded={() => setRefreshKey(k => k + 1)} />}
          {activeTab === 'manage' && <AdminModelList refreshKey={refreshKey} onModelDeleted={() => setRefreshKey(k => k + 1)} />}
          {activeTab === 'notice' && <AdminNoticeEditor />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
