import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../client';

const AddCreator = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate required fields
    if (!formData.name || !formData.url || !formData.description) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    const { data, error: insertError } = await supabase
      .from('creators')
      .insert([
        {
          name: formData.name,
          url: formData.url,
          description: formData.description,
          imageURL: formData.imageURL || null
        }
      ])
      .select();

    if (insertError) {
      console.error('Error adding creator:', insertError);
      setError('Failed to add creator. Please try again.');
      setLoading(false);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="add-creator">
      <Link to="/" className="back-link">← Back to all creators</Link>
      
      <h1>Add a New Creator</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name <span className="required">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter creator's name"
          required
        />

        <label htmlFor="url">
          URL <span className="required">*</span>
        </label>
        <input
          type="url"
          id="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          placeholder="https://youtube.com/channel/..."
          required
        />

        <label htmlFor="description">
          Description <span className="required">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe what kind of content they create..."
          rows="4"
          required
        />

        <label htmlFor="imageURL">
          Image URL <span className="optional">(optional)</span>
        </label>
        <input
          type="url"
          id="imageURL"
          name="imageURL"
          value={formData.imageURL}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />

        {formData.imageURL && (
          <div className="image-preview">
            <p>Image Preview:</p>
            <img src={formData.imageURL} alt="Preview" />
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : '➕ Add Creator'}
        </button>
      </form>
    </div>
  );
};

export default AddCreator;
