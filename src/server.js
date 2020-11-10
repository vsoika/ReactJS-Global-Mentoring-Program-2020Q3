// const express = require("express");
// const path = require("path");

import express from 'express';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname)));

let renderServer = require("./renderServer");
renderServer(app);

app.listen(8000, () => console.log('Listening on localhost:8000'));

