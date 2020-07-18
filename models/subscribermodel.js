const mongoose = require('mongoose');
const subscriberschema =  new mongoose.Schema(
    {
        name: 
        {
            type:String,
            required:true
        },
        subscribertochannel:
        {
            type:String,
            required:true
        },
        subscribeDate:
        {
            type:Date,
            default:Date.now
        }
    }
);
module.exports = mongoose.model('SubscribeModel',subscriberschema);