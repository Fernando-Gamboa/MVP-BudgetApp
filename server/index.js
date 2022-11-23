require('dotenv').config();
const express = require("express");
const router = require('./routes.js');
const path = require("path");
const app = express();
// declaring PORT
let PORT = process.env.PORT;
// add DB
const db = require('./database/db.js');
const morgan = require('morgan');
const cors = require('cors');

app.use(morgan('dev'));
app.use(cors());

app.use(express.json());

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "/public")));
// app.use(express.static('./client/dist'));

// request are done here through routes
app.use('/budget', router);


app.listen(PORT);
console.log(`server listening at http://localhost:${PORT}`);

