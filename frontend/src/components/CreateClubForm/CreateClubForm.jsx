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
      <h2>Create Club</h2>
      <form onSubmit={handleSubmit}>
        <label>Club Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Club</button>
      </form>
      <p className="error-message">{errorMsg}</p>
    </>
  );
}