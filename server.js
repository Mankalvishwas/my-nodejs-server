const express=require('express');
const cors=require('cors');
const app=express();
const PORT=4000;
const mongoose=require('mongoose');
const lostItemsRoutes=require('./routes/lostItemRoutes');
app.use(cors());
app.use(express.json());

app.use('/api',lostItemsRoutes);
app.get('/',(req,res)=>{
    res.send('lost and found portal backedn is running ssucessfully');
});

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);   

});



mongoose.connect('mongodb+srv://mankalvishwas_db_user:qZpa4ROT0nRitDqX@lostandfound.1zr06aw.mongodb.net/lostandfound?appName=lostandfound');

mongoose.connection.on('connected', () => {
    console.log('connected to mongoDB');
});
mongoose.connection.on('error',(err)=>{
    console.log('error in DB connection',err);
});