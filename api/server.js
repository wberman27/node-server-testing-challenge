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
  Dogs.getById(req.params.id)
  .then(dog =>{
    res.status(200).json(dog)
  })
  .catch(err =>{
    res.status(404).json(`Could not find dog with id ${req.params.id}`)
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
  Dogs.remove(req.params.id)
  .then(dog =>{
    res.status(201).json(`Dog with id ${req.params.id} removed.`)
  })
  .catch(err =>{
    res.status(404).json(`Dog not found with id:${req.params.id}.`)
  })
});

server.put("/dogs/:id", (req, res) => {
  Dogs.update(req.params.id, req.body) //would return 1, for one updated dog successful
  .then(() =>{
    return Dogs.getById(req.params.id) //can do in dogs-model instead
  })
  .then(updatedDog =>{
    res.status(201).json(updatedDog[0]) //return the updated dog object
  })
  .catch(err =>{
    res.status(500).json(err)
  })
});

module.exports = server;
