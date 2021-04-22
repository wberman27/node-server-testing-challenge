const express = require("express");
const Dogs = require('./dogs/dogs-model');

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "hello, the api is up and running" });
});

server.get("/dogs", (req, res) => {
  Dogs.getAll()
    .then(dogs => {
      res.status(200).json(dogs);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.get("/dogs/:id", (req, res) => {
  Dogs.getById(id)
  .then(dog =>{
    res.status(200).json(dog)
  })
  .catch(err =>{
    res.status(404).json(`Could not find dog with id ${id}`)
  })
});

server.post("/dogs", (req, res) => {
  Dogs.insert(req.body)
  .then(dog =>{
    res.status(200).json(dog);
  })
  .catch(err =>{
    res.status(500).json(err)
  })
});

server.delete("/dogs/:id", (req, res) => {
  Dogs.remove(id)
  .then(dog =>{
    res.status(201).json(`Dog with id ${id} removed.`)
  })
  .catch(err =>{
    res.status(404).json(`Dog not found with id:${id}.`)
  })
});

server.put("/dogs/:id", (req, res) => {
  Dogs.update(id, req.body)
  .then(updatedDog =>{
    res.status(201).json(updatedDog)
  })
  .catch(err =>{
    res.status(500).json(err)
  })
});

module.exports = server;
