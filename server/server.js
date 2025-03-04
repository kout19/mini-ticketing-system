const express = require('express');
const cors= require('cors');
const connectDB = require('./config/db');
const userRoute=require('./Routes/userRoute');
const ticketRoutes= require('./Routes/ticketRoute');
const app = express();
const PORT=process.env.PORT || 3000;
connectDB();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoute);
app.use('/api', ticketRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
    });
    
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });