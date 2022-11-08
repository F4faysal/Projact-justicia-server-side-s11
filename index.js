const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = 5000;

const service = require('./data/service.json')



const uri = `mongodb+srv://${process.env.USER_NAME}:${DATA_PASSWORD}@cluster0.0t7ovhi.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


//medilware
app.use(cors());
app.use(express.json());





app.get("/", (req, res) => {
  console.log(process.env.NAME_user);
  res.send("Hello World!");
});

app.get('/service', (req, res) => {
  res.send(service)
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
