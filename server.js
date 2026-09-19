const express = require("express");

const app = express();
app.use(express.json());

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`StockFlow server running on port ${PORT}`);
});

app.get("/", (req,res)=>{
    res.send("Welcome to StockFlowApi");
})

