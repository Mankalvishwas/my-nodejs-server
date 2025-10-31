const express = require('express');
const router = express.Router();
const {LostItem}=require('../models/lostItem');
const { v4: uuidv4 } = require('uuid');



router.get('/lostfound', async (req, res) => {
  const items = await LostItem.find();
  res.json(items);
});

router.post('/lostfound', async (req, res) => {
  const newItem = new LostItem(req.body);
  await newItem.save();
  res.status(201).json({ message: 'Item reported!', item: newItem });
});


router.post('/lostfound', (req,res) => {
    const newItem = { ...req.body, id: uuidv4() };
    items.push(newItem);
    res.status(201).json({message:'item reported!',newItem});
});

router.delete('/lostfound/:index', (req,res) => {
    const index = parseInt(req.params.index);
    if(isNaN(index) || index < 0 || index >= items.length) {
        return res.status(400).json({message:'invalid not found'});
    }
    const removed=items.splice(index,1);
    res.json({message:'Item deleted',item:removed[0]});
});

router.put('/lostfound/:index', (req,res)=> {
    const index=parseInt(req.params.index);
    if(isNaN(index) || index<0 || index>=items.length) {
        return res.status(404).json({ message:'invalied index'});
    }
    items[index]=req.body;
    res.json({message:'item is updated',item:items[index]});
});
// single get for specified index
router.get('/lostfound/:index',(req,res)=>{
    const index=parseInt(req.params.id);
    if (isNaN(index) || index<0 || index>=items.length) {
        return res.status(404).json({message:'invalid index placed'});
    }
    res.json(items[index]);
});
module.exports = router;    
