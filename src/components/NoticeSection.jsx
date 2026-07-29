import { useState, useEffect } from 'react';
import { getNotice } from '../services/noticeService';
import LoadingSpinner from './LoadingSpinner';
import { formatDate } from '../utils/helpers';

export default function NoticeSection() {
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNotice() {
      try {
        const data = await getNotice();
        setNotice(data);
      } catch (err) {
        console.error("Failed to fetch notice:", err);
        setError("Could not load notice content.");
      } finally {
        setLoading(false);
      }
    }
    fetchNotice();
  }, []);

  return (
    <section className="notice-section" id="notice">
      <div className="container">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="notice-card fade-in-up">
            <div className="notice-icon">📢</div>
            <p>{error}</p>
          </div>
        ) : notice ? (
          <div className="notice-card fade-in-up">
            <div className="notice-icon">📢</div>
            <h2 className="notice-title">About Me & How I Can Help</h2>
            <div className="notice-content" style={{ whiteSpace: 'pre-wrap' }}>
              {notice.content}
            </div>
            {notice.updatedAt && (
              <div className="notice-updated" style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                Last updated: {formatDate(notice.updatedAt)}
              </div>
            )}
          </div>
        ) : (
          <div className="notice-card fade-in-up">
            <div className="notice-icon">📢</div>
            <h2 className="notice-title">About Me & How I Can Help</h2>
            <p>No information available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}
