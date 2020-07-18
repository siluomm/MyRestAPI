require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const subscriberrouter = require('./routes/subscriber');
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true,useUnifiedTopology:true });
const db = mongoose.connection;
db.on('error',(error) => {
console.error();
});
db.once('open',() => {
  console.log("Mongo DB connection is successful");  
});
app.use(express.json());
app.use('/subscriber',subscriberrouter);
app.listen(3000, () => {
console.log("Server is connected on port 3000 in my local computer");
})