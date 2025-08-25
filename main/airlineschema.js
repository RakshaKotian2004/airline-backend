const mongoose=require('mongoose')

const airlineSchema = new mongoose.Schema({
     name:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true
    },
    isAvailable:{
        type:Boolean,
        default:false
    },
    dailyFlights:{
        type:Number,
    }
});

module.exports = mongoose.model('Airlines', airlineSchema);
