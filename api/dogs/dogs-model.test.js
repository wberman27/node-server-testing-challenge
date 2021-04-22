const Dogs = require('./dogs-model')
const db = require('../../data/dbConfig')

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

it("correct env", ()=>{
    expect(process.env.DB_ENV).toBe("testing")
})

describe("dogs model", ()=>{
    describe("insert function", () =>{
        it("adds Dogs to database", async () =>{
            let all
            await Dogs.insert(olive)
            all = await db("dogs")
            expect(all).toHaveLength(1) //with new dog in db, length of dogs array should be 1

            await Dogs.insert(lisa)
            all = await db("dogs")
            expect(all).toHaveLength(2)
        })
        it("values of dogs", async ()=>{
            const dogs = await Dogs.insert(olive)
            expect(dogs).toMatchObject({id:1, ...olive}) //the dogs object should have this object format
        })
    })
    describe("update function", ()=>{
        it("updates the Dogs", async ()=>{
            // await db("dogs").insert(olive)
            // await db("dogs").insert(olive) still gives unique contraint error from sql
            const [id] = await db("dogs").insert(olive)
            await Dogs.update(id, {name:"Olive"})
            const updated = await db("dogs").where({id}).first()
            expect(updated.name).toBe("Olive")
        })
        it("check the updated Dogs", async ()=>{
            const [id] = await db("dogs").insert(olive)
            await Dogs.update(id, {name:"Olive"})
            const updated = await db("dogs").where({id}).first()
            expect(updated).toMatchObject({id:id, name:"Olive"})
        })
    })
})