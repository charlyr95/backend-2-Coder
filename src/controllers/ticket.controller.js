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
            res.status(500).send({ message: "Error al crear el ticket", error: error.message });
        }
    }

    getTicketById = async (req, res, next) => {
        try {
            res.status(201).send({ message: "Ticket obtenido exitosamente" });
        } catch (error) {
            res.status(500).send({ message: "Error al obtener el ticket" });
        }
    }

    getTicketByCode = async (req, res, next) => {
        try {
            res.status(201).send({ message: "Ticket obtenido exitosamente" });
        } catch (error) {
            res.status(500).send({ message: "Error al obtener el ticket" });
        }
    }

    updateTicket = async (req, res, next) => {
        try {
            res.status(201).send({ message: "Ticket actualizado exitosamente" });
        } catch (error) {
            res.status(500).send({ message: "Error al actualizar el ticket" });
        }
    }

    deleteTicket = async (req, res, next) => {
        try {
            res.status(201).send({ message: "Ticket eliminado exitosamente" });
        } catch (error) {
            res.status(500).send({ message: "Error al eliminar el ticket" });
        }
    }

    getAllTickets = async (req, res, next) => {
        try {
            res.status(201).send({ message: "Tickets obtenidos exitosamente" });
        } catch (error) {
            res.status(500).send({ message: "Error al obtener los tickets" });
        }
    }
}

export default new TicketController();
