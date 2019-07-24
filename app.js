const express = require('express');
const app = express();

const connectionString = process.env.DATABASE_URL ||
                         'postgres://gameroom:guest@localhost:5432/gameroom';

const ORM = require('sequelize');
const connection = new ORM(connectionString, { logging: false });

connection.authenticate()
  .then(()=> console.log('success'))
  .catch(()=> console.error('connection failed'));

const { Room } = require('./models.js')(ORM, connection);

app.use( express.json() );

app.get('/', (req, res)=> {
  res.json({ nik: 'is great' });
});

app.get('/room', (req, res)=> {
  Room.findAll()
    .then(dbResponse => res.json(dbResponse))
    .catch(err => console.error(err)|| res.status(500).json({ message: 'error reading rooms' }))
});

app.post('/room', (req, res)=>{
  Room.create(req.body)
    .then(dbResponse => res.status(201).json({ created: dbResponse.dataValues }))
    .catch(err=> console.error(err)|| res.status(500).json({ message: 'creating room failed' }))
});


const hydrate = ()=> {
  return Room.sync({ force: true })
    .then(()=> console.log('made table'))
    .catch(()=> console.error('making table perkeleen vitupaa'));
};

//hydrate();

module.exports = app;





//
