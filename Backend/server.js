const express = require ('express');
const app = express();
const PORT = 3000;
const cors = require ('cors');
const connectDB = require ('./config/connectDB.js');
require('dotenv').config();
const cookieParser = require('cookie-parser');

//Connect to DataBase
connectDB();

//middleware
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173' //frontend origin
}));
app.use(cookieParser());

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