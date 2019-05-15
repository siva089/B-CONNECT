const mongoose=require('mongoose');
const userData= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    regarding:{
        type:String,
        required:true
    },
    textarea:{
        type:String,
        required:true
    }
})
const UserData=mongoose.model("UserData",userData)

module.exports=UserData