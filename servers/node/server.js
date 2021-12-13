const express = require("express");

const NaverRouter = require("./routes/naver");
const PurchaseRouter = require("./routes/purchase");

const app = express();

//Cors
const cors = require('cors');
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "DELETE", "PUT"]
}
app.use(cors(corsOptions));

app.use("/", NaverRouter);
app.use("/purchase", PurchaseRouter);

// const port = process.env.PORT || "5001";
// app.listen(port, () => console.log(`Listening on port 5001`));

module.exports = app;
