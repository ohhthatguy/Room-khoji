const express = require('express');
const bodyParser = require('body-parser')
const connection = require('./database/database');
const router = require('./routes/route')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')


const dotenv = require('dotenv').config();



console.log(process.env.FRONTEND_URL);
app.use(cookieParser())
app.use(cors(
    {
        origin: process.env.FRONTEND_URL,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Explicitly allow OPTIONS method
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
    }
));


app.options('*', cors());
// app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('images'))
app.use('/', router);



const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log("Running at ", PORT)
})


connection(process.env.DB_URL);