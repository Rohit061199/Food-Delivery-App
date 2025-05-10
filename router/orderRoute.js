const express=require('express');
require('dotenv').config()
const router=express.Router();
const stripeKey=process.env.STRIPE_SECRET_KEY
const stripe=require('stripe')(stripeKey);
const { v4: uuidv4 } = require('uuid');
const order=require('../models/orderModel')

router.post("/placeorder", async (req, res)=>{

    const {token, subTotal, currentUser, cartItems}=req.body;

    try{
        const customer=await stripe.customers.create({
            email: token.email,
            source: token.id
        });

        const payment=await stripe.charges.create({
            amount: subTotal * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email
        },{
            idempotencyKey: uuidv4()
        });

        //console.log(payment);

        let userId='123';

        if(currentUser.id!==null){
            userId=currentUser.id;

        }
        else{
            userId=currentUser._id;
        }

        if(payment){

            //console.log('Beginning saving order')

            const newOrder=new order({
                name: currentUser.name,
                email: currentUser.email,
                userId:userId,
                orderItems: cartItems,
                orderAmount: subTotal,
                shippingAddress: {
                    street: token.card.address_line1,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    pincode: token.card.address_zip 
                },
                transactionId: payment.source.id

            });

            //console.log(newOrder);

            await newOrder.save();

            //console.log('Order Saved')
            res.send('Order placed Successfully');
        }
        else{
            res.send('Payment Failed')
        }


    }catch(error){

        //console.log('Order Not saved');
        res.status(400).json({message: 'Something went wrong'+error});

    }


});

router.get('/getuserorders', async (req, res)=>{
    const {userId}=req.query;

    try{

        const orders=await order.find({
            userId: userId
        }).sort({_id: -1});

        res.send(orders)

    }catch(error){

        res.status(400).json({message: 'Something went wrong'})

    }
});

router.get('/getallorders', async (req, res)=>{
    

    try{

        const orders=await order.find({});

        res.send(orders)

    }catch(error){

        res.status(400).json({message: 'Something went wrong'})

    }
});

router.put('/deliverorder/:orderId', async (req, res)=>{
    

    try{

        const orderDB=await order.findById(req.params.orderId);

        orderDB.isDelivered=true;

        await orderDB.save();

        res.send('Order Updated Successfully')

    }catch(error){

        res.status(400).json({message: 'Something went wrong'})

    }
});

router.get('/getorderdetailsbyid/:orderId', async (req, res)=>{
    

    try{

        console.log(req.params.orderId)

        const orderFound=await order.findById(req.params.orderId);
        console.log(orderFound)

        res.send(orderFound)

    }catch(error){

        res.status(400).json({message: 'Something went wrong'})

    }
});

module.exports=router