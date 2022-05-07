const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;


// meddle ware
app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0tju7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log('success your canection ')

async function run () {
    try {
        await client.connect()
        const productCollection = client.db('warehouse').collection('product')
       
        app.get('/product' , async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query);
            const product = await  cursor.toArray();
            res.send(product)
        })
        app.get('/product/:id', async (req, res) =>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const product = await productCollection.findOne(query)
            res.send(product)
        })

    } catch (error) {
        
    }
}
run()


app.get('/', (req, res) => {
    res.send('Server is running')
})

app.listen(port, () => {console.log('listening is running')})
