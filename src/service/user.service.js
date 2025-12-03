import UserRepository from "../repository/user.repository.js";

class UserService {
  constructor() {
    this.repository = UserRepository;
  }

  async createUser(userData) {
    if (!userData) throw new Error("Datos de usuario son requeridos");
    return await this.repository.createUser(userData);
  }

  async getUserById(userId) {
    if (!userId) throw new Error("ID de usuario es requerido");
    return await this.repository.getUserById(userId);
  }

  async getUserByEmail(email) {
    if (!email) throw new Error("Email es requerido");
    return await this.repository.getUserByEmail(email);
  }

  async updateUser(userId, userData) {
    if (!userId) throw new Error("ID de usuario es requerido");
    if (!userData) throw new Error("Datos de usuario son requeridos");
    return await this.repository.updateUser(userId, userData);
  }

  async deleteUser(userId) {
    if (!userId) throw new Error("ID de usuario es requerido");
    return await this.repository.deleteUser(userId);
  }

  async getAllUsers() {
    return await this.repository.getAllUsers();
  }
}

export default new UserService();
