const express         = require('express');
const bodyParser      = require('body-parser');
const methodOverride  = require('method-override');
const mongoose        = require('mongoose')
const app             = express();
require('./db/db');



app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));









let port = process.env.PORT;
if (!process.env.PORT || process.env.PORT == "")
{
	port = 3000;
}

app.listen(port, function()
{
	console.log(`Server listening on port ${port}`);
});
