import { useState, useEffect } from 'react';
import { getAllModels, deleteModel } from '../services/modelService';
import { getYoutubeThumbnailUrl } from '../utils/helpers';
import LoadingSpinner from './LoadingSpinner';

const AdminModelList = ({ refreshKey, onModelDeleted }) => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        setLoading(true);
        const data = await getAllModels();
        setModels(data);
      } catch (err) {
        setError('Failed to load models.');
      } finally {
        setLoading(false);
      }
    };
    fetchModels();
  }, [refreshKey]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this model?')) {
      try {
        setDeletingId(id);
        await deleteModel(id);
        if (onModelDeleted) {
          onModelDeleted();
        }
      } catch (err) {
        setError('Failed to delete model.');
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <div className="admin-model-list">
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.5rem' }}>
        Manage Models ({models.length})
      </h2>
      
      {error && <div className="alert alert-error">⚠️ {error}</div>}

      {loading ? <LoadingSpinner /> : (
        models.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <p className="empty-state-text">No models yet. Add your first model!</p>
          </div>
        ) : (
          models.map(model => (
            <div key={model.id} className="admin-model-item">
              <div className="admin-model-thumb">
                <img src={model.imageUrl} alt={model.figureLabel} />
              </div>
              <div className="admin-model-info">
                <h4>{model.figureLabel} {model.title ? `— ${model.title}` : ''}</h4>
                <p>YouTube: {model.youtubeUrl ? '✅ Linked' : '❌ Missing'}</p>
              </div>
              <button 
                className="btn-danger"
                onClick={() => handleDelete(model.id)}
                disabled={deletingId === model.id}
              >
                {deletingId === model.id ? 'Deleting...' : '🗑️ Delete'}
              </button>
            </div>
          ))
        )
      )}
    </div>
  );
};

export default AdminModelList;
