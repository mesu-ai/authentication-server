const express = require('express');
const app = express();
const cors=require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.port || 3000;

// middlewire
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://authenticationDB:0vhLrCZWczLL3RMs@cluster0.mtxga.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

async function run() {
  try {
    
    await client.connect();
    const database = client.db("authenticate");
    const userCollection = database.collection("user");
   

    console.log('connect to db');
    console.log("Connected successfully to server");


  } finally {
   
  //  await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})