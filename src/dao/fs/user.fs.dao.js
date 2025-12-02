import fs from "fs";
import UserModel from "./models/user.model.js";

class UserFsDao {
    constructor() {
        this.users = this.#loadUsers();
        this.filePath = "./data/users.json";
    }

    async #loadUsers() {
        // try to get users from file, if file doesn't exist initialize with empty array
        try {
            const data = await fs.promises.readFile(this.filePath, "utf-8");
            if(data.length === 0) return [];
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async create(userData) {
        const newUser = new UserModel(userData);
        this.users.push(newUser);
        await fs.promises.writeFile(this.filePath, JSON.stringify(this.users, null, 2));
        return newUser;
    }

    async get() {
        this.users = await this.#loadUsers();
        return this.users;
    }

    async getBy(filter) {
        const users = await this.get();
        return users.find(user => {
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

export default new UserFsDao();