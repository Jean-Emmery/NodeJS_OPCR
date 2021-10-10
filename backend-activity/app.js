const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Product = require('./models/Product');


mongoose.connect('mongodb+srv://root:root@cluster0.mwhml.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());

app.get('/api/products', (req, res, next) =>{
    Product.find()
    .then(products => res.status(200).json({ products }))
    .catch(error => res.status(400).json({ error }));
});

app.get('/api/products/:id', (req, res, next) => {
    Product.findOne({ _id: req.params.id })
    .then(product => res.status(200).json({ product }))
    .catch(error => res.status(404).json({ error }));
});

app.post('/api/products', (req, res, next) =>{
    delete req.body.__v;
    const product = new Product({
        name: 'Mon premier produit',
        description: 'produit normal',
        price: '12',
        inStock: false
    });
    product.save()
    .then(product => res.status(201).json({ product}))
    .catch(error => res.status(400).json({ error }));
  });

  app.put('/api/products/:id', (req, res, next) => {
    Product.updateOne({ _id: req.params.id }, {
      name: 'Mon deuxieme produit',
      description: 'produit petit',
      price: '10',
      inStock: 'false', _id: req.params.id })
    .then(product => res.status(200).json({ message: 'Modified!' }))
    .catch(error => res.status(404).json({ error }));
    });

app.delete('/api/products/:id', (req, res, next) => {
  Product.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Deleted!' }))
    .catch(error => res.status(404).json({ error }))
});

module.exports = app;