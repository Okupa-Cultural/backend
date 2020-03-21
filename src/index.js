const express = require('express');

//Inits
const app = express();
require('./database');
require('./passport/local-auth');

//settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(require('./middlewares'));

app.use('/api', require('./routes/index'));

app.listen(app.get('port'), () => {
    console.log(`Server inicializado en el puerto ${app.get('port')}!`);
});