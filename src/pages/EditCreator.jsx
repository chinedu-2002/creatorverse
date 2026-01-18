import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../client';

const EditCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching creator:', error);
        setError('Failed to load creator.');
      } else {
        setFormData({
          name: data.name || '',
          url: data.url || '',
          description: data.description || '',
          imageURL: data.imageURL || ''
        });
      }
      setLoading(false);
    };

    fetchCreator();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    // Validate required fields
    if (!formData.name || !formData.url || !formData.description) {
      setError('Please fill in all required fields.');
      setSaving(false);
      return;
    }

    const { error: updateError } = await supabase
      .from('creators')
      .update({
        name: formData.name,
        url: formData.url,
        description: formData.description,
        imageURL: formData.imageURL || null
      })
      .eq('id', id);

    if (updateError) {
      console.error('Error updating creator:', updateError);
      setError('Failed to update creator. Please try again.');
      setSaving(false);
    } else {
      navigate(`/creator/${id}`);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${formData.name}? This action cannot be undone.`
    );

    if (confirmDelete) {
      const { error: deleteError } = await supabase
        .from('creators')
        .delete()
        .eq('id', id);

      if (deleteError) {
        console.error('Error deleting creator:', deleteError);
        setError('Failed to delete creator. Please try again.');
      } else {
        navigate('/');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading creator...</div>;
  }

  return (
    <div className="edit-creator">
      <Link to="/" className="back-link">← Back to all creators</Link>
      
      <h1>Edit Creator</h1>
      
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

        <div className="form-actions">
          <button type="submit" disabled={saving}>
            {saving ? 'Saving...' : '💾 Save Changes'}
          </button>
          <button type="button" className="delete-btn" onClick={handleDelete}>
            🗑️ Delete Creator
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCreator;
