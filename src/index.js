const express = require('express');
const morgan = require('morgan');
const path = require('path');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');

//Inits
const app = express();
require('./database');
require('./passport/local-auth');

//settings
app.set('port', process.env.PORT || 4000);

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());
app.use(cors());
app.use(session({
    secret : 'mysecretsession',
    resave : false,
    saveUninitialized : false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(fileUpload({
    createParentPath : true,
}));

app.use((req, res, next) => {
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.loginMessage = req.flash('loginMessage');
    app.locals.user = req.user;
    next();
});

app.use('/api', require('./routes/index'));

app.listen(app.get('port'), () => {
    console.log(`Server inicializado en el puerto ${app.get('port')}!`);
});