//During the test the env variable is set to test
process.env.NODE_ENV = 'test';


import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index.js';

//Require the dev-dependencies

//let chai = require('chai');
//let chaiHttp = require('chai-http');
//let server = require('../index.js'); //change maybe
let should = chai.should();

chai.use(chaiHttp);

describe('Patients', () => {
/** Test the /GET route*/
  describe('/GET Patients', () => {
      it('it should GET all the books', 
      (done) => {
        chai.request(server)
            .get(`/patients`)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
            console.log('**************')
            return;
      });
      return;
  });
  console.log('tsadfsaasdfasdf')
  return;
});