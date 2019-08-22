const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const helmet = require('helmet');
const { updateTransactions } = require('./repository/documents/functions');
const { PORT } = require('./config/secret');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use((req, res, next) => {
    req.io = io;

    next();
});

app.use(helmet());
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

require('./api')(app);

server.listen(PORT, () => {
    console.log('Serviço iniciado com sucesso! Porta: ' + PORT)
});
