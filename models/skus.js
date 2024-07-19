const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
const skuSchema = new Schema({
  value: { type: String, required: true },
  description: { type: String, required: true }
});

// Create the model
const Sku = mongoose.model('Sku', skuSchema);

module.exports = Sku;  // Export the model


