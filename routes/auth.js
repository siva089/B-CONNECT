const express = require("express");
const router = express.Router();
const auth=require('../middleware/auth')

const { check, validationResult } = require("express-validator/check");
const User=require("../models/register")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");


router.get("/",auth,async(req,res)=>{
    try{
const user= await User.findById(req.user.id);
res.json(user)
    }
catch(e){
    console.log(e);
    
    res.status(500).json("server error")
}

})

router.post(
  "/",
  [
    check("email", "email is required").isEmail(),
    check("password", "password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {  email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "invalid credentials" }] });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        res.status(400).json({ errors: [{ msg: "invalid credentials" }] });

      const payload = {
        user: {
          id: user.id,
          country:user.country
         
        }
      };
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
    } catch (e) {
      res.status(500).json("server error");
    }
  }
);

module.exports = router;
