import Ticket from "../models/Ticket.js"

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
      const { nombre, email } = req.body;
      const ticket = new Ticket(nombre, email);
      ticket.generarToken();
      await this.ticketRepository.createTicket(ticket);
      //res.status(201).redirect("/tickets");
      res.redirect(`/tickets/${ticket.getToken()}`);

    } catch (error) {
      console.error("Error al crear ticket:", error);
      res.status(500).json({ error: "No se pudo crear el ticket" });
    }
  }

  async showTicket(req, res) {
    try {
      const { token } = req.params;
      const ticket = await this.ticketRepository.getTicketByToken(token);
      if (!ticket) {
        return res.status(404).json({ error: "Ticket no encontrado" });
      }
      const qr = await ticket.generarQR();
      res.render('tickets/mostrar-ticket', { title: "Ticket", ticket, qr });
    } catch (error) {
      console.error("Error al mostrar ticket:", error);
      res.status(500).json({ error: "No se pudo mostrar el ticket" });
    }
  }
}