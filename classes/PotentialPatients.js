import { check } from 'express-validator'
import { checkPrimaryDetails } from './primary-details.js';
import { getSingleById, isUnique } from './functions.js'

export class PotentialPatients{
    constructor(){
        this.potential_patients =[];
        this.counterID = 0;
    }

    getAll(){
        return this.potential_patients;
    }

    addPotentialPatient(potential_patient){
        potential_patient.potentialPatientID = this.counterID;
        this.potential_patients.push(potential_patient)
        this.counterID++;
    }

    getById(id){
        return getSingleById(this.potential_patients, id, 'potentialPatientID')
    }

    /*getPotential(patients){
        arr =[]
        for(let i =0; i<this.encounters.length; i++)
            arr.push({potentialPatientDetails:this.getById(encounters[i].potentialPatientID) , encounteredPatient:patients.getById(id) })
        return arr;
    }   

    getEncountersById(potential_patient_id){
        arr =[];
        for(let i =0; i<this.encounters.length; i++)
            if(this.encounters.patientID == id)
                arr.push({potentialPatientDetails:this.getById(encounters[i].potentialPatientID) , encounteredPatient:patients.getById(id) })
        return arr;
    }   */
}