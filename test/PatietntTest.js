//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index.js';
import {examples} from '../classes/examples.js'
let should = chai.should();
chai.use(chaiHttp);


describe('Patients', () => {
/** Test the /GET route*/
  describe('/GET Patients', () => {
      it('it should GET all the patients', 
      (done) => {
        chai.request(server)
            .get(`/patients`)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
  });

  describe('/PUT Patient', () => {
    it('it should PUT a new patient', 
    (done) => {
      chai.request(server)
          .put(`/patients`)
          .send(examples().patient)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.an('object');
              res.body.should.have.property('patientID');
            done();
          });
    });
  });
});

describe('Labtests', () => {
  /** Test the /GET route*/
  describe('/Post Labtest', () => {
    it('it should Post a new labtest', 
    (done) => {
      chai.request(server)
          .post(`/labtests`)
          .send(examples().labtest)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.an('object');
              res.body.should.have.property('patientID').and.to.be.a('string');
            done();
          });
    });
  });
});


describe('Routes', () => {
  //addding patient for testing

  /** Test the /Put route*/
  describe('/Put Routes', () => {
    it('it should PUT a new Route', 
    (done) => {
      chai.request(server)
          .put(`/patients/0/route`)
          .send(examples().route)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.an('object');
            done();
          });
    });
  });

  /** Test the /Get route*/
  describe('/Get Routes', () => {
    it('it should Get a new Route', 
    (done) => {
      server.data_base.people.addPatient(examples().patient)
      chai.request(server)
          .get(`/patients/0/route`)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.an('array');
              res.body[0].should.have.property('dateOfVisit');
              res.body[0].should.have.property('siteName').and.to.be.a('string');
              res.body[0].should.have.property('siteAddress').and.to.be.an('object');
            done();
          });
    });
  });
});

describe('Encounters', () => {
  //addding patient for testing

  /** Test the /Put route*/
  describe('/Put Encounter', () => {
    it('it should PUT a new Encounter', 
    (done) => {
      server.data_base.people.addPatient(examples().patient)
      chai.request(server)
          .put(`/patients/0/encounters`)
          .send(examples().encounter)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('firstName').and.to.be.a('string');
              res.body.should.have.property('lastName').and.to.be.a('string');
              res.body.should.have.property('phoneNumber').and.to.be.a('string');
            done();
          });
    });
  });

  /** Test the /Get route*/
  describe('/Get Encounters', () => {
    it('it should Get all Encounters by patient', 
    (done) => {
      server.data_base.people.addPatient(examples().patient) //adding patient for testing
      chai.request(server)
          .get(`/patients/0/encounters`)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.an('array');
              res.body[0].should.have.property('potentialPatientDetails').and.to.be.an('object');
              res.body[0].should.have.property('encounteredPatient').and.to.be.an('object');
            done();
          });
    });
  });
});