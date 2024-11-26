const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Transaction = require('./models/transaction.js');
const { default: mongoose } = require('mongoose');
const app = express();

const port = 4001;

app.use(cors());
app.use(express.json());
app.get('/api/test', (req, res) => {
    res.send({ message: 'Test ok' });
});

app.post('/api/transaction', async (req, res) => {
  const { name, description, datetime, price } = req.body; 
  await mongoose.connect(process.env.MONGO_URL);
  console.log('Name:', name);
  console.log('Description:', description);
  console.log('Date:', datetime);
  const transaction = await Transaction.create({name,description,datetime, price});
  console.log('Transaction Created:', transaction);
  res.json(transaction); 
});


  app.get('/api/transactions', async (req, res)=>{
    await mongoose.connect(process.env.MONGO_URL);
    const transactions =await Transaction.find();
    res.json(transactions);
  }); 
  

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
