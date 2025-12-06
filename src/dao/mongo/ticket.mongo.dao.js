import TicketModel from "./models/ticket.model.js";

class TicketDao {
  constructor() {
    this.model = TicketModel;
  }

  async get() {
    return await this.model.find();
  }

  async getBy(filter) {
    return await this.model.findOne(filter);
  }

  async create(ticket) {
    return await this.model.create(ticket);
  }

  async update(id, updatedFields) {
    return await this.model.findByIdAndUpdate(id, updatedFields, {
      runValidators: true,
      new: false,
    });
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }
}

export default new TicketDao();
