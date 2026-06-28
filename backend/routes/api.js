const express = require('express');
const router  = express.Router();
const Watch   = require('../models/Watch');

const FALLBACK = {
  _id: 'fallback-001',
  name: 'Imperion Chronographe',
  collection: 'Perpétuel',
  reference: 'Réf. A-52/001',
  tagline: 'Au-delà du Temps',
  description: 'The AURIENT Imperion Chronographe is the product of six decades of unrelenting horological pursuit. Every component — from the 18ct Everose gold bezel to the 31-jewel calibre — is crafted by hand, measured in microns, and certified by our master watchmakers in Geneva.',
  price: 42500, currency: 'USD',
  specs: [
    { label:'Calibre',          value:'A-52 Self-Winding' },
    { label:'Power Reserve',    value:'72 Hours' },
    { label:'Frequency',        value:'28,800 bph · 4 Hz' },
    { label:'Jewels',           value:'31 Rubies' },
    { label:'Diameter',         value:'40 mm' },
    { label:'Thickness',        value:'12.4 mm' },
    { label:'Lug Width',        value:'20 mm' },
    { label:'Water Resistance', value:'100 m · 330 ft' },
    { label:'Crystal',          value:'Sapphire, AR Coated' },
    { label:'Chronometer',      value:'COSC Certified' },
  ],
  materials: { case:'904L Oystersteel™ & 18ct Everose Gold', dial:'Black Lacquer — Sunray Finish', bracelet:'Integrated Oyster Bracelet — Folding Clasp', crystal:'Sapphire Crystal, AR Coating', caseback:'Solid Screwback' },
  movement: { caliber:'A-52', type:'Automatic, Perpétuel Rotor', frequency:'28,800 bph', powerReserve:'72 hours', jewels:31, chronometer:true },
  dimensions: { diameter:'40 mm', thickness:'12.4 mm', lugWidth:'20 mm', waterResistance:'100 m / 330 ft' },
  available: true,
};

router.get('/watch', async (req, res) => {
  try {
    const watch = await Watch.findOne({ available: true }).sort({ createdAt: -1 });
    res.json(watch || FALLBACK);
  } catch { res.json(FALLBACK); }
});

router.get('/watch/:id', async (req, res) => {
  try {
    const watch = await Watch.findById(req.params.id);
    if (!watch) return res.status(404).json({ error: 'Not found' });
    res.json(watch);
  } catch { res.status(500).json({ error: 'Server error' }); }
});

router.post('/enquiry', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Name and email required' });
  console.log('New AURIENT enquiry:', { name, email, message });
  res.json({ success: true, message: 'Your enquiry has been received. A specialist will contact you within 48 hours.' });
});

module.exports = router;
