const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const helmet = require('helmet');

require('dotenv/config');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use((req, res, next) => {
    req.io = io;

    next();
});
console.log(process.env.NAME)
app.use(helmet());
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

require('./api')(app);

server.listen(3333, () => {
    console.log('Serviço iniciado com sucesso! Porta:', process.env.PORT)
});
