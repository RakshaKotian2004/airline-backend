const express=require('express');
const router=express.Router();
const Airlines=require('../airlineschema');



//Get-Random airline

router.get('/airline',async(req,res)=>{
    try{
      const airlines=await Airlines.find();
      const Airline = Math.floor(Math.random() * airlines.length);
      const airline=airlines[Airline];
    res.send(airline);

  } catch (err) {
    res.status(500).send('Error');
    }
});





//Get-allairlines,code,shuffle,limit,responseType

router.get('/airlines',async(req,res)=>{
   try {
    let result;   
    const {code,limit,shuffle,responseType} = req.query;

   //Get-all airlines
    if (!code && !limit && !shuffle && !responseType) {
      const airlines = await Airlines.find();
      return res.send(airlines);
    }
  
    //Get-By code
    if (code) {
      result = await Airlines.findOne({ code:code });
      if (!result) {
        return res.status(400).send("Invalid code value");
      }
      return res.send(result);
    
    } 

  //Get-shuffle and limit

   if (shuffle || limit) {
      let result = await Airlines.find();
      if (shuffle === 'true') {
       result= result.sort(() => Math.random() - 0.5);
      }
      if (limit) {
        result = result.slice(0, limit);
      }
    return res.send(result);
    }

    //Get-ResponseType
  
  if (responseType === 'array') {
      const airlines = await Airlines.find();
      result = airlines;

    } else if (responseType === 'object') {
      const airlines = await Airlines.find();
      result = {};
      airlines.forEach(airline => {
        result[airline.id.toString()] = airline; 
      });

    } else if (responseType === 'map') {
      const airlines = await Airlines.find();
      const airlinesMap = new Map();
      airlines.forEach(airline => {airlinesMap.set(airline.code, airline)});
      result = Object.fromEntries(airlinesMap);

    } else {
      return res.status(400).send("Invalid responseType");
    }

    res.send(result);
  } catch (err) {
    res.status(500).send("Error");
  }
});





//post-to post a new Airline

router.post('/airline',async(req,res)=>{
  try{
 const airline=new Airlines ({
      name:req.body.name,
     code:req.body.code, 
      isAvailable:req.body.isAvailable,
      dailyFlights:req.body.dailyFlights
     });

     const Name = await Airlines.exists({ name: req.body.name });
    if (Name) {
      return res.status(400).send(" Airline with this name already exists");
    }

    const Code = await Airlines.exists({ code: req.body.code });
    if (Code) {
      return res.status(400).send(" Airline with this code already exists");
    }

    const { name, code } = req.body;

    if (!name) {
      return res.status(400).send(" 'name' field is required");
    }
    if (!code) {
      return res.status(400).send(" 'code' field is required");
    }
     const a1=await airline.save() ;
          res.send(airline);
    }catch(err){
       res.send('Error')
    }
   });

   
   
   
   
   //Get-By Id
    router.get('/airline/:id',async(req,res)=>{
      const {id}=req.params;
      try{
              const airline = await Airlines.findById(req.params.id)
              res.send(airline)
       }catch(err){
        res.send('Error')
       }
    });

    
    
    
    
    
    //Get-By Name
     router.get('/airlines/:name',async(req,res)=>{
     const {name}=req.params;
      try{
        const result = await Airlines.findOne({name:name}); 
         res.send(result);
       }catch(err){
        res.send('Error');
       }
    });
  

module.exports=router;