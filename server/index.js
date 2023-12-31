import { createRequire } from "module";
const require = createRequire(import.meta.url);

import express from "express";
import geocode from './utils/geocode.js';
import forecast from "./utils/forecast.js";

if (process.env.NODE_ENV !== 'production') { 
    require('dotenv').config(); 
} 

const app = express();

const PORT = process.env.PORT || 3001;

app.get('/api/weather', (req, res) => {
    
    if(!req.query.longitude || !req.query.latitude){
        return res.send({
            error: 'You must provide longitude and latitude.'
        });
    }

    forecast(req.query.longitude, req.query.latitude, (error, forecastData) => {

        if (error) return res.send({ error });

        res.send({
            forecastData
        });
    });
});

app.get('/api/location', (req, res) => {
    
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(req.query.address, (error, locationData) => {
        if (error) return res.send({ error });

        res.send({
            longitude: locationData.longitude,
            latitude: locationData.latitude,
            location: locationData.location
        });
    })
});

app.get('*', (req, res) => {
    res.status(404).send({
        error: 'Bad URI.'
    });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));