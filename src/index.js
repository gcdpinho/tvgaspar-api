const app = require('express')();
const routerBackoffice = require('express')();
const routerApp = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
require('./app/controllers/backoffice/index')(routerBackoffice);
require('./app/controllers/index')(routerApp);
const authMiddleware = require('./app/middlewares/auth');

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// app.use('/backoffice', authMiddleware);
app.use('/backoffice', routerBackoffice);
app.use('/', routerApp);


const port = process.env.PORT || 3000;
app.listen(port);

console.log(`App run on port ${port}`);