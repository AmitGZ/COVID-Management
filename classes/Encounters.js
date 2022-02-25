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

    getEncounterByPotentialID(potential_id,patients)
    {
        let tmp = null;
        for(let i =0; i<this.encounters.length; i++)
            if(this.encounters[i].potentialPatientID == potential_id){
                tmp = patients.getById(this.encounters[i].patientID);
                return tmp;
            }
        return tmp;
    }

    getEncounterByPatientID(patient_id,potential_patients)
    {
        let tmp =[];
        for(let i =0; i<this.encounters.length; i++)
            if(this.encounters[i].patientID == patient_id){
                tmp.push(potential_patients.getById(this.encounters[i].potentialPatientID));
            }
        return tmp;
    }

    getAllEncounters(patients,potential_patients){
        let tmp = []
        for(let i =0; i<this.encounters.length; i++)
            tmp.push({
                potentialPatientDetails : potential_patients.getById(this.encounters[i].potentialPatientID),
                encounteredPatient : patients.getById(this.encounters[i].patientID)
            });
        return tmp;
    }
}