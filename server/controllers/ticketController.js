const Ticket = require('../Models/ticket');

// Create ticket (users only)
exports.createTicket = async (req, res) => {
  const { title, description } = req.body;

  try {
    const ticket = new Ticket({
      title,
      description,
      user: req.user._id
    });

    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    res.status(400).json({ message: 'Error creating ticket' });
  }
};

// Get user's own tickets (users only)
exports.getUserTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ createdBy: req.user._id });
    res.json(tickets);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching tickets' });
  }
};

// Admin can view all tickets
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching tickets' });
  }
};

// Admin can update any ticket
exports.updateTicket = async (req, res) => {
  const { status } = req.body;

  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    ticket.status = status || ticket.status;
    await ticket.save();
    res.json(ticket);
  } catch (error) {
    res.status(400).json({ message: 'Error updating ticket' });
  }
};
