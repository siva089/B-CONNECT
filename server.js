const express=require('express');
const app=express();
const cors=require('cors');
const path=require("path")
//routes
const users=require('./routes/users')
const auth=require('./routes/auth');
const company=require('./routes/company')
//database
require("./config/db")
const port=process.env.PORT ||5000;
app.use(express.json());
app.use(cors());
//Router configuration
app.use("/api/users",users)
app.use("/api/auth",auth);
app.use("/api/company",company)

//serve static assets
if(process.env.NODE_ENV==='production'){
  app.use(express.static('client/build'))
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
