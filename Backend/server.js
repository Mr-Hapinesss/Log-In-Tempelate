const express = require ('express');
const app = express();
const PORT = 3000;
const cors = require ('cors');
const connectDB = require ('./config/connectDB.js');
require('dotenv').config();

//Connect to DataBase
connectDB();

//middleware
app.use(express.json());
app.use(cors());

//Routes
app.use('/user', require('./routes/UserRoutes.js'));

//Default route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

//start server
app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
} )