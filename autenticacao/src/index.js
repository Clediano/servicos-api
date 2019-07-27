const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const helmet = require('helmet');
const cors = require('cors');

const app = express();

require('./app/models/User').sync({ force: true });
require('./app/models/Wallet').sync({ force: true });

app.use(helmet());
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());
require('./app/controllers')(app);

app.listen(3000, () => {
    console.log('Autenticação rodando na porta 3000!');
});