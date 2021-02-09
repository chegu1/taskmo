const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;


//creating server
app.listen(PORT, (err) => {
    if (err) return console.log(`unable to connect server because of ${err}`)
    return console.log(`server connected and running on ${PORT} port`)
})