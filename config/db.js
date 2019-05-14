const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongouri");
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("Database connected");
  });
