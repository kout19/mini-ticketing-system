const express = require('express');
const { Auth, Admin } = require('../Middle-ware/auth');
const ticketController = require('../controllers/ticketController');
const router = express.Router();

// Create ticket (users only)
router.post('/ticket', Auth, ticketController.createTicket);
router.get('/ticket', Auth, ticketController.getUserTickets);

// Get user's own tickets (users only)
router.get('/', Admin, ticketController.getUserTickets);

// Admin can view all tickets
router.get('/admin/all',Auth, Admin, ticketController.getAllTickets);

// Admin can update any ticket
router.put('/admin/:id',  ticketController.updateTicket);
//Admin can delete any ticket
router.delete('/tickets/:id', Admin, ticketController.deleteTicket);

module.exports = router;
