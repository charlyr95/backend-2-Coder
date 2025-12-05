import { Router } from "express";
import controller from "../controllers/ticket.controller.js";
import { passportCall } from "../middlewares/passportCall.js";
import authRole from "../middlewares/authRole.js";

const router = Router();

router.post("/", passportCall("current"), controller.createTicket);
// router.get("/", passportCall("current"), authRole("admin"), controller.getAllTickets);
// router.get("/:tid", passportCall("current"), authRole("admin"), controller.getTicketById);
// router.get("/code/:code", passportCall("current"), authRole("admin"), controller.getTicketByCode);
// router.put("/:tid", passportCall("current"), authRole("admin"), controller.updateTicket);
// router.delete("/:tid", passportCall("current"), authRole("admin"), controller.deleteTicket);

export default router;
