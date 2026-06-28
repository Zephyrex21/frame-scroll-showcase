const mongoose = require('mongoose');
const Watch = require('../models/Watch');
require('dotenv').config();

const seedData = {
  name: 'Tempus Chronographe',
  collection: 'Perpetual',
  reference: 'Ref. H-47/001',
  tagline: 'Where Time Becomes Art',
  description:
    'The HALCYON Tempus Chronographe is the product of six decades of unrelenting horological pursuit. Every component — from the 18ct Everose gold bezel to the 31-jewel calibre — is crafted by hand, measured in microns, and certified by our master watchmakers in Geneva.',
  price: 38500,
  currency: 'USD',
  specs: [
    { label: 'Calibre',          value: 'H-47 Self-Winding' },
    { label: 'Power Reserve',    value: '72 Hours' },
    { label: 'Frequency',        value: '28,800 bph · 4 Hz' },
    { label: 'Jewels',           value: '31 Rubies' },
    { label: 'Diameter',         value: '40 mm' },
    { label: 'Thickness',        value: '12.4 mm' },
    { label: 'Lug Width',        value: '20 mm' },
    { label: 'Water Resistance', value: '100 m · 330 ft' },
    { label: 'Crystal',          value: 'Sapphire, AR Coated' },
    { label: 'Chronometer',      value: 'COSC Certified' },
  ],
  materials: {
    case:     '904L Oystersteel™ & 18ct Everose Gold',
    dial:     'Black Lacquer — Sunray Finish',
    bracelet: 'Integrated Oyster Bracelet — Folding Clasp',
    crystal:  'Sapphire Crystal, Scratch-Resistant, AR Coating',
    caseback: 'Solid Screwback',
  },
  movement: {
    caliber:      'H-47',
    type:         'Automatic, Perpetual Rotor',
    frequency:    '28,800 bph',
    powerReserve: '72 hours',
    jewels:       31,
    chronometer:  true,
  },
  dimensions: {
    diameter:        '40 mm',
    thickness:       '12.4 mm',
    lugWidth:        '20 mm',
    waterResistance: '100 m / 330 ft',
  },
  available: true,
};

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  await Watch.deleteMany({});
  await Watch.create(seedData);
  console.log('✓ Watch seeded to MongoDB');
  await mongoose.disconnect();
}

seed().catch(console.error);
