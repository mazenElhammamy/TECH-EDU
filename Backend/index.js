const express = require('express');
const verifyUser = require('./middlewares/verifyUser');
const userRouter = require('./routers/user');
const todoRouter = require('./routers/todo');
const cors = require('cors');

const Mailchimp = require('mailchimp-api-v3');
require('dotenv').config({ path: __dirname + '/variables.env' });

const mc_api_key = process.env.MAILCHIMP_API_KEY;
const list_id = process.env.LIST_ID;

const app = express();
const mailchimp = new Mailchimp(mc_api_key);

// Mailchimp api endpoint
app.get('/api/memberAdd', (req, res) => {
	mailchimp
		.post(`/lists/${list_id}/members`, {
			email_address: req.query.email,
			status: 'subscribed',
		})
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			res.send(err);
		});
});

require('./db_connection'); // to connect the database

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use((req, res, next) => {
	next();
});

app.use('/api/user', userRouter);
app.use('/api/todo', verifyUser, todoRouter);
app.get('/*', (req, res) => {
	res.status(400).send('<h1>Error 404</h1>');
});

// err handller
app.use((err, req, res, next) => {
	res.status(400).json('status bloked');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

