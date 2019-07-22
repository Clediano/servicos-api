const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const auth = require('./middlewares/auth');
const helmet = require('helmet');
const app = express();

mongoose.connect('mongodb+srv://clediano:clediano@cluster0-1uusa.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

app.use(auth);
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

require('./controllers')(app);

app.listen(3002, () => {
    console.log('Arquivos rodando na porta 3002!');
});
