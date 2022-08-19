const express = require('express');
const cors = require('cors');

const ListRoutes = require('./routes/v1/list');
const AddRoutes = require('./routes/v1/add');

const { serverPort } = require('./config');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send({ msg: 'Server is running' });
});

app.use('/v1/list/', ListRoutes);
app.use('/v1/add/', AddRoutes);

app.all('*', (req, res) => {
  res.status(404).send({ error: 'Page not found' });
});

app.listen(serverPort, () => console.log(`Server is running on port ${serverPort}`));
