// routes/doctor.js routing file
"use strict";
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

let router = express.Router();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.k6jd9d0.mongodb.net/${process.env.DB}`;

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
        ///courses
        const coursesCollection = client.db(process.env.DB).collection('courses');
        const query = {};
        const cursor = coursesCollection.find(query);
        const courses = await cursor.toArray();
        res.send(courses);
      })
      .post(async(req, res) => {
        const newCourse = req.body;
        console.log(newCourse);
        const coursesCollection = client.db(process.env.DB).collection('courses');
        const result = await coursesCollection.insertOne(newCourse);
        res.send(result);
      });

    router
      .route("/:id")
      .get(async(req, res) => {
        const id = req.params.id;
        const coursesCollection = client.db(process.env.DB).collection('courses');
        const query = {};
        const cursor = blogsCollection.find(query);
        let course = await cursor.toArray();
        course = await course.filter((course) => course._id == id);
        res.send(course);
      })
      .post(async(req, res) => {
        const id = req.params.id;
        console.log(id);
        console.log(req.body);
        const query = { _id: ObjectId(id) };
        const coursesCollection = client.db(process.env.DB).collection('courses');
        let course = await coursesCollection.findOne(query);
        console.log(course);      
        course = {...course, ...req.body};
        const result = await coursesCollection.updateOne(
          { _id: ObjectId(id) },
          { $set: course }
        );
        const newResult = await coursesCollection.findOne(query);
        res.send(newResult);
      });
  }finally{

  }
}

run().catch(console.dir);

module.exports = router;