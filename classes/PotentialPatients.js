import { check } from 'express-validator'
import { checkPrimaryDetails } from './primary-details.js';
import { getSingleById, isUnique } from './functions.js'
import {PotentialPatient} from './PotentialPatient.js';
export class PotentialPatients{
    constructor(){
        this.potential_patients =[]
        this.counterID=0;
    }

    getAll(){
        return this.potential_patients;
    }

    addPotentialPatient(p_patient, encounter_id){
        let potential_patient= new PotentialPatient(p_patient,encounter_id)
       potential_patient.get().potentialPatientID=this.counterID;
        this.potential_patients.push(potential_patient.get())
        this.counterID++;
    }

    getById(id){
        return getSingleById(this.potential_patients, id, 'potentialPatientID')
    }
}