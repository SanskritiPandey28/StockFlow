require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");



const app = express();
app.use(express.json());


const PORT = process.env.PORT || 5000;
connectDB();


app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
  console.log(`StockFlow server running on port ${PORT}`);
});

app.get("/", (req,res)=>{
    res.send("Welcome to StockFlowApi");
})

