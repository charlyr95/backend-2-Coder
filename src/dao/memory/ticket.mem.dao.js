import TicketModel from "./models/ticket.model.js";

class TicketDao {
    constructor() {
        this.tickets = [];
    }

    async create(userData) {
        this.tickets.push(new TicketModel(userData));
        return userData;
    }

    async get(){
        return this.tickets;
    }

    async getBy(filter) {
        return this.tickets.find(ticket => {
            return Object.keys(filter).every(key => ticket[key] === filter[key]);
        });
    }

    async update(ticketId, ticketData) {
        const index = this.tickets.findIndex(ticket => ticket._id === ticketId);
        if (index !== -1) {
            this.tickets[index] = new TicketModel({ ...this.tickets[index], ...ticketData });
            return this.tickets[index];
        }
        return null;
    }

    async delete(ticketId) {
        const index = this.tickets.findIndex(ticket => ticket._id === ticketId);
        if (index !== -1) {
            const deletedTicket = this.tickets.splice(index, 1);
            return deletedTicket[0];
        }
        return null;
    }
}

export default new TicketDao();