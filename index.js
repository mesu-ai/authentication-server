const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.port || 5000;

// middlewire
app.use(cors());
app.use(express.json());

const { query } = require('express');
const uri =
	'mongodb+srv://authenticationDB:0vhLrCZWczLL3RMs@cluster0.mtxga.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});

async function run() {
	try {
		await client.connect();
		const database = client.db('authenticate');
		const usersCollection = database.collection('users');

		app.get('/user', async (req, res) => {
			const email = req.query.email;
			const password = req.query.password;
			console.log(email,password);
      console.log(req.body);
			if (email) {
				const query = { email: email };
				const result = await usersCollection.findOne(query);
				console.log(result);
				res.send(result);
			}
			else{
			  const result = await usersCollection.find({}).toArray();
        res.send(result);
        

			}
		});

		app.post('/user', async (req, res) => {
      const cursor = req.body;
      console.log(cursor);
			const result = await usersCollection.insertOne(cursor);
			res.json(result);
		});

		console.log('connect to db');
		console.log('Connected successfully to server');
	} finally {
		//  await client.close();
	}
}
run().catch(console.dir);

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
