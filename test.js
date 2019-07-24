const request = require('supertest');
const app = require('./app.js');

it('runs the server', (done)=> {
  request(app)
    .get('/')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res)=> {
      if( err ) throw err;
      expect(res.body).toEqual({ nik: 'is great' })
      done();
    });
});

it('gets a list of rooms', (done)=>{
  request(app)
    .get('/room')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res)=> {
      if( err ) throw err;

      expect(res.body.constructor).toEqual(Array);

      done();
    });
});

it('makes a room', (done)=>{
  request(app)
    .post('/room')
    .send({ players: ['nik'], game: 'chess' })
    .expect(201)
    .end((err, res)=> {
      if( err ) throw err;

      request(app)
        .get('/room')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res)=>{
          if( err ) throw err;

          expect(res.body.constructor).toEqual(Array);
          expect(res.body).toHaveLength(1);
          expect(res.body[0].players).toEqual(['nik']);
          expect(res.body[0].game).toEqual('chess');
          done();
        });
    });
});






//
