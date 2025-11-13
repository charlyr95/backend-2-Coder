import User from "./models/user.model.js";

class UserDao {
    constructor(model) {
        this.model = model;
    }

    async createUser(userData) {
        const user = new this.model(userData);
        return await user.save();
    }

    async getUserById(userId) {
        return await this.model.findById(userId);
    }

    async getUserByEmail(email) {
        // return full user and password (that has select false in schema)
        const user = await this.model.findOne({ email: email }).select("+password");
        return user;
    }

    async updateUser(userId, userData) {
        return await this.model.findByIdAndUpdate(userId, userData, { new: true });
    }

    async deleteUser(userId) {
        return await this.model.findByIdAndDelete(userId);
    }

    async getAllUsers() {
        return await this.model.find();
    }
}

export default new UserDao(User);