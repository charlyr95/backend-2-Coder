import UserModel from "./models/user.model.js";

class UserDao {
  constructor() {
    this.model = UserModel;
  }

  async create(userData) {
    const user = new this.model(userData);
    return await user.save();
  }

  async get() {
    return await this.model.find();
  }

  async getBy(filter) {
    return await this.model.findOne(filter).select("+password");
  }

  async update(userId, userData) {
    return await this.model
      .findByIdAndUpdate(userId, userData, { runValidators: true, new: true })
      .select("+password");
  }

  async delete(userId) {
    return await this.model.findByIdAndDelete(userId);
  }
}

export default new UserDao();
