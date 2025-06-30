import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Registration successful! Please login.');
        setTimeout(() => navigate('/login'), 1200);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h2 className="text-3xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} style={{width: 320, display: 'flex', flexDirection: 'column', gap: 16}}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required style={{padding: 10, borderRadius: 6, border: '1px solid #ccc'}} />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{padding: 10, borderRadius: 6, border: '1px solid #ccc'}} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{padding: 10, borderRadius: 6, border: '1px solid #ccc'}} />
        <button type="submit" style={{background: '#ea580c', color: '#fff', padding: 12, border: 'none', borderRadius: 6, fontWeight: 600}}>Register</button>
        {error && <div style={{color: 'red', marginTop: 8}}>{error}</div>}
        {success && <div style={{color: 'green', marginTop: 8}}>{success}</div>}
      </form>
      <div style={{marginTop: 16}}>
        Already have an account? <span style={{color: '#ea580c', cursor: 'pointer'}} onClick={() => navigate('/login')}>Login</span>
      </div>
    </div>
  );
};

export default Register; 