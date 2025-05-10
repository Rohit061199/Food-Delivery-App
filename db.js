const mongoose=require("mongoose");
const Pizza = require("./models/pizzaModel");

var mongoURL='mongodb+srv://admin:admin@dbcluster.jfw1v.mongodb.net/delivery';

mongoose.connect(mongoURL, {useUnifiedTopology: true, useNewUrlParser:true});

var db=mongoose.connection

db.on('connected', async ()=>{
    console.log('Database connected successfully')

    try {
        const pizzas = await Pizza.find({}).lean();
        console.log("Fetched Pizzas:", pizzas);
    } catch (error) {
        console.error("Error fetching pizzas:", error);
    }

});

db.once("open", async () => {
    console.log("Database connected successfully");

    try {
        // List all collections in the database
        const collections = await db.db.listCollections().toArray();
        console.log("All Collections in the Database:", collections);
    } catch (error) {
        console.error("Error fetching collections:", error);
    }
});

db.once("open", async () => {
    console.log("Database connected successfully");

    try {
        // Fetch all records from the "pizzas" collection
        const pizzas = await Pizza.find({}).lean(); // Use .lean() to get plain JavaScript objects
        console.log("Number of Pizzas:", pizzas.length);
        console.log("All Pizzas in the Database:", pizzas);
}catch (error) {
    console.error("Error fetching data:", error);
}
}
);

db.on('error', ()=>{
    console.log("Db not connected")
});

module.exports=mongoose
