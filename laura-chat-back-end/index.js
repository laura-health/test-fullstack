const express = require('express');
const routes = require('./src/routes/routes');
const bodyParser = require('body-parser');
const http = require('http');
const { setupWebsocket } = require('./src/config/websocket');
const cors = require('cors');
require('./src/config/database');
const app = express();
const fileUpload = require('express-fileupload');
 
app.use(cors({credentials: true, 
              origin: true,
              preflightContinue: true, 
              exposedHeaders: ['Set-Cookie','HttpOnly','ACookieAvailableCrossSite', 'SameSite=Strict',"Secure"],}));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);
app.use('/public', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/../../build'));

const server = app.listen(process.env.PORT || 1600)

setupWebsocket(server);

console.log('API Laura Chat ligada !')

module.exports = app ;
