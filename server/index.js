import { createRequire } from "module";
const require = createRequire(import.meta.url);
const users = require("./users.json");

import express from "express";
import geocode from './utils/geocode.js';

if (process.env.NODE_ENV !== 'production') { 
    require('dotenv').config(); 
} 

const app = express();

const PORT = process.env.PORT || 3001;

app.get('/api/users', (req, res) => {
    return res.json(users);
});

app.get('/api/weather', (req, res) => {
    
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address.'
        })
    }

    // Lookup address and convert to latitude, longitude.
    geocode(req.query.address, (error, {latitude, longitude, location}) => {
        if (error) return res.send({ error });
        
        // these won't be send back usually, and will be used for getting forecast data.
        res.send(`latitude: ${latitude}, longitude: ${longitude}, location: ${location}`);

        // get forecast data from external api

        // respond with forecast & location.
        // res.send({
        //     forecast: forecastData,
        //     location,
        //     address: req.query.address
        // });
    })


    
    
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));