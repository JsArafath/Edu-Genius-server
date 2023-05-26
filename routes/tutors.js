// routes/doctor.js routing file
"use strict";
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

let router = express.Router();


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lx750.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

router.use(function(req, res, next) {
  console.log(req.url, "@", Date.now());
  next();
});

async function run(){
  try{
    await client.connect();
    router
      .route("/")
      .get(async(req, res) => {
        ///tutors
        const tutorsCollection = client.db(process.env.DB).collection('tutors');
        const query = {};
        const cursor = tutorsCollection.find(query);
        const tutors = await cursor.toArray();
        res.send(tutors);
      })
      .post(async(req, res) => {
        const newtutor = req.body;
        console.log(newtutor);
        const tutorsCollection = client.db(process.env.DB).collection('tutors');
        const result = await tutorsCollection.insertOne(newtutor);
        res.send(result);
      });

    router
      .route("/:id")
      .get(async(req, res) => {
        const id = req.params.id;
        const tutorsCollection = client.db(process.env.DB).collection('tutors');
        const query = {};
        const cursor = tutorsCollection.find(query);
        let tutor = await cursor.toArray();
        tutor = await tutor.filter((tutor) => tutor._id == id);
        res.send(tutor);
      })
      .post(async(req, res) => {
        const id = req.params.id;
        console.log(id);
        console.log(req.body);
        const query = { _id: ObjectId(id) };
        const tutorsCollection = client.db(process.env.DB).collection('tutors');
        let tutor = await tutorsCollection.findOne(query);
        console.log(tutor);      
        tutor = {...tutor, ...req.body};
        const result = await tutorsCollection.updateOne(
          { _id: ObjectId(id) },
          { $set: tutor }
        );
        const newResult = await tutorsCollection.findOne(query);
        res.send(newResult);
      });
  }finally{

  }
}

run().catch(console.dir);

module.exports = router;