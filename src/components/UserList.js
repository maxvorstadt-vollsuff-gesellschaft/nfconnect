import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../services/api';

const UserList = ({ onUserSelected }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const usersData = await fetchUsers();
      setUsers(usersData);
    };

    loadUsers();
  }, []);

  return (
    <div>
      <h2>Select User</h2>
      <select onChange={(e) => onUserSelected(e.target.value)}>
        <option value="">Select a user...</option>
        {users.map((user) => (
          <option key={user.id} value={user.name}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserList;
