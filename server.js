const express = require('express');
require('dotenv').config()
const app = express();
require('./schedular')

const port = process.env.PORT || 5000

app.listen(port , ()=>{
    console.log(`App is running on port ${port}.... `)
})