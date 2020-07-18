const express = require('express');
const router = express.Router();
const subscribermodel = require('../models/subscribermodel');
console.log('inside subscriber');
router.get('/',async(req,res) =>
{
    try{
        const subscribers = await subscribermodel.find();
        res.send(subscribers);
    }
    catch(er)
    {
        res.status(500).json({message:er.message});
    }

}
);


router.get('/:id',getsubscriber, (req,res) =>
{
res.send(res.subscriberdetail);
}
);


router.post('/',async (req,res) =>
{
    console.log(req.body.name);
    const subscriber = new subscribermodel(
        {
            name:req.body.name,
            subscribertochannel:req.body.subscribertochannel
        }
    );

    try
    {
        const newsubscriber =await subscriber.save();
        res.status(201).json(newsubscriber);

    }
    catch(err)
    {
        res.status(400).json({message:err.message});
    }
}
);

router.patch('/:id',getsubscriber, async (req,res) =>
{

    res.subscriberdetail.name = req.body.name;
    res.subscriberdetail.subscribertochannel = req.body.subscribertochannel;

    try {
        const updatesubscriber =await  res.subscriberdetail.save();
        res.status(200).json({message:'updated succesfully'});
    } catch (error) {
        res.status(500).json({message:error.message});
    }


}
);

router.delete('/:id',getsubscriber,async (req,res) =>
{
try {
 await res.subscriberdetail.remove();
 res.json({message:'deleted subscuber'});
} catch (error) {
    res.status(500).json({message:error.message});
}
}
);

async function getsubscriber(req,res,next)
{
    let subscriberdetail
   
    try {
        subscriberdetail =await subscribermodel.findById(req.params.id);
    } catch (error) {
       return res.status(500).json({message:error.message});
    }
    res.subscriberdetail = subscriberdetail;
    next();
}
module.exports = router;