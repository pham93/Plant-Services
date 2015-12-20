var express    = require('express');
var bodyParser = require('body-parser');
var morgan     = require('morgan');
var mongoose   = require('mongoose');
var configs    = require('./config');

//CONNECT TO THE DATABASE
mongoose.connect(configs.database);
var Plants     = require('./app/models/plantSchema');
var app = express();
// CONFIGURATIONS
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    next();
});
// LOG EVERYTHING
app.use(morgan('dev'));

// ROUTES
app.get('/', function(req, res){
    res.send('HOME PAGE');
});
var apiRouter = require('./app/routes/api')(app, express);
apiRouter.use(function(req, res, next){
    console.log("MiddleWare: somebody is in /api/");
    next();
});
app.use('/api', apiRouter);

//START SERVER
console.log('listening to ' + configs.PORT);

