const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const cors = require('cors');

const createUser = require('./backend/handlers/create-user');
const createSchedule = require('./backend/handlers/create-schedule');
const getSchedule = require('./backend/handlers/get-schedule');
const getCoordinates = require('./backend/handlers/get-coordinates');
const login = require('./backend/handlers/login');

app.options('*', cors());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.put('/user/login', login);
app.post('/user/create', createUser);

app.put('/schedule', getSchedule);
app.post('/schedule/create', createSchedule);

app.put('/building', getCoordinates);

app.listen(port);

console.log('app started on port: ' + port);