const express = require("express");
require("dotenv").config();
//on délègue la gestion des routes à un fichier de
const router = require("./router");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT
app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(router); // Requests processing will be defined in the file router
app.listen(port, () => console.log("Server app listening on port " + port));