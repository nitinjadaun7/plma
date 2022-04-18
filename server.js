'use strict';

//const express = require('express');
import express from 'express';
import http from 'http';
import 'dotenv/config';
import mongoose from 'mongoose';
import RouteLoader from './RouteLoader.js';
import cors from 'cors';

// Constants
const PORT = process.env.PORT;
// App
const app = express();
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose.connect(process.env.MONGODB_URL, options, (err) => {
    if (err) {
        console.log('error while connecting to DB', err);
    } else {
        console.log('Connected ot DB');
    }
});
app.use(express.json({
    'limit': '3mb'
}));
app.use(express.urlencoded({
    'limit': '3mb',
    'extended': true
}));
app.use(cors());


const routeLoader = new RouteLoader(app);
routeLoader.load();
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Running on ${PORT}`);
});