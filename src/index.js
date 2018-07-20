const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

require('./app/controllers/index')(app);

const port = process.env.PORT || 3000;
app.listen(port);

console.log(`App run on port ${port}`);