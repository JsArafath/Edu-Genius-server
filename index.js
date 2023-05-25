const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;
const blogs = require("./routes/blogs");
const courses = require("./routes/courses");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

//use the doctor.js file to 
//endpoints that start with /doctors

app.use("/blogs", blogs);
app.use("/courses", courses);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.k6jd9d0.mongodb.net/${process.env.DB}`;

console.log(uri);

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
  

} catch (error) {
    res.send(error);
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Running EduGenius Server");
});

app.get("/hero", (req, res) => {
  res.send("Hero meets hero ku");
});

app.listen(port, () => {
  console.log("Listening to port", port);
})