const mongoose=require('mongoose');
const companySchema=new mongoose.Schema({
company:{
    type:String,
    required:true,
    unique:true
},
location:{
    type:String,
    required:true,
},
description:{
    type:String,
    required:true
},
establishedOn:{
    type:String,
    required:true
},
website:{
    type:String,
   
},
social:{
    youtube:{
        type:String
    },twitter:{
        type:String
    },
    linkedin:{
        type:String
    },
    instagram:{
type:String
    }
},
offeringServices:{
    type:[String],
   required:true
},
intrestedIn:{
    type:[String],
    require:true
   
},
revenue:{
    type:String,

},
employees:{
    type:String
}


})

const Company=mongoose.model("company",companySchema);
module.exports=Company