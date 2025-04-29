const express = require("express");
const restaurantSchema = require("./schema");

const router = express.Router();

router.post("/postdata",async(req,res)=>{
    try {
        const {name,location,cuisine,rating,menu} = req.body;
        if(!name || !location || !cuisine || !rating || !menu){
            return res.status(400).send({msg:"Please provide required field "});
        }
        const Details = new restaurantSchema(req.body);
        await Details.save();
        return res.status(200).send(Details);
    } catch (error) {
        return res.status(500).send({msg:"Something went wrong",error:error.message})
    }
});

router.get("/getdata",async(req,res)=>{
    try {
        const restaurantData = await restaurantSchema.find();
        return res.status(200).send(restaurantData);
    } catch (error) {
        return res.status(500).json({msg:"Something went wrong",error:error.message})
    }
});

router.put("/deletedata",async(req,res)=>{
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).send({msg:"Please provide restaurant ID to update "});
        }
        const {name,location,cuisine,rating,price} = req.body;
        if(!name || !location || !cuisine || !rating || !price){
            return res.status(400).send({msg:"Please provide required field "});
        }
        const updateRestaurentData = await restaurantSchema.findByIdAndUpdate(id,{name,location,cuisine,rating,price});
        if(!updateRestaurentData){
            return res.status(404).send({msg:"Restaurant not found"})
        }
        return res.status(200).send({msg:"Data updated successfully",updateRestaurentData});
    } catch (error) {
        return res.status(500).send({msg:"Something went wrong",error:error.message});
    }
});

router.delete("/deletedata",async(req,res)=>{
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).send({msg:"Please provide restaurant ID to update "});
        }
        const deleteRestaurantData = await restaurantSchema.findByIdAndDelete(id);
        if(!deleteRestaurantData){
            return res.status(404).send({msg:"Restaurant not found"})
        }
        return res.status(200).send({msg:"Restaurent deleted successfully"});
    } catch (error) {
        return res.status(500).send({msg:"Something went wrong",error:error.message});
    }
});

module.exports = router;