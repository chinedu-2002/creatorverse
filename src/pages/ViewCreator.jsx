import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const ViewCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching creator:', error);
      } else {
        setCreator(data);
      }
      setLoading(false);
    };

    fetchCreator();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading creator...</div>;
  }

  if (!creator) {
    return (
      <div className="not-found">
        <h2>Creator not found</h2>
        <Link to="/">← Back to all creators</Link>
      </div>
    );
  }

  return (
    <div className="view-creator">
      <Link to="/" className="back-link">← Back to all creators</Link>
      
      <article className="creator-detail">
        {creator.imageURL && (
          <div className="creator-image">
            <img src={creator.imageURL} alt={creator.name} />
          </div>
        )}
        
        <div className="creator-info">
          <h1>{creator.name}</h1>
          <p className="description">{creator.description}</p>
          
          <div className="creator-link">
            <a href={creator.url} target="_blank" rel="noopener noreferrer">
              🔗 Visit {creator.name}'s Channel
            </a>
          </div>
          
          <div className="creator-actions">
            <Link to={`/edit/${creator.id}`} className="edit-btn">
              ✏️ Edit Creator
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ViewCreator;
