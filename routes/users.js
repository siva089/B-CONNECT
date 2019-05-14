const express=require('express');
const router=express.Router();
const {check,validationResult}=require('express-validator/check');
const User=require('../models/register');
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const config=require('config')

router.post('/',[
    check("name","name is Required").not().isEmpty(),
    check("email","email is Required").isEmail(),
    check("password","please enter a valid password").isLength({min:8}),
    check("country","please provide your country").not().isEmpty()
],async(req,res)=>{
const errors=validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
}
const {name,email,password,country}=req.body;
try{
    let user=await User.findOne({email})
    if(user){
return res.status(400).json({errors:[{msg:"user already exists"}]})
    }
     user= new User({
        name,
        email,
        password,
        country
    })
    const salt=await bcrypt.genSalt(8);
    user.password=await bcrypt.hash(password,salt)
    await user.save()

    const payload={
        user:{
            id:user.id,
            country:user.country
            
        }
    }
    
    
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      {
        expiresIn: 360000
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
   
    
}
catch(e){
    res.status(500).json("server error")
}

})

module.exports=router