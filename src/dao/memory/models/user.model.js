import { randomUUID } from "crypto"; // Nativo de Node.js para generar IDs únicas

class UserModel {
    constructor({ _id, first_name, last_name, email, password, age, role, cart }) {
        this._id = _id || randomUUID();
        this.first_name = first_name || '';
        this.last_name = last_name || '';
        this.email = email || '';
        this.password = password || '';
        this.role = role || 'user';
        this.age= age || 0;
        this.cart = cart || null;
    }
}

export default UserModel;