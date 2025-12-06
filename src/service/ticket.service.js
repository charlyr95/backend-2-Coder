import TicketRepository from "../repository/ticket.repository.js";
import ProductRepository from "../repository/products.repository.js";
import CartRepository from "../repository/carts.repository.js";
import UserRepository from "../repository/user.repository.js";

class TicketService {
  constructor() {
    this.repository = TicketRepository;
    this.productRepository = ProductRepository;
    this.cartRepository = CartRepository;
    this.userRepository = UserRepository;
  }

  async createTicket(user) {
    if (!user) throw new Error("Usuario es requerido para crear un ticket");
    if (!user.cart) throw new Error("El usuario no tiene un carrito asociado");
    const userCart = await this.cartRepository.getCartBy({ _id: user.cart });
    if (!userCart) throw new Error("Carrito no encontrado");
    const cartProducts = userCart.products;
    if (cartProducts.length === 0) throw new Error("El carrito está vacío");

    // Validar stock de los productos en el carrito
    const errors = [];
    const orderProducts = [];
    let totalAmount = 0;
    for (const item of cartProducts) {
      const product = await this.productRepository.getProductBy({ _id: item.product._id || item.product });
      if (item.quantity > product.stock) {
        errors.push(`No hay suficiente stock para el producto ID: ${product._id}`);
      } else {
        orderProducts.push({ product: product._id, quantity: item.quantity, price: product.price });
        totalAmount += item.quantity * product.price;
      }
    }
    if (errors.length > 0) throw new Error(errors.join(", "));

    const ticketData = {
      purchaser: user._id,
      total_amount: totalAmount,
      order_detail: orderProducts
    };

    // Crear el ticket
    const newTicket = await this.repository.createTicket(ticketData);
    if (!newTicket) throw new Error("Error al crear el ticket");

    // Actualizar stock de los productos
    try {
      for (const item of orderProducts) {
        const product = await this.productRepository.getProductBy({ _id: item.product });
        product.stock -= item.quantity;
        await this.productRepository.updateProduct(product._id, product);
      }
    } catch (error) {
      // throw new Error("Error al actualizar el stock de los productos");
      return newTicket; // Retornar el ticket aunque falle la actualización de stock
    }
    
    // Remover carrito asociado a usuario
    try {
      await this.userRepository.updateUser(user._id, { cart: null });
    } catch (error) {
      return newTicket; // Retornar el ticket aunque falle la actualización del usuario
    }
    return newTicket;
  }

  async getTicketById(ticketId) {
    if (!ticketId) throw new Error("ID del ticket es requerido");
    return await this.repository.getTicketById(ticketId);
  }

  async getTicketByCode(ticketCode) {
    if (!ticketCode) throw new Error("Código de ticket es requerido");
    return await this.repository.getTicketByCode(ticketCode);
  }

  async updateTicket(ticketId, ticketData) {
    if (!ticketId) throw new Error("ID del ticket es requerido");
    if (!ticketData) throw new Error("Datos del ticket son requeridos");
    return await this.repository.updateTicket(ticketId, ticketData);
  }

  async deleteTicket(ticketId) {
    if (!ticketId) throw new Error("ID del ticket es requerido");
    return await this.repository.deleteTicket(ticketId);
  }

  async getAllTickets() {
    return await this.repository.getAllTickets();
  }
}

export default new TicketService();
