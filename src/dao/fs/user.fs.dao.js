import fs from "fs";
import UserModel from "./models/user.model.js";

class UserFsDao {
    constructor() {
        this.filePath = "./data/users.json";
    }

    async #readFile() {
        try {
            const data = await fs.promises.readFile(this.filePath, 'utf-8');
            if (data.length === 0 || !data) return [];
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async #writeFile(data) {
        if (!data) data = [];
        await fs.promises.writeFile(this.filePath, JSON.stringify(data, null, 2));
    }

    async create(userData) {
        const users = await this.#readFile();
        const newUser = new UserModel(userData);
        users.push(newUser);
        await this.#writeFile(users);
        return newUser;
    }

    async get() {
        const users = await this.#readFile();
        return users;
    }

    async getBy(filter) {
        const users = await this.#readFile();
        return users.find(user => {
            return Object.keys(filter).every(key => user[key] === filter[key]);
        });
    }

    async update(userId, userData) {
        const users = await this.#readFile();
        const index = users.findIndex(user => user._id === userId);
        if (index !== -1) {
            users[index] = new UserModel({ ...users[index], ...userData });
            await this.#writeFile(users);
            return users[index];
        }

        return null;
    }

    async delete(userId) {
        const users = await this.#readFile();
        const index = users.findIndex(user => user._id === userId);
        if (index !== -1) {
            const deletedUser = users.splice(index, 1);
            await this.#writeFile(users);
            return deletedUser[0];
        }
        return null;
    }
}

export default new UserFsDao();