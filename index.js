const express = require('express');
const user = require('./user');

const app = express();
const port = process.env.PORT || 3000;

const data = {
	"id":1,
	"text":"hello world"
};

app.get('/', (req, res) => {
	res.json(data);
});

app.use('/user', user);

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`listening on port ${ port }`);
});