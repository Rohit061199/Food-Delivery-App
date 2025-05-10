const express= require("express")
const db=require("./db")

const Pizza=require("./models/pizzaModel")
const app=express();




app.use(express.json());

const pizzasRoute=require("./router/pizzaRoute");
const userRoute=require("./router/userRoute");
const orderRoute=require("./router/orderRoute")

app.use('/api/pizzas/', pizzasRoute);
app.use('/api/users/', userRoute);
app.use('/api/orders/', orderRoute);

app.get("/", (req,res) => {
    res.send("Server Working!");
});

app.get("/getpizzas", async (req, res) => {
    try {
        const pizzas = await Pizza.find({}); // Use await instead of a callback
        console.log(pizzas)
        res.send(pizzas);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error fetching pizzas" });
    }
});


const port =process.env.PORT || 8000;

app.listen(port, () => `Server running on port port`);