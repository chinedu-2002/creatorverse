import { Link } from 'react-router-dom';
import './Card.css';

const Card = ({ creator }) => {
  const handleImageError = (e) => {
    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(creator.name)}&size=400&background=667eea&color=fff`;
  };

  return (
    <article className="creator-card">
      <div className="card-image">
        <img 
          src={creator.imageURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(creator.name)}&size=400&background=667eea&color=fff`} 
          alt={creator.name}
          onError={handleImageError}
        />
      </div>
      <div className="card-content">
        <h3>{creator.name}</h3>
        <p className="description">{creator.description}</p>
        <div className="card-links">
          <a href={creator.url} target="_blank" rel="noopener noreferrer" className="channel-link">
            🔗 Visit Channel
          </a>
        </div>
        <div className="card-actions">
          <Link to={`/creator/${creator.id}`} className="view-btn">
            👁️ View
          </Link>
          <Link to={`/edit/${creator.id}`} className="edit-btn">
            ✏️ Edit
          </Link>
        </div>
      </div>
    </article>
  );
};

export default Card;
