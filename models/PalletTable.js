const mongoose = require('mongoose');

const PalletTableSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  productionLine: {
    type: String,
    required: false,
  },
  processOrder: {
    type: Number,
    required: true,
  },
  skuCode: {
    type: String,
    required: true,
  },
  skuDesc: {
    type: String,
    required: true,
  },
  sut: {
    type: String,
    required: true,
  },
  transferOrder: {
    type: String,
    required: true,
  },
  palletQty: {
    type: String,
    required: false,
  },
  assignedTo: {
    type: String,
    
  },
  binNumber: {
    type: String,
  },
  digitCode: {
    type: String,
  },
  status: {
    type: String,
  },
  
binCapacity:{type:String},

});

module.exports = mongoose.model('PalletTable', PalletTableSchema);