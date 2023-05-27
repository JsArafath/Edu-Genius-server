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
        ///users
        const usersCollection = client.db(process.env.DB).collection('users');
        const query = {};
        const cursor = usersCollection.find(query);
        const users = await cursor.toArray();
        res.send(users);
      })
    .post( async (req, res) => {
    const user = req.body;
     const usersCollection = client.db(process.env.DB).collection('users');
    const result = await usersCollection.insertOne(user);
    res.send(result);
  });

    router
      .route("/admin/:email")
      .get(async(req, res) => {
        ///users
        const email = req.params.email;
      const query = { email: email };
       const usersCollection = client.db(process.env.DB).collection('users');
      const user = await usersCollection.findOne(query);
      res.send({ isAdmin: user?.role === "admin" });
      })

    router
      .route("/seller/:email")
      .get(async(req, res) => {
        const email = req.params.email;
      const query = { email: email };
      const usersCollection = client.db(process.env.DB).collection('users');
      const user = await usersCollection.findOne(query);
      res.send({ isSeller: user?.role === "Teacher" });
      })

    router
      .route("/buyers/:email")
      .get(async(req, res) => {
        const email = req.params.email;
      const query = { email: email };
      const usersCollection = client.db(process.env.DB).collection('users');
      const user = await usersCollection.findOne(query);
      res.send({ isBuyer: user?.role === "Student" });
      })

    router
      .route("/allsellers")
      .get(async(req, res) => {
        const query = {};
      const usersCollection = client.db(process.env.DB).collection('users');
      const users = await usersCollection.find(query).toArray();
      const allsellers = users.filter((user) => user?.role === "Teacher");
      res.send(allsellers);
      })
    router
      .route("/allbuyers")
      .get(async(req, res) => {
      const query = {};
      const usersCollection = client.db(process.env.DB).collection('users');
      const users = await usersCollection.find(query).toArray();
      const allbuyers = users.filter((user) => user?.role === "Student");
      res.send(allbuyers);
      })

    router
      .route("/:id")
      .get(async(req, res) => {
        const id = req.params.id;
        const usersCollection = client.db(process.env.DB).collection('users');
        const query = {};
        const cursor = usersCollection.find(query);
        let blog = await cursor.toArray();
        blog = await blog.filter((blog) => blog._id == id);
        res.send(blog);
      })
      .post(async(req, res) => {
        const id = req.params.id;
        console.log(id);
        console.log(req.body);
        const query = { _id: ObjectId(id) };
        const usersCollection = client.db(process.env.DB).collection('users');
        let blog = await usersCollection.findOne(query);
        console.log(blog);      
        blog = {...blog, ...req.body};
        const result = await usersCollection.updateOne(
          { _id: ObjectId(id) },
          { $set: blog }
        );
        const newResult = await usersCollection.findOne(query);
        res.send(newResult);
      });
  }finally{

  }
}

run().catch(console.dir);

module.exports = router;