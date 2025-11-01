const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', require('./routes/auth'));
app.use('/dishes', require('./routes/dishes'));
app.use('/users', require('./routes/users'));

app.listen(3000, () => console.log('Serveur lancé sur le port 3000'));
