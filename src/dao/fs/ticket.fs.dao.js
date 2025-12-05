import fs from "fs";
import TicketModel from "./models/ticket.model.js";

class TicketFsDao {
    constructor() {
        this.tickets = this.#loadTickets();
        this.filePath = "./data/tickets.json";
    }

    async #loadTickets() {
        // try to get users from file, if file doesn't exist initialize with empty array
        try {
            const data = await fs.promises.readFile(this.filePath, "utf-8");
            if(data.length === 0) return [];
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async create(userData) {
        const newUser = new TicketModel(userData);
        this.tickets.push(newUser);
        await fs.promises.writeFile(this.filePath, JSON.stringify(this.tickets, null, 2));
        return newUser;
    }

    async get() {
        this.tickets = await this.#loadTickets();
        return this.tickets;
    }

    async getBy(filter) {
        const users = await this.get();
        return users.find(user => {
            return Object.keys(filter).every(key => user[key] === filter[key]);
        });
    }

    async update(userId, userData) {
        const index = this.tickets.findIndex(user => user._id === userId);
        if (index !== -1) {
            this.tickets[index] = new TicketModel({ ...this.tickets[index], ...userData });
            return this.tickets[index];
        }
        return null;
    }

    async delete(userId) {
        const index = this.tickets.findIndex(user => user._id === userId);
        if (index !== -1) {
            const deletedUser = this.tickets.splice(index, 1);
            return deletedUser[0];
        }
        return null;
    }
}

export default new TicketFsDao();