const express = require('express');
const router = express.Router();
const LostItem = require('../models/LostItem');  // ← FIXED: Removed curly braces

// GET all lost items
router.get('/lostfound', async (req, res) => {
  try {
    const items = await LostItem.find();
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ 
      message: 'Error fetching items', 
      error: error.message 
    });
  }
});

// POST - Create new lost item
router.post('/lostfound', async (req, res) => {
  try {
    const newItem = new LostItem(req.body);
    await newItem.save();
    res.status(201).json({ message: 'Item reported!', item: newItem });
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(400).json({ 
      message: 'Error creating item', 
      error: error.message 
    });
  }
});

// GET single item by ID
router.get('/lostfound/:id', async (req, res) => {
  try {
    const item = await LostItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({ 
      message: 'Error fetching item', 
      error: error.message 
    });
  }
});

// PUT - Update item by ID
router.put('/lostfound/:id', async (req, res) => {
  try {
    const updatedItem = await LostItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item updated', item: updatedItem });
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(400).json({ 
      message: 'Error updating item', 
      error: error.message 
    });
  }
});

// DELETE item by ID
router.delete('/lostfound/:id', async (req, res) => {
  try {
    const deletedItem = await LostItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item deleted', item: deletedItem });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ 
      message: 'Error deleting item', 
      error: error.message 
    });
  }
});

module.exports = router;
