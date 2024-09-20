import { useState } from 'react';

export default function CreateClubForm({ handleAddClub }) {
  const [formData, setFormData] = useState({
    name: '',
  });

  const [errorMsg, setErrorMsg] = useState('');

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    setErrorMsg('');
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      handleAddClub(formData);
    } catch (err) {
      setErrorMsg('Failed to create club - Try again');
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} id="create-club-form">
        <label htmlFor="name" className="create-club-label">Create Club:</label>
        <div className="input-button-container">
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Club Name"
            required
          />
          <button type="submit" className="create-club-button">Create Club</button>
        </div>
      </form>
      <p className="error-message">{errorMsg}</p>
    </>
  );
}
