import TicketService from "../service/ticket.service.js";

class TicketController {
    constructor() {
        this.service = TicketService;
    }

    createTicket = async (req, res, next) => {
        try {
            const result = await this.service.createTicket(req.user);
            res.status(201).send({ message: "Ticket creado exitosamente", ticket: result });
        } catch (error) {
            res.status(error.code || 500).send({ message: "Error al crear el ticket", error: error.message });
        }
    }

    getTicketById = async (req, res, next) => {
        try {
            const result = await this.service.getTicketById(req.params.tid);
            res.status(200).send({ message: "Ticket obtenido exitosamente", ticket: result || {} });
        } catch (error) {
            res.status(error.code || 500).send({ message: "Error al obtener el ticket", error: error.message });
        }
    }

    getTicketByCode = async (req, res, next) => {
        try {
            const result = await this.service.getTicketByCode(req.params.code);
            res.status(200).send({ message: "Ticket obtenido exitosamente", ticket: result || {} });
        } catch (error) {
            res.status(error.code || 500).send({ message: "Error al obtener el ticket", error: error.message });
        }
    }

    updateTicket = async (req, res, next) => {
        try {
            const result = await this.service.updateTicket(req.params.tid, req.body);
            res.status(200).send({ message: "Ticket actualizado exitosamente", ticket: result || {} });
        } catch (error) {
            res.status(error.code || 500).send({ message: "Error al actualizar el ticket", error: error.message });
        }
    }

    deleteTicket = async (req, res, next) => {
        try {
            const result = await this.service.deleteTicket(req.params.tid);
            res.status(200).send({ message: "Ticket eliminado exitosamente", ticket: result || {} });
        } catch (error) {
            res.status(error.code || 500).send({ message: "Error al eliminar el ticket", error: error.message });
        }
    }

    getAllTickets = async (req, res, next) => {
        try {
            const result = await this.service.getAllTickets();
            res.status(200).send({ message: "Tickets obtenidos exitosamente", tickets: result || [] });
        } catch (error) {
            res.status(error.code || 500).send({ message: "Error al obtener los tickets", error: error.message });
        }
    }
}

export default new TicketController();
