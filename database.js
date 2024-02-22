const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://yosbendavid:QQ5waku2JrjaXfEA@cluster0.r4ehk1d.mongodb.net/OnlineCodingApp";


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function main() {
  try {
    await client.connect();

    console.log("Successfully connected to MongoDB.");

    // const collections = await client.db("OnlineCodingApp").collections();
    // collections.forEach((collection) => console.log(collection.s.namespace.collection));

    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    await client.close();
  }
}

const dbConnection = main();
module.exports = { client, dbConnection };
