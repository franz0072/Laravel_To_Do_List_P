import React, { useEffect, useState } from 'react';
import api from '../api';
import { Table, Button } from 'react-bootstrap';

function AdminDashboard() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/admin/users');
      setUsers(res.data);
    } catch (err) {
      alert('Failed to load users');
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure to delete this user?')) return;

    try {
      await api.delete(`/admin/users/${id}`);
      fetchUsers();
    } catch (err) {
      alert('Failed to delete user');
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await api.get('/admin/users'); // backend route
      setUsers(res.data);
    };
    fetchUsers();
  }, []);


  return (
    <div className="container mt-4">
      <h3>Admin Dashboard - Users , Tasks and Delete User</h3>
      <Table>
        <thead>
          <tr>
            <th>No</th><th>User</th><th>Email</th><th>Tasks</th><th>Created</th><th>Updated</th><th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={user.id}>
              <td>{i + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <ul>
                  {user.tasks.map(task => <li key={task.id}>{task.task}</li>)}
                </ul>
              </td>
              <td>{new Date(user.created_at).toLocaleString()}</td>
              <td>{new Date(user.updated_at).toLocaleString()}</td>
              <td><Button onClick={() => deleteUser(user.id)}>Delete</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>

    </div>
  );
}

export default AdminDashboard;
