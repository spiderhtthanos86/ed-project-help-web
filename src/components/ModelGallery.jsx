import { useState, useEffect } from 'react';
import { getAllModels } from '../services/modelService';
import ModelCard from './ModelCard';
import LoadingSpinner from './LoadingSpinner';

export default function ModelGallery() {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchModels() {
      try {
        const data = await getAllModels();
        setModels(data);
      } catch (err) {
        console.error("Failed to fetch models:", err);
        setError("Could not load models.");
      } finally {
        setLoading(false);
      }
    }
    fetchModels();
  }, []);

  return (
    <section className="gallery" id="gallery">
      <div className="container">
        <div className="gallery-header">
          <h2 className="section-title">Reference <span className="gradient-text">Model Samples</span></h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            See how the finished soap models look for each figure from your textbook.
            Use these as a reference while making your own. Need help? Click the button on any model!
          </p>
        </div>
        
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="empty-state">
            <p className="empty-state-text">{error}</p>
          </div>
        ) : models.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🧼</div>
            <p className="empty-state-text">No models uploaded yet. Check back soon!</p>
          </div>
        ) : (
          <div className="gallery-grid">
            {models.map((model, index) => (
              <ModelCard key={model.id} model={model} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
