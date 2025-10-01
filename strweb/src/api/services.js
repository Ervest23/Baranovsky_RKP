const UsersAPI = {
    users: [
        { id: 1, firstName: 'Слава', lastName: 'Барановский', email: 'slava@gmail.com' },
        { id: 2, firstName: 'Илья', lastName: 'Христофоров', email: 'ilya@gmail.com' },
        { id: 3, firstName: 'Максим', lastName: 'Проскочилов', email: 'maxim@gmail.com' },
        { id: 4, firstName: 'Артур', lastName: 'Шелешков', email: 'artur@gmail.com' },
        { id: 5, firstName: 'Дима', lastName: 'Кулешов', email: 'dddddiiiimma@gmail.com' },
        { id: 6, firstName: 'Виталик', lastName: 'Лобкис', email: 'vitalik@gmail.com' },
        { id: 7, firstName: 'Глеб', lastName: 'Ванцевич', email: 'promolchy@gleb.com' }
    ],

    all: function() {
        return this.users;
    },

    get: function(id) {
        return this.users.find(user => user.id === id);
    },

    delete: function(id) {
        const isNotDeletedUser = (user) => user.id !== id;
        this.users = this.users.filter(isNotDeletedUser);
        return true;
    },

    add: function(user) {
        if (!user.firstName?.trim() || !user.lastName?.trim() || !user.email?.trim()) {
            throw new Error('Все поля обязательны для заполнения');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(user.email)) {
            throw new Error('Введите корректный email');
        }

        if (!user.id) {
            const maxId = this.users.reduce((max, current) => 
                current.id > max ? current.id : max, 0);
            user.id = maxId + 1;
        }

        this.users = [...this.users, user];
        return user;
    },

    update: function(updatedUser) {
        if (!updatedUser.firstName?.trim() || !updatedUser.lastName?.trim() || !updatedUser.email?.trim()) {
            throw new Error('Все поля обязательны для заполнения');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(updatedUser.email)) {
            throw new Error('Введите корректный email');
        }

        const index = this.users.findIndex(user => user.id === updatedUser.id);
        if (index !== -1) {
            this.users[index] = updatedUser;
            return updatedUser;
        }
        throw new Error('Пользователь не найден');
    }
};

export default UsersAPI;