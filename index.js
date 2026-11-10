import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import { MongoClient } from 'mongodb';

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(cors());

const client = new MongoClient(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vhjs3vs.mongodb.net/`);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

const connectedClient = await connectToMongoDB();
 // Get the database and collection on which to run the operation
const database = connectedClient.db("hireloopdb");
const users = database.collection("user");
const jobs = database.collection("job");



app.get('/', (req, res) => {
  res.send('Hire loop server is running');
});

app.get('/users', async (req, res) => {
    const cursor = users.find({});
    const result = await cursor.toArray();
    res.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});