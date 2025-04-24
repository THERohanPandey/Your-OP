const express = require("express");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

dotenv.config();
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "YOP";
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors());

client.connect();
console.log("Connected successfully to server");

//Get all the passwords
app.get("/", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

// save the passwords
app.post("/", async (req, res) => {
  const passwords = req.body;
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.insertOne(passwords);
  res.send({
    success: true,
    message: "Password saved successfully",
    data: findResult,
  });
});

// Delete the passwords
app.delete("/", async (req, res) => {
  const passwords = req.body;
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.deleteOne(passwords);
  res.send({
    success: true,
    message: "Password deleted successfully",
    data: findResult,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
