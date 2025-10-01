import './App.css';
import UsersAPI from "./api/services";
import UsersTable from "./components/Table";
import UserForm from "./components/Form";
import { useState } from "react";

const initialUsers = UsersAPI.all();

function App() {
    const [users, setUsers] = useState(initialUsers);

    const deleteUser = (id) => {
        if (UsersAPI.delete(id)) {
            setUsers(users.filter((user) => user.id !== id));
        }
    };

    const addUser = (user) => {
        const newUser = UsersAPI.add(user);
        if (newUser) {
            setUsers([...users, newUser]);
        }
    };

    const updateUser = (updatedUser) => {
        const result = UsersAPI.update(updatedUser);
        if (result) {
            setUsers(users.map(user => 
                user.id === updatedUser.id ? updatedUser : user
            ));
        }
    };

    return (
        <div className="App">
            <div className="container">
                <h1>Студенты ИТ-13</h1>
                
                <UserForm 
                    onSubmit={addUser} 
                    initialUser={{ firstName: '', lastName: '', email: '' }}
                />
                
                <UsersTable 
                    users={users} 
                    deleteUser={deleteUser}
                    updateUser={updateUser}
                />
            </div>
        </div>
    );
}

export default App;