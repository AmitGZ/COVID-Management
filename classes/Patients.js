import { check } from 'express-validator'
import { checkDate } from './date-schema.js'
import { checkAddress } from './Address.js'
import { checkPrimaryDetails } from './primary-details.js';
import { getSingleById, isUnique } from './functions.js'
import {Patient} from './Patient.js';
import { checkPatient } from './Patient.js';
export class Patients{
    constructor(){
        this.patients =[]
        this.counterID=0;
    }

    getAll(){
        return this.patients;
    }

    addPatient(p){

        p.patientID=this.counterID;
        let patient = new Patient(p);
        //patient.patientID=this.counterID;
        this.patients.push(patient)
        this.counterID++;
    }

    getById(id){
        return getSingleById(this.patients, id, 'patientID')
    }
}
