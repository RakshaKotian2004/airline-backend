const express=require('express');
const app=express();
app.use(express.json());

const detail=require('./routers/router');
app.use('/',detail);

const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://kotianraksha2468:pZkikvFVxWZQOfrw@cluster.qjmqrjm.mongodb.net/APIDBex?retryWrites=true&w=majority&appName=Cluster")
  .then(() => console.log("MongoDB Connected "))
  .catch(err => console.error("Connection error ", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
