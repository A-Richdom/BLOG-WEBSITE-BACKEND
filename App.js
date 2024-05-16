const express = require('express')
const cors = require('cors')
const { default: mongoose } = require('mongoose')
const BlogRoute = require('./Routes/BlogRoute')
const AdminRoute = require('./Routes/AdminRoute')
require('dotenv').config();
// const nodemailer = require('nodemailer')


const MongoURL = process.env.MongoURL
const app = express();


//MIDDLE-WARE TO RECEIVE A BODY REQUEST
app.use(cors());
app.use(express.json());

//ROUTE
app.use('/blog', BlogRoute);
app.use('/admin', AdminRoute);
app.use('/uploads', express.static('uploads'))

//PORT NUMBER
const port = 5000

const start = async() => {
    try {
        await mongoose.connect(MongoURL)
        console.log('Blog-Website Connected...');

        app.listen(port, 'localhost', function () {
            console.log('Server is runnung on a port', port);
        })
    } 
    catch (error) {
        console.log(error);
    }
}

start()