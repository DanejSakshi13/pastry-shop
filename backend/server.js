require('dotenv').config(); // Add this line at the top of your file

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:4000'
}));

// MongoDB connection
const mongoUri = process.env.MONGO_URI; // Use the environment variable

mongoose.connect(mongoUri, {})
.then(() => {
    console.log("MongoDB connected successfully");
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

// MongoDB schema
const orderSchema = new mongoose.Schema({
  fname: String,
  address: String,
  date: Date,
  pastry: String,
  paymentMethod: String
});

const Order = mongoose.model('Order', orderSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route to handle form submission
app.post('/submitOrder', (req, res) => {
    const { fname, address, date, pastry, paymentMethod } = req.body;

    console.log('Received order data:', { fname, address, date, pastry, paymentMethod });

    // Create a new order instance
    const newOrder = new Order({
      fname,
      address,
      date,
      pastry,
      paymentMethod
    });

    // Save the order to the database
    newOrder.save()
    .then(() => {
      console.log('Order saved successfully');
      res.status(200).send('Order saved successfully');
    })
    .catch(error => {
      console.error('Error saving order:', error);
      res.status(500).send('Error saving order');
    });

  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
