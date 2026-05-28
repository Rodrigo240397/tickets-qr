import { Router } from "express"
import pool from "../db/connection.js"
import TicketRepository from "../models/TicketRepository.js"
import TicketController from "../controllers/TicketController.js"

const router = Router()
const ticketRepository = new TicketRepository(pool)
const ticketController = new TicketController(ticketRepository)

router.get("/", (req, res) => {
  res.render("index", { title: "Inicio" })
})

router.get("/tickets", (req, res) => ticketController.getTickets(req, res))
router.get("/tickets/create", (req, res) => ticketController.showCreateForm(req, res))
router.post("/tickets/create", (req, res) => ticketController.createTicket(req, res))

export default router