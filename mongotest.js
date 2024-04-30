const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
const uri =
  "mongodb+srv://doadmin:UTdz6tf14058l3Y7@db-mongodb-nyc3-12237-a9fc0b4f.mongo.ondigitalocean.com/admin?authSource=admin&replicaSet=db-mongodb-nyc3-12237&tls=true";
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    const database = client.db('mongodbVSCodePlaygroundDB');
    const sales = database.collection('sales');
    // Query for a movie that has the title 'Back to the Future'
    const query = { item: 'jkl' };
    const sale = await sales.find({item: 'abc1'}, { projection: { _id: 0, item: 1, price: 1 } }).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
      });
    console.log(sale);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);