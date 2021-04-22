const request = require('supertest')
const db = require('../data/dbConfig')
const server = require('./server')

const olive = {name:"Olive"}
const lisa = {name:"Lisa"}

beforeAll(async ()=>{
    await db.migrate.rollback() //destroy and rebuild table
    await db.migrate.latest()
})//only runs once, not for each test

beforeEach(async ()=>{
    await db("dogs").truncate() //gets rid of data in dogs table (table remains intact)
//Truncate is fast. deletes all rows. Delete can delete individual rows, but slower.
})
afterAll(async ()=>{
    await db.destroy() //just cuts off connection to db
    //do this for security, don't leave db door open
})

describe("server", ()=>{
    describe("[GET] /dogs", ()=>{
        it("responds with 200 ok", async ()=>{
            const res = await request(server).get("/dogs")
            // expect(res).toEqual({}) shows us what is returned(values) by res inside an error
            expect(res.status).toBe(200)
        })
        it("returns right number of dogs", async () =>{
            let res
            await db("dogs").insert(olive)
            res = await request(server).get("/dogs")
            expect(res.body).toHaveLength(1)
            
            await db("dogs").insert(lisa)
            res = await request(server).get("/dogs")
            expect(res.body).toHaveLength(2)
        })
        it("returns the right format for dogs", async ()=>{
            await db("dogs").insert(olive)
            await db("dogs").insert(lisa)
            const res = await request(server).get("/dogs")
            expect(res.body[0]).toMatchObject({id:1, ...olive})
            expect(res.body[1]).toMatchObject({id:2, ...lisa})
        })
    })
    describe("[POST] /dogs", ()=>{
        it("responds with newly created dog", async ()=>{
            let res
            res = await request(server).post("/dogs").send(olive)
            expect(res.body).toMatchObject({id:1, ...olive})
            
            res = await request(server).post("/dogs").send(lisa)
            expect(res.body).toMatchObject({id:2, ...lisa})
        })
    })
    describe("[DELETE] /dogs", ()=>{
        it("responds with deleted dog id", async ()=>{
            let res
            res = await request(server).delete("/dogs/1")
            expect(res.body).toEqual("Dog with id 1 removed.")
            
            res = await request(server).delete("/dogs/2")
            expect(res.body).toEqual("Dog with id 2 removed.")
        })
    })
})