import { useState } from 'react';
import './PropertyForm.css';

interface PropertyFormProps {
  onPropertyAdded: () => void;
}

const PropertyForm = ({ onPropertyAdded }: PropertyFormProps) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [listingType, setListingType] = useState('Rent');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !address.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      // TODO remove hard-coding of backend URL
      const response = await fetch('https://zvbrzxcgfb.us-east-1.awsapprunner.com/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, address, description, listingType }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      // Reset form
      setName('');
      setAddress('');
      setDescription('');
      setListingType('Rent');
      setSuccess(true);

      // Notify parent component
      onPropertyAdded();
    } catch (err) {
      setError(`Failed to add property: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="property-form-container">
      <h2>Add New Property</h2>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Property added successfully!</div>}

      <form onSubmit={handleSubmit} className="property-form">
        <div className="form-group">
          <label htmlFor="name">Property Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter property name"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter property address"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="listingType">Listing Type</label>
          <select
            id="listingType"
            value={listingType}
            onChange={(e) => setListingType(e.target.value)}
            disabled={isSubmitting}
          >
            <option value="Rent">Rent</option>
            <option value="Sale">Sale</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description ( Optional )</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter property description"
            disabled={isSubmitting}
            rows={4}
          />
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Property'}
        </button>
      </form>
    </div>
  );
};

export default PropertyForm;
