import fs from "fs";
import TicketModel from "./models/ticket.model.js";

class TicketFsDao {
    constructor() {
        this.tickets = this.#readFile();
        this.filePath = "./data/tickets.json";
    }

    async #readFile() {
        try {
            const data = await fs.promises.readFile(this.filePath, 'utf-8');
            if (data.length === 0 || !data) return [];
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async #writeFile(data) {
        if (!data) data = [];
        await fs.promises.writeFile(this.filePath, JSON.stringify(data, null, 2));
    }


    async create(userData) {
        const newUser = new TicketModel(userData);
        this.tickets.push(newUser);
        await this.#writeFile(this.tickets);
        return newUser;
    }

    async get() {
        this.tickets = await this.#readFile();
        return this.tickets;
    }

    async getBy(filter) {
        const tickets = await this.#readFile();
        return tickets.find(ticket => {
            return Object.keys(filter).every(key => ticket[key] === filter[key]);
        });
    }

    async update(userId, userData) {
        const tickets = await this.#readFile();
        const index = tickets.findIndex(ticket => ticket._id === userId);
        if (index !== -1) {
            tickets[index] = new TicketModel({ ...tickets[index], ...userData });
            await this.#writeFile(tickets);
            return tickets[index];
        }
        return null;
    }

    async delete(userId) {
        const tickets = await this.#readFile();
        const index = tickets.findIndex(ticket => ticket._id === userId);
        if (index !== -1) {
            const deletedTicket = tickets.splice(index, 1);
            await this.#writeFile(tickets);
            return deletedTicket[0];
        }
        return null;
    }
}

export default new TicketFsDao();