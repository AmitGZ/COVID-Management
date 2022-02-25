import { check } from 'express-validator'
import { checkPrimaryDetails } from './primary-details.js';
import { getAllById, getSingleById, isUnique } from './functions.js'

export class PotentialPatients{
    constructor(){
        this.potential_patients =[];
        this.isolatedIDs = []
        this.positiveIDs =[]
        this.counterID = 0;
    }

    getAll(){
        return this.potential_patients;
    }

    addPotentialPatient(potential_patient){
        potential_patient.potentialPatientID = this.counterID;
        this.potential_patients.push(potential_patient)
        this.isolatedIDs.push(this.counterID)
        this.counterID++;
    }

    getById(id){
        return getSingleById(this.potential_patients, id, 'potentialPatientID')
    }

    updatePositive(id){
        let tmp = getSingleById(this.positiveIDs,id,'positiveID')
        if(!tmp)
            this.positiveIDs.push({positiveID : id});
    }

    updateNegative(id,labtests){
        let tmp = getAllById(labtests, id,'patientID')
        if(tmp.length>=2 && !tmp[tmp.length-1].isCovidPositive && !tmp[tmp.length-2].isCovidPositive){
            let index = this.isolatedIDs.indexOf(tmp)
            this.isolatedIDs.splice(index,1)
        }
    }

    getIsolated(encounters,patients){
        let tmp =[]
        for(let i =0; i<this.isolatedIDs.length; i++){
            tmp.push({
                potentialPatientDetails : this.getById(this.isolatedIDs[i]),
                encounteredPatient : encounters.getEncounterByPotentialID(this.isolatedIDs[i], patients)
            })
        }
        return tmp;
    }

    delete(potential_patient_id){
        let tmp = this.getById(potential_patient_id);
        if(!tmp)
            return false; // delete failed

        let index = this.potential_patients.indexOf(tmp)
        this.potential_patients.splice(index,1)
        return true; //delete successfull
    }
}