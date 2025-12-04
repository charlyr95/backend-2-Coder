import UserModel from "./models/user.model.js";
import userAdmin from "../../utils/userAdmin.js";

class UserDao {
    constructor() {
        this.users = [];
        this.#createAdmin();
    }

    #createAdmin() {
        this.users.push(new UserModel(userAdmin));
    }

    async create(userData) {
        this.users.push(new UserModel(userData));
        return userData;
    }

    async get(){
        return this.users;
    }

    async getBy(filter) {
        return this.users.find(user => {
            return Object.keys(filter).every(key => user[key] === filter[key]);
        });
    }

    async update(userId, userData) {
        const index = this.users.findIndex(user => user._id === userId);
        if (index !== -1) {
            this.users[index] = new UserModel({ ...this.users[index], ...userData });
            return this.users[index];
        }
        return null;
    }

    async delete(userId) {
        const index = this.users.findIndex(user => user._id === userId);
        if (index !== -1) {
            const deletedUser = this.users.splice(index, 1);
            return deletedUser[0];
        }
        return null;
    }
}

export default new UserDao();