import { check } from 'express-validator'
import { checkPrimaryDetails } from './primary-details.js';
import { getSingleById, isUnique } from './functions.js'

export class PotentialPatient{
    constructor(p_patient, encounter_id){
        this.potential_patient=p_patient;
        this.encounterPatientID=encounter_id;
    }

    get(){
        return this.potential_patient;
    }
}

// export function checkPotentialPatient(arr){ 
//     return [
//     //check('potentialPatientID').notEmpty().isString().custom((value)=> {return  isUnique(arr,value,'potentialPatientID')}),
//     checkPrimaryDetails()
//     ];
// }