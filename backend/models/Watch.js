const mongoose = require('mongoose');

const specSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true },
}, { _id: false });

const watchSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  collection:  { type: String, required: true },
  reference:   { type: String, required: true },
  tagline:     { type: String },
  description: { type: String },
  price:       { type: Number },
  currency:    { type: String, default: 'USD' },
  specs:       [specSchema],
  materials: {
    case:    { type: String },
    dial:    { type: String },
    bracelet:{ type: String },
    crystal: { type: String },
    caseback:{ type: String },
  },
  movement: {
    caliber:      { type: String },
    type:         { type: String },
    frequency:    { type: String },
    powerReserve: { type: String },
    jewels:       { type: Number },
    chronometer:  { type: Boolean, default: true },
  },
  dimensions: {
    diameter:  { type: String },
    thickness: { type: String },
    lugWidth:  { type: String },
    waterResistance: { type: String },
  },
  available: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Watch', watchSchema);
