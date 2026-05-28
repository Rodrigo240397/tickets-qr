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

  async getTicketByToken(token) {
    const [rows] = await this.db.query("SELECT * FROM tickets WHERE token = ?", [token]);
    if (!rows || rows.length === 0) {
      throw new Error("Ticket not found");
    }
    return this.fromRow(rows[0]);
  }

  async createTicket(ticket) {
    const { nombre, email, token, usada } = ticket;
    console.log("Creating ticket:", { nombre, email, token, usada });
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