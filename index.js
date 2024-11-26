const express = require('express');
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;






app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Simple crud is running')
})

const uri = "mongodb+srv://upworkabdurrahman:Jk2phanz5sTeHYKC@cluster0.2cslr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

    const database = client.db("usersDB");
    const usersCollection = database.collection("users");


    app.get('/users', async(req, res) =>{
      const cursor = usersCollection.find();
      const result = await cursor.toArray()
      res.send(result)

    })


    app.post('/users', async(req, res) => {
      const user = req.body;
      console.log('new user', user);
      const result = await usersCollection.insertOne(user);
      res.send(result)

    });

    // delete 

    app.delete('/users/:id', async(req, res) =>{
      const id = req.params.id;
      console.log('Please delete', id)
      const query = { _id: new ObjectId (id)};
      const result = await usersCollection.deleteOne(query);
      res.send(result)
    })


    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
}
run().catch(console.dir);






app.listen(port, () => {
  console.log(`Running the port ${port}`)
})
