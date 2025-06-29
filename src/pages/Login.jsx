import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h2 className="text-3xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} style={{width: 320, display: 'flex', flexDirection: 'column', gap: 16}}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{padding: 10, borderRadius: 6, border: '1px solid #ccc'}} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{padding: 10, borderRadius: 6, border: '1px solid #ccc'}} />
        <button type="submit" style={{background: '#ea580c', color: '#fff', padding: 12, border: 'none', borderRadius: 6, fontWeight: 600}}>Login</button>
        {error && <div style={{color: 'red', marginTop: 8}}>{error}</div>}
      </form>
      <div style={{marginTop: 16}}>
        Don't have an account? <span style={{color: '#ea580c', cursor: 'pointer'}} onClick={() => navigate('/register')}>Register</span>
      </div>
    </div>
  );
};

export default Login; 