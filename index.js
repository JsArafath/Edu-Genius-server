// express configurations 
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

// Routes Import 
const courses = require("./routes/courses");
const blogs = require("./routes/blogs");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// Route endpoints 
app.use("/courses", courses);
app.use("/blogs", blogs);

// Server Starting 
app.get("/", (req, res) => {
  res.send("Running EduGenius Server");
});

app.listen(port, () => {
  console.log("Listening to port", port);
})