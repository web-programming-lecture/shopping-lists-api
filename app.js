const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    dotenv = require('dotenv'),
    cors = require('cors'),
    nocache = require('nocache'),
    session = require('express-session');

dotenv.load();

const ui = require('./routes/ui');
const api = require('./routes/api');

const app = express();

// Set up mongoose connection
mongoose.connect(process.env.MONGO_DB_CONNECTIONSTRING, {
    auth: {
        user: process.env.MONGO_DB_USER,
        password: process.env.MONGO_DB_PASSWORD
    },
    useNewUrlParser: true,
    useFindAndModify: false
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: '48afd9ff279cbc1f30e6b56',
    resave: false,
    saveUninitialized: false
}));

app.use(cors({ origin: true, credentials: true }));

app.use(nocache());

app.use('/', ui);
app.use('/api/v1/lists', api);

app.set('views', './views');
app.set('view engine', 'pug');
// Serve static files
app.use('/public', express.static('public'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    if (err.name == "ValidationError" || err.name == "CastError") {
        res.status(400).send({ error: err.message });
    } else {
        res.status(500).send({ error: err });
    }
});

const port = process.env.PORT || 8081;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
