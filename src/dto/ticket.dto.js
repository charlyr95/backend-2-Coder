class TicketDto {
  constructor(ticket) {
    this.code = ticket.code;
    this.purchase_datetime = ticket.purchase_datetime;
    this.total_amount = ticket.total_amount;
  }
}
