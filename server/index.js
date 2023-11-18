import { createRequire } from "module";
const require = createRequire(import.meta.url);
const users = require("./users.json");

import express from "express";
import geocode from './utils/geocode.js';
import forecast from "./utils/forecast.js";

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

    geocode(req.query.address, (error, locationData) => {
        if (error) return res.send({ error });

        forecast(locationData.longitude, locationData.latitude, (error, forecastData) => {

            if (error) return res.send({ error });

            res.send({
                location: locationData.location,
                forecastData
            })
        })
    })
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));