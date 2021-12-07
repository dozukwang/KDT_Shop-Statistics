const express = require("express");

const NaverRouter = require("./routes/naver");

const app = express();

app.use("/", NaverRouter);

// const port = process.env.PORT || "5001";
// app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
