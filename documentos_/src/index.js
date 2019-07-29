const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const helmet = require('helmet');
const cors = require('cors');
const auth = require('./app/middlewares/auth');

const app = express();

app.use(auth);
app.use(helmet());
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

require('./app/controllers')(app);

app.listen(3001, () => {
    console.log('Documentos rodando na porta 3001!');
});