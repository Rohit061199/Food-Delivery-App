const express=require("express");

const router=express.Router();
const User=require('../models/userModel')


router.post('/register', async (req,res)=>{

    const {name, email, password, phoneNumber}=req.body;

    const newUser=new User({name, email, password, phoneNumber});
    try{
        await newUser.save();
        res.send('User registered successfully')
    }catch(error){
        return res.status(400).json({message: error})
    }
});

router.post('/login', async (req,res)=>{

    const {email, password}=req.body;

    
    try{
        const user= await User.find({email, password});
        if(user.length>0){
            const currentUser ={
                name: user[0].name,
                email: user[0].email,
                isAdmin: user[0].isAdmin,
                phoneNumber: user[0].phoneNumber,
                _id:user[0]._id
            }
            res.send(currentUser);
        }
        else{
            return res.status(402).json({message: 'User Login Failed'})
        }
    }catch(error){
        return res.status(400).json({message: error})
    }
});

router.get('/getallusers', async (req, res)=>{

    try{
        const users=await User.find({});

        res.send(users)
    }catch(error){
        res.status(400).json({message:'Something went Worng'})
    }
});

router.delete('/deleteuser/:userId', async (req, res)=>{

    try{
        const users=await User.findByIdAndDelete(req.params.userId);

        res.send('User deleted Successfully')
    }catch(error){
        res.status(400).json({message:'Something went Wrong'})
    }
});

module.exports=router