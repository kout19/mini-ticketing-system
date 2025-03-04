const Ticket = require('../Models/ticket');

// Create ticket (users only)
exports.createTicket = async (req, res) => {
try {
  const { title, description } = req.body;
  if(!title || !description){
    return res.status(400).json({message:"Title and Description are required"});
  }
    const newTicket = new Ticket({
      title,
      description,
      user: req.user._id
    });

    await newTicket.save();
    res.status(201).json({message:"Ticket created successfully",newTicket});
  } catch (error) {
    console.log("Error creating tickets",error)
    res.status(400).json({ message: 'Error creating ticket' });
  }
};

// Get user's own tickets (users only)
exports.getUserTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user._id });
    res.json(tickets);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching tickets' });
  }
};

// Admin can view all tickets
exports.getAllTickets = async (req, res) => {
  try {
    // Get the user from the request (assuming `req.user` contains the logged-in user data)
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only!" });
    }

    const tickets = await Ticket.find().populate("user", "name email");
    console.log("All tickets:", tickets);
    res.status(200).json({ message: "All tickets", tickets });
  } catch (error) {
    console.log("Error fetching tickets:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Admin can update any ticket
exports.updateTicket = async (req, res) => {
  try {
    const {id}=req.params;
    const updatedTicket = await Ticket.findById(id, req.body, {new:true});
    if (!updatedTicket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
   res.status(200).json({message:"Ticket updated successfully", updatedTicket});

  } catch (error) {
    console.log("error updating ticket",error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteTicket =async(req,res)=>{
  try{
const id =req.params;
const deletedTicket= await Ticket.findByIdAndDelete(id);
if(!deletedTicket){
  res.status(400).json({message: "Ticket not not found"});
}
 res.status(200).json({message: "Ticket deleted Succesfully"});
  }
  catch(error){
    console.log("Deleting tickets  error");
    res.status(500).json({message: "Internale server error"});
  }
}
