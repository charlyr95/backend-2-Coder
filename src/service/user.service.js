import UserRepository from "../repository/user.repository.js";
import UserDto from "../dto/user.dto.js";

class UserService {
    constructor() {
        this.repository = UserRepository;
    }

    async createUser(userData) {
        if (!userData) throw new Error("Datos de usuario son requeridos");
        const user = await this.repository.createUser(userData);
        return user;
    }

    async getUserById(userId) {
        if (!userId) throw new Error("ID de usuario es requerido");
        const user = await this.repository.getUserById(userId);
        return new UserDto(user);
    }

    async getUserByEmail(email) {
        if (!email) throw new Error("Email es requerido");
        const user = await this.repository.getUserByEmail(email);
        return new UserDto(user);
    }

    async updateUser(userId, userData) {
        if (!userId) throw new Error("ID de usuario es requerido");
        if (!userData) throw new Error("Datos de usuario son requeridos");
        const updatedUser = await this.repository.updateUser(userId, userData);
        return new UserDto(updatedUser);
    }

    async deleteUser(userId) {
        if (!userId) throw new Error("ID de usuario es requerido");
        const deletedUser = await this.repository.deleteUser(userId);
        return new UserDto(deletedUser);
    }

    async getAllUsers() {
        return await this.repository.getAllUsers();
    }
}

export default new UserService();