const express = require('express')
const cors = require('cors');
// const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express()
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// middleware 
app.use(cors());
app.use(express.json()); 

// mongodb uri connection 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lx750.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      // database & collections 
      const database = client.db("MarriageCenter");
         const testCollection = database.collection("test");
      console.log('Database Connection Successful');

      app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
})
    } 
    catch(err) {
      console.log('There is an error Occured', err);
    }
    finally {   
    }
  }
  run()
  .catch(console.dir);
