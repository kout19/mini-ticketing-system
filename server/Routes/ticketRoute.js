const express = require('express');
const { auth, admin } = require('../Middle-ware/auth');
const ticketController = require('../controllers/ticketController');
const router = express.Router();

// Create ticket (users only)
router.post('/', auth, ticketController.createTicket);

// Get user's own tickets (users only)
router.get('/', auth, ticketController.getUserTickets);

// Admin can view all tickets
router.get('/admin', auth, admin, ticketController.getAllTickets);

// Admin can update any ticket
router.put('/admin/:id', auth, admin, ticketController.updateTicket);

module.exports = router;
