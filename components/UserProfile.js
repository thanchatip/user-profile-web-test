import React, { useState, useEffect } from 'react';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const apiBase = 'https://dummyjson.com';
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiBase}/users/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, [userId]);
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>{user.name}</h1>
      <h1>{user.firstName}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserProfile;
