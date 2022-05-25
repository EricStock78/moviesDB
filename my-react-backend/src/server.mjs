import express from 'express';
//const express = require('express')
import {MongoClient} from 'mongodb';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '/build')));

app.use(express.json());

app.get( '/hello', (req, res) =>  res.send("hello there"));
app.get( '/hello/:name', (req, res) =>  
{
    res.send(`hello ${req.params.name}`)
});
app.post( '/hello', express.json(), (req, res) => 
{
    res.send(`Hello! ${req.body.name}`)
    
});

const client = new MongoClient('mongodb://localhost:27017');

app.post('/api/addMovie', async (req, res) => {
    try {
        await client.connect();
        
        const db = client.db('movies')

        const movieInfo = await db.collection('mymovies').insertOne(req.body);

        res.sendStatus(200);

        client.close();
    }
    catch( error ) {
        res.sendStatus(500);
    }
})

app.get('/api/data', async (req, res) => {
    try {
        await client.connect();
        
        const db = client.db('movies')

        const movieInfo = await db.collection('mymovies').find({}).toArray();

        res.status(200).json(movieInfo);

        client.close();
    }
    catch( error ) {
        res.sendStatus(500);
    }
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
})

app.listen( 8000, () => console.log( "server is listening on port 8000"));

