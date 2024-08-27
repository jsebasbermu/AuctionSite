const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas
mongoose.connect('mongodb+srv://jsbermudez1997:T_TP_.Ps%25GSbp2z@auctionweb.ycj8c.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});

// Modelo de Producto
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  minOffer: Number,
  currentBid: Number,
  bidHistory: [{
    name: String,
    bid: Number,
    date: { type: Date, default: Date.now }
  }]
});

const Product = mongoose.model('Product', productSchema);

// Rutas
app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post('/api/products', async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

app.post('/api/products/:id/bid', async (req, res) => {
  const product = await Product.findById(req.params.id);
  const { bid, name } = req.body;

  if (bid > product.currentBid) {
    product.currentBid = bid;
    product.bidHistory.push({ name, bid });
    await product.save();
    res.json(product);
  } else {
    res.status(400).json({ message: 'Bid must be higher than current bid' });
  }
});

// Initialize the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

