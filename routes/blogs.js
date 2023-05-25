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
        ///blogs
        const blogsCollection = client.db(process.env.DB).collection('blogs');
        const query = {};
        const cursor = blogsCollection.find(query);
        const blogs = await cursor.toArray();
        res.send(blogs);
      })
      .post(async(req, res) => {
        const newblog = req.body;
        console.log(newblog);
        const blogsCollection = client.db(process.env.DB).collection('blogs');
        const result = await blogsCollection.insertOne(newblog);
        res.send(result);
      });

    router
      .route("/:id")
      .get(async(req, res) => {
        const id = req.params.id;
        const blogsCollection = client.db(process.env.DB).collection('blogs');
        const query = {};
        const cursor = blogsCollection.find(query);
        let blog = await cursor.toArray();
        blog = await blog.filter((blog) => blog._id == id);
        res.send(blog);
      })
      .post(async(req, res) => {
        const id = req.params.id;
        console.log(id);
        console.log(req.body);
        const query = { _id: ObjectId(id) };
        const blogsCollection = client.db(process.env.DB).collection('blogs');
        let blog = await blogsCollection.findOne(query);
        console.log(blog);      
        blog = {...blog, ...req.body};
        const result = await blogsCollection.updateOne(
          { _id: ObjectId(id) },
          { $set: blog }
        );
        const newResult = await blogsCollection.findOne(query);
        res.send(newResult);
      });
  }finally{

  }
}

run().catch(console.dir);

module.exports = router;