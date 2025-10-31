const mongoose=require('mongoose');


const lostitemschema=new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    location:{type:String,required:true},
    dateLost:{type:Date,required:true},
    reporterName:{type:String,required:true},
    contactInfo:{type:String,unique:true,lowercase:true,required:true},
    isFound:{type:Boolean,default:false},
    createdAt:{type:Date,default:Date.now},
    role:{type:String ,enum:['admin','vendor','user'],default:'user'}
});
//create the model from the schema
const LostItem=mongoose.model('LostItem',lostitemschema);
//to use in user js we should export this mongoose 
module.exports=LostItem; 