import { randomUUID } from "crypto"; // Nativo de Node.js para generar IDs únicas

class TicketModel {
    constructor({_id, code, purchase_datetime, total_amount, order_detail, purchaser}) {
        this._id = _id || randomUUID();
        this.code = code || `${new Date().toISOString().replace(/[-:T.Z]/g, '').slice(0, 14)}-${this._id.slice(0, 7).toUpperCase()}`;
        this.purchase_datetime = purchase_datetime || new Date(),
        this.total_amount = total_amount || 0,
        this.order_detail = order_detail || [],
        this.purchaser = purchaser || ""
    }
}

export default TicketModel;