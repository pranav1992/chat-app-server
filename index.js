const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/connectDB");
const router = require("./routes/index");
var cookiesParser = require("cookie-parser");
const  { app, server } = require("./socket");

// const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookiesParser());

const PORT = process.env.PORT || 8080;

app.get("/", (request, response) => {
  response.json({ message: "server is runnig at" + PORT });
});
app.use("/api", router);

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log("Server is running and db is connected successfully" + PORT);
  });
});
