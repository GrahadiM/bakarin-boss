// pages/users.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateUser = async () => {
    try {
      await axios.post('/api/users', { name, email, phone });
      getUsers();
      setName('');
      setEmail('');
      setPhone('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const userToEdit = users.find((user) => user.id === id);
      if (!userToEdit) {
        console.error('User not found');
        return;
      }

      setName(userToEdit.name);
      setEmail(userToEdit.email);
      setPhone(userToEdit.phone);
      setEditingUserId(id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      await axios.put(`/api/users`, {
        id: editingUserId,
        name,
        email,
        phone,
      });
      setName('');
      setEmail('');
      setPhone('');
      setEditingUserId(null);
      getUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      getUsers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Daftar Pengguna</h1>
      <form onSubmit={editingUserId ? handleUpdateUser : handleCreateUser}>
        <input
          type="text"
          placeholder="Nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {editingUserId && (
          <button type="button" onClick={() => setEditingUserId(null)}>
            Batal Edit
          </button>
        )}
        <button type="submit">
          {editingUserId ? 'Update Pengguna' : 'Tambah Pengguna'}
        </button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user?.id}>
            {user?.name} - {user?.email}
            <button onClick={() => handleEdit(user?.id)}>Edit</button>
            <button onClick={() => handleDelete(user?.id)}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
