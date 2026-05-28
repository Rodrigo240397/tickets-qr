export default class TicketController {
  constructor(ticketRepository) {
    this.ticketRepository = ticketRepository;
  }

  async getTickets(req, res) {
    try {
      const tickets = await this.ticketRepository.getTickets();
      res.render("tickets/index-tickets", { title: "Tickets", tickets });
    } catch (error) {
      console.error("Error al obtener tickets:", error);
      res.status(500).json({ error: "No se pudieron obtener los tickets" });
    }
  }
}