const express = require("express");
const Dogs = require("./dogs/dogs-model.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/dogs", (req, res) => {
  Dogs.getAll()
    .then(dogs => {
      res.status(200).json(dogs);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.get("/dogs/id", (req, res) => {
  res.end()
});

server.post("/dogs", (req, res) => {
  Dogs.insert(req.body)
  .then(dog =>{
    res.status(200).json(dog);
  })
  .catch(error =>{
    res.status(500).json(error)
  })
});

server.delete("/dogs/:id", (req, res) => {
  res.end()
});

server.put("/dogs/:id", (req, res) => {
  res.end()
});

module.exports = server;
