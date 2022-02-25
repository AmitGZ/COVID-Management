import { getSingleById, isUnique } from './functions.js'

export class Encounters{
    constructor(){
        this.encounters =[];
    }

    addEncounter(potential_id, patient_id){
        this.encounters.push(
            {
                potentialPatientID :potential_id,
                patientID : patient_id
            });
    }

    getAll(){
        return this.encounters ;
    }

    getByPatientID(patient_id,potential_patients)
    {
        let tmp = []
        for(let i =0; i<this.encounters.length; i++)
            if(this.encounters[i].patientID == patient_id)
                tmp.push(potential_patients.getById(this.encounters[i].potentialPatientID))
        return tmp;
    }
}