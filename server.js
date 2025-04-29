const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

const router = require("./router");
app.use("/restaurant",router);


app.listen(3000,async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongooDB is connected ");
        console.log(`server is running on ${PORT}`);
    } catch (error) {
        console.log("Something went wrong",error);
    }

})