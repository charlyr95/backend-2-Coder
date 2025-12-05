import TicketRepository from "../repository/ticket.repository.js";

class TicketService {
  constructor() {
    this.repository = TicketRepository;
  }

  async createTicket(ticketData) {
    console.log("creating ticket service...")
  }

  async getTicketById(ticketId) {
    if (!ticketId) throw new Error("ID del ticket es requerido");
    return await this.repository.getTicketById(ticketId);
  }

  async getTicketByCode(ticketCode) {
    if (!ticketCode) throw new Error("Código de ticket es requerido");
    return await this.repository.getTicketByCode(ticketCode);
  }

  async updateTicket(ticketId, ticketData) {
    if (!ticketId) throw new Error("ID del ticket es requerido");
    if (!ticketData) throw new Error("Datos del ticket son requeridos");
    return await this.repository.updateTicket(ticketId, ticketData);
  }

  async deleteTicket(ticketId) {
    if (!ticketId) throw new Error("ID del ticket es requerido");
    return await this.repository.deleteTicket(ticketId);
  }

  async getAllTickets() {
    return await this.repository.getAllTickets();
  }
}

export default new TicketService();
