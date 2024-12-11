import mongoose from "mongoose";
import express from "express";

const tasks = [
  {
    id: 1,
    task: "Event App Banana hai",
    completed: false,
  },
  {
    id: 2,
    task: "Eccomerce Web Banana hai",
    completed: true,
  },
  {
    id: 3,
    task: "Concept samjhna hai",
    completed: true,
  },
];

const app = express();
const PORT = 7000;
// Q # 1
function middlewareOne(req, res, next) {
  console.log("Path =>", req.hostname + ":" + PORT + req.url);
  console.log("Protocol =>", req.protocol);

  next();
}
// app.use(middlewareOne);

app.get("/", (req, res) => {
  console.log("I am Home page...");
  res.send("Hello World, This is my home page....");
});

// app.get("/api", (req, res) => {
//   const querry = req.query;
//   console.log("Querry => ", querry);
//   res.send("API route is called...");
// });

// app.get("/:id", (req, res) => {
//   res.send(`Id is ${req.params.id}`);
// });

app.listen(PORT, () => console.log(`Server is listening at PORT : ${PORT}`));

// __________Params________
// 1 : Dynamic route
// 2 : Part of URL (iske bagair api complete/call nahi hoti)
app.get("/singletask/:id", (req, res) => {
  const task = tasks.find((data) => data.id == req.params.id);
  if (!task) return res.status(404).send("Task Not Found.......");
  else res.status(200).send(task);
});

// _________QuerrY_______
// 1 : Querry Url mein "?"  k baad lagti hai like "localhost:3000/student?attended=yes"
// 2 : Agar Querry nahi dein gai to bhi Url chale ga
// 3 : Bina Querry k Wo saare item le aaye ga
app.get("/task", (req, res) => {
  console.log("req.query => ", req.query);
  const { completed } = req.query;
  let filter = tasks;
  if (completed)
    filter = tasks.filter((data) =>
      completed == "true" ? data.completed == true : data.completed == "false"
    );
  res.status(200).send(filter);
});
