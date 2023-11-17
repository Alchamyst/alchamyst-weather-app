import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require("express");
const users = require("./users.json");

// const geocode = require('./utils/geocode');

if (process.env.NODE_ENV !== 'production') { 
    require('dotenv').config(); 
} 

const app = express();

const PORT = 3001;

// const testGeocode = () => {

// }

// testGeocode();

app.get("/api/users", (req, res) => {
    return res.json(users);
});

app.get("/api/weather", (req, res) => {
    
    // if(!req.query.address){
    //     return res.send({
    //         error: 'You must provide an address.'
    //     })
    // }

    // Lookup address
    // get forecast data from external api
    // respond with forecast & location.
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));