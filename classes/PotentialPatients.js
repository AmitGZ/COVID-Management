import { check } from 'express-validator'
import { checkPrimaryDetails } from './primary-details.js';
import { getSingleById, isUnique } from './functions.js'

export class PotentialPatients{
    constructor(){
        this.potential_patients =[]
        this.counterID=0;
        this.encounterPatientID=-1;
    }

    getAll(){
        return this.potential_patients;
    }

    addPotentialPatient(potential_patient, patient){
        potential_patient.potentialPatientID=this.counterID;
        this.potential_patients.push({potential_patient, patient})
        this.counterID++;
    }

    getById(id){
        return getSingleById(this.potential_patients, id, 'potentialPatientID')
    }
}

export function checkPotentialPatient(arr){ 
    return [
    check('potentialPatientID').notEmpty().isString().custom((value)=> {return  isUnique(arr,value,'potentialPatientID')}),
    checkPrimaryDetails()
    ];
}