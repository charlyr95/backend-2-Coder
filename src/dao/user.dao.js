import User from "./models/user.model.js";

class UserDao {
    constructor(model) {
        this.model = model;
    }

    async createUser(userData) {
        try {
            const user = new this.model(userData);
            return await user.save();
        } catch (error) {
            throw error;
        }
    }

    async getUserById(userId) {
        try {
            return await this.model.findById(userId);
        } catch (error) {
            throw error;
        }
    }

    async getUserByEmail(email) {
        try {
            // return full user and password (that has select false in schema)
            const user = await this.model.findOne({ email: email }).select("+password");
            return user;
        } catch (error) {
            throw error;
        }
    }

    async updateUser(userId, userData) {
        try {
            return await this.model.findByIdAndUpdate(userId, userData, { new: true });
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(userId) {
        try {
            return await this.model.findByIdAndDelete(userId);
        } catch (error) {
            throw error;
        }
    }

    async getAllUsers() {
        try {
            return await this.model.find();
        } catch (error) {
            throw error;
        }
    }
}

export default new UserDao(User);