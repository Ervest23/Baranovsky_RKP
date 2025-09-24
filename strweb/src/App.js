import React, { useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([
    { id: 1, firstName: 'Слава', lastName: 'Барановский', email: 'slava@gmail.com' },
    { id: 2, firstName: 'Илья', lastName: 'Христофоров', email: 'ilya@gmail.com' },
    { id: 3, firstName: 'Максим', lastName: 'Проскочилов', email: 'maxim@gmail.com' },
    { id: 4, firstName: 'Артур', lastName: 'Шелешков', email: 'artur@gmail.com' },
    { id: 5, firstName: 'Дима', lastName: 'Кулешов', email: 'dddddiiiimma@gmail.com' },
    { id: 6, firstName: 'Виталик', lastName: 'Лобкис', email: 'vitalik@gmail.com' },
    { id: 7, firstName: 'Глеб', lastName: 'Ванцевич', email: 'promolchy@gleb.com' }
  ]);

  const [form, setForm] = useState({ firstName: '', lastName: '', email: '' });
  const [error, setError] = useState('');

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim()) {
      setError('Все поля обязательны для заполнения');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('Введите корректный email');
      return;
    }
    setError('');
    const newUser = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      ...form
    };
    setUsers([...users, newUser]);
    setForm({ firstName: '', lastName: '', email: '' });
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Студенты ИТ-13</h1>

        <div className="add-user-form">
          <input
            type="text"
            name="firstName"
            placeholder="Имя"
            value={form.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Фамилия"
            value={form.lastName}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <button className="add-btn" onClick={handleAdd}>Добавить</button>
        </div>
        {error && <p className="error">{error}</p>}

        <table className="users-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Email</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(user.id)}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
