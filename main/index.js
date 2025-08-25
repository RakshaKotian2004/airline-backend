const express=require('express');
const app=express();
app.use(express.json());

const detail=require('./routers/router');
app.use('/',detail);

const mongoose=require('mongoose');
const url='mongodb://localhost/APIDBex'

mongoose.connect(url)
const con=mongoose.connection;

con.on('open',()=>{
    console.log('connected..');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
