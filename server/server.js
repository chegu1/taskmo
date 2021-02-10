const express = require('express');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 5000;
require('dotenv').config()
require('./utils/db');
const bodyParser = require('body-parser');
const JobPosting = require('./routes/jobposting')
const Auth = require('./routes/auth')

//middleware
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())


//routes
app.use('/api', JobPosting)
app.use('/api', Auth)

//creating server
app.listen(PORT, (err) => {
    if (err) return console.log(`unable to connect server because of ${err}`)
    return console.log(`server connected and running on ${PORT} port`)
})