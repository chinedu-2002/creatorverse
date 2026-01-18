import { Link } from 'react-router-dom';
import Card from '../components/Card';

const ShowCreators = ({ creators, error }) => {
  return (
    <div className="show-creators">
      <header className="page-header">
        <h1>🌟 Creatorverse</h1>
        <p>Discover amazing content creators!</p>
        <Link to="/new" className="add-creator-btn">
          ➕ Add a Creator
        </Link>
      </header>

      {error && (
        <div className="error-message">
          <strong>⚠️ Database Connection Error:</strong> {error}
          <br />
          <small>Please configure your Supabase credentials in src/client.js</small>
        </div>
      )}

      {creators && creators.length > 0 ? (
        <div className="creators-grid">
          {creators.map((creator) => (
            <Card key={creator.id} creator={creator} />
          ))}
        </div>
      ) : (
        <div className="no-creators">
          <p>No content creators yet. Be the first to add one!</p>
          <Link to="/new">Add Your First Creator</Link>
        </div>
      )}
    </div>
  );
};

export default ShowCreators;
