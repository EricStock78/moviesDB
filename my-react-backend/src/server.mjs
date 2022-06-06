import express from 'express';
//const express = require('express')
import {MongoClient} from 'mongodb';
import path from 'path';
import { fileURLToPath } from 'url';
//const cookieParser = require("cookie-parser");
import cookieParser from 'cookie-parser';
//const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '/build')));

app.use(express.json());
app.use(cookieParser());

app.get( '/hello', (req, res) =>  res.send("hello there"));
app.get( '/hello/:name', (req, res) =>  
{
    res.send(`hello ${req.params.name}`)
});
app.post( '/hello', express.json(), (req, res) => 
{
    res.send(`Hello! ${req.body.name}`)
    
});

const JWT_SECRET = "EricsTestSecretKeySuperSecure";

function generateAccessToken(tokenData) {
    return jwt.sign(tokenData, JWT_SECRET);
  }


const client = new MongoClient('mongodb://localhost:27017');

app.post('/api/addMovieData', async (req, res) => {
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
    if (!req.cookies.token) return res.status(401).send();
    const jwtToken = req.cookies.token;
    console.log(jwtToken);

    jwt.verify(jwtToken, JWT_SECRET, async (err, decoded) => {
        if( err ) {
            console.log("jwt is invalid");
            res.sendStatus(403);
        }
        else {
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
        }
    });  
})

app.post("/login", (req, res) => {
    
    const token = generateAccessToken( {asked: 5, correct: 3});
    console.log(token);
    res
      .writeHead(200, {
        "Set-Cookie": `token=${token}; HttpOnly`,
        "Access-Control-Allow-Credentials": "true"
      })
      .send();
  });

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
})

app.listen( 8000, () => console.log( "server is listening on port 8000"));

