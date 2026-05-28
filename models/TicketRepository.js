class TicketRepository {
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

}