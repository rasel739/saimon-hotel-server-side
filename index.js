const express = require('express');
const { MongoClient } = require("mongodb");
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qioxk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
  
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run(){
    
    try {
        client.connect();
        const database = await client.db('Saimon_Hotel_User');
        const facilitiesCollection = await database.collection('Facilities');
        const OurRoomCollection = await database.collection('HotelRoom')
        
        //Facilities Data Add
        app.post('/facilities',async (req, res) => {

            const item = req.body;
            const result = await facilitiesCollection.insertOne(item);
            res.send(result.acknowledged);
        })
        //Facilities Get and show data client side
        app.get('/ourFacilities', async (req, res) => {
            
            const result = await facilitiesCollection.find({}).toArray();

            res.send(result)
        })
        //Our Room Add 
        app.post('/ourRoom', async (req, res) => {
            const roomItem = req.body;
             const AddRoom = await OurRoomCollection.insertOne(roomItem);
            res.send(AddRoom.acknowledged);
        })

        //Our Room get and show client side
        app.get('/our-room-card', async (req, res) => {
            
            const result = await OurRoomCollection.find({}).toArray();

            res.send(result)
        })
    } finally {
        // await client.close();
    }
}

run().catch(console.dir)
app.get('/', (req, res) => {
    
    res.send('Welcome to Assignment 11 server')
})

app.listen(port, () => {
    
    console.log('Server Start Secssfully', port);
})