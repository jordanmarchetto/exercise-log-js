require('dotenv').config();

const express = require('express');
const { pool } = require('./db');
const routes = require('./routes');
const { logRequest } = require('./middlewares/logging');

const app = express();
const port = process.env.API_PORT || 3000;

app.use(express.json());
app.use('/api', logRequest);
app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'exercise-log-js api is running' });
});

async function start() {
  try {
    await pool.query('SELECT 1');
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database.');
    console.error(error);
    process.exit(1);
  }
}

start();
