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

  async showCreateForm(req, res) {
    res.render("tickets/create-ticket", { title: "Crear Ticket" });
  }

  async createTicket(req, res) {
    try {
      const { nombre, email, token } = req.body;
      const newTicket = { nombre, email, token };
      const ticketId = await this.ticketRepository.createTicket(newTicket);
      res.status(201).redirect("/tickets");
    } catch (error) {
      console.error("Error al crear ticket:", error);
      res.status(500).json({ error: "No se pudo crear el ticket" });
    }
  }
}