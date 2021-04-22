const db = require('../../data/dbConfig')

function getAll() {
    return db("dogs")
}

function getById(id) {
    return db("dogs").where({id})
}

async function insert(dog) {
    const [id] = await db("dogs").insert(dog)
    return db("dogs").where({id}).first() //or ("id", id)
}

async function update(id, changes) {
    return db("dogs").update(changes).where({id})
}

async function remove(id) {
    return db("dogs").where({id}).delete()
}

module.exports = {
  insert,
  update,
  remove,
  getAll,
  getById
}