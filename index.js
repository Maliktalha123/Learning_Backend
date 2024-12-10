import mongoose from "mongoose";
import express from "express";

const app = express();
const PORT = 7000;


function middlewareOne(req, res, next) {
  console.log("Path =>", req.hostname + ":" + PORT + req.url);
  console.log("Protocol =>", req.protocol);

  next();
}
app.use(middlewareOne)
app.get("/", middlewareOne, (req, res) => {
  console.log("I am Home page...");
  res.send("Hello World, This is my home page....");
});

app.get("/api", (req, res) => {
  const querry = req.query;
  console.log("Querry => ", querry);
  res.send("API route is called...");
});

app.get("/:id", (req, res) => {
  res.send(`Id is ${req.params.id}`);
});

app.listen(PORT, () => console.log(`Server is listening at PORT : ${PORT}`));
