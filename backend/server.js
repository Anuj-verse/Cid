const express = require("express");
const cors = require("cors");

const acpDialogs = require("./ACP_Pradyuman");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to CID!");
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});