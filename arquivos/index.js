const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const auth = require('./src/middlewares/auth');
const helmet = require('helmet');
const app = express();
const db = require('./src/config/config');

mongoose.connect(db.databaseConnection, { useNewUrlParser: true });

//app.use(auth);
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

require('./src/controllers')(app);

app.listen(3002, () => {
    console.log('Arquivos rodando na porta 3002!');
});
