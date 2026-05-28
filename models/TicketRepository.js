import Ticket from "./Ticket.js"

export default class TicketRepository {
  constructor(db) {
    this.db = db;
  }

  fromRow(row) {
    return new Ticket(row.nombre, row.email, row.token, row.usada);
  }

  async getTickets() {
    const [rows] = await this.db.query("SELECT * FROM tickets");
    if (!rows) {
      throw new Error("No tickets found");
    }
    return rows.map(this.fromRow);
  }

  async createTicket(ticket) {
    const { nombre, email, token, usada } = ticket;
    const [result] = await this.db.query(
      "INSERT INTO tickets (nombre, email, token, usada) VALUES (?, ?, ?, ?)",
      [nombre, email, token, usada]
    );
    if (!result) {
      throw new Error("Failed to create ticket");
    }
    return result.insertId;
  }

}