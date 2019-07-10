const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const helmet = require('helmet');

require('dotenv').config();

const app = express();

app.use(helmet());
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

require('./app/controllers')(app);

app.listen(3000, () => {
    console.log('Autenticação rodando na porta 3000!');
});