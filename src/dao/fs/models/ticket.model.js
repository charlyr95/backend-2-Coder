import { randomUUID } from "crypto"; // Nativo de Node.js para generar IDs únicas

class TicketModel {
    constructor({_id, code, purchase_datetime, total_amount, order_detail, purchaser}) {
        this._id = _id || randomUUID();
        this.code = code || Date.now().toString(36) + "-" + Math.random().toString(36).substr(2, 9),
        this.purchase_datetime = purchase_datetime || new Date(),
        this.total_amount = total_amount || 0,
        this.order_detail = order_detail || [],
        this.purchaser = purchaser || ""
    }
}

export default TicketModel;