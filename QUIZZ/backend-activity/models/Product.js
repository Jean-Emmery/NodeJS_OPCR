const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
});

module.exports = mongoose.model('Product', productSchema);

// img https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg