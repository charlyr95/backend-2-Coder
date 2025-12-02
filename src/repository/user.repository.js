import UserDao from "../dao/user.dao.js";

class UserRepository {
    constructor() {
        this.dao = UserDao;
    }

    async createUser(userData) {
        const user = await this.dao.create(userData);
        return user;
    }

    async getUserById(userId) {
        return await this.dao.getBy({ _id: userId });
    }

    async getUserByEmail(email) {
        const user = await this.dao.getBy({ email: email });
        return user;
    }

    async updateUser(userId, userData) {
        return await this.dao.update(userId, userData);
    }

    async deleteUser(userId) {
        return await this.dao.delete(userId);
    }

    async getAllUsers() {
        return await this.dao.get();
    }
}

export default new UserRepository();