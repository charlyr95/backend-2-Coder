import { TicketDao } from "../dao/factory.js";

class TicketRepository {
    constructor() {
        this.dao = TicketDao;
    }

    async createTicket(ticketData) {
        const ticket = await this.dao.create(ticketData);
        return ticket;
    }

    async getTicketById(ticketId) {
        return await this.dao.getBy({ _id: ticketId });
    }

    async getTicketByCode(ticketCode) {
        return await this.dao.getBy({ code: ticketCode });
    }

    async updateTicket(ticketId, ticketData) {
        return await this.dao.update(ticketId, ticketData);
    }

    async deleteTicket(ticketId) {
        return await this.dao.delete(ticketId);
    }

    async getAllTickets() {
        return await this.dao.get();
    }
}

export default new TicketRepository();