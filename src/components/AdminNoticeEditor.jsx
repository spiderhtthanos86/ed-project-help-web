import { useState, useEffect } from 'react';
import { getNotice, updateNotice } from '../services/noticeService';
import { sanitizeInput } from '../utils/validators';
import LoadingSpinner from './LoadingSpinner';

const AdminNoticeEditor = () => {
  const [content, setContent] = useState('');
  const [fetchLoading, setFetchLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        setFetchLoading(true);
        const data = await getNotice();
        if (data) {
          setContent(data.content || '');
        }
      } catch (err) {
        setError('Failed to fetch notice.');
      } finally {
        setFetchLoading(false);
      }
    };
    fetchNotice();
  }, []);

  const handleSave = async () => {
    try {
      setError(null);
      setSuccess(null);
      setSaving(true);
      const sanitizedContent = sanitizeInput(content);
      await updateNotice(sanitizedContent);
      setSuccess('Notice updated successfully!');
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      setError('Failed to save notice.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-notice-editor">
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.5rem' }}>
        Edit Notice Section
      </h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
        This notice appears on the student page. Use it to introduce yourself and describe your service.
      </p>
      
      {fetchLoading ? <LoadingSpinner /> : (
        <>
          {error && <div className="alert alert-error">⚠️ {error}</div>}
          {success && <div className="alert alert-success">✅ {success}</div>}
          
          <div className="form-group">
            <label className="form-label">Notice Content</label>
            <textarea
              className="form-input form-textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your notice here..."
              rows={8}
            />
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button className="btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : '💾 Save Notice'}
            </button>
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
              {content.length} characters
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminNoticeEditor;
