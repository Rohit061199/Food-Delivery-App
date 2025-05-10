const express=require("express");
const router=express.Router();
const Pizza=require("../models/pizzaModel")

router.get("/getallpizzas", async(req, res) =>{

    try{
        const pizzas=await Pizza.find({})
        res.send(pizzas);
    }catch(error){
        return res.status(400).json({message: error})
    }
});

router.get("/getpizzabyid/:pizzaId", async(req, res) =>{

    try{
        const pizzas=await Pizza.findById(req.params.pizzaId)
        res.send(pizzas);
    }catch(error){
        return res.status(400).json({message: error})
    }
});

router.post("/addpizza", async(req, res) =>{

    const pizza=req.body;

    try{
        const newPizza= new Pizza({
            name: pizza.name,
            image: pizza.image,
            description: pizza.description,
            category: pizza.category,
            prices: [pizza.prices],
            varients: ['small', 'medium', 'large']
        });

        await newPizza.save();
        res.send('Pizza Added Successfully');
    }catch(error){
        return res.status(400).json({message: 'Something went wrong'})
    }
});

router.put("/editpizza/:pizzaId", async(req, res) =>{

    const pizza=req.body;

    try{

        const pizzaDB=await Pizza.findById(req.params.pizzaId)
        pizzaDB.name=pizza.name;
        pizzaDB.prices= pizza.prices;
        pizzaDB.category=pizza.category;
        pizzaDB.description=pizza.description;
        pizzaDB.image=pizza.image

        await pizzaDB.save();
        res.send('Pizza Updated Successfully');
    }catch(error){
        return res.status(400).json({message: 'Something went wrong'})
    }
});

router.delete("/deletepizza/:pizzaId", async(req, res) =>{

    

    try{

        const pizzaDB=await Pizza.findByIdAndDelete(req.params.pizzaId)
        
        res.send('Pizza Deleted Successfully');
    }catch(error){
        return res.status(400).json({message: 'Something went wrong'})
    }
});

module.exports=router;

