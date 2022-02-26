import { Person } from "./Person.js";
import { Patient } from "./Patient.js";
import { PotentialPatient } from "./PotentialPatient.js";
import { getSingleById } from "./functions.js";


export const dataBase ={
    people : [],
    labtests : [],
    counterID: 0,

    getAllPatients(){
        let tmp =[]
        for(let i =0; i<this.people.length; i++){
            if(this.people[i].status == 'Patient')
                tmp.push(this.people[i].getPublic())
        }
        return tmp
    },

    getAllPotentialPatients(){
        let tmp =[]
        for(let i =0; i<this.people.length; i++){
            if(this.people[i].status == 'PotentialPatient')
                tmp.push(this.people[i].getPublic())
        }
        return tmp
    },

    getEncountersByPatient(patient){
        let potential_patients = getPotentialPatients()
        let arr =[patient]
        for(let i=0; i< potential_patients; i++){
            if(potential_patients[i].encounteredPatient == patient)
                arr.push(potential_patients[i].getPublic())
        }
        return arr;
    },

    getIsolated(){
        let tmp =[]
        for(let i =0; i<this.people.length; i++)
            if(this.people[i].isIsolated)
                tmp.push(this.people[i].getPublic())
        return tmp;
    },

    getPositiveSince(date){
        let tmp = []
        date = new Date(date)
        for (let i=0; i< this.people.length; i++)
            if(this.people[i].added_date  - date >= 0 && this.people[i].isCovidPositive )
                tmp.push(this.people[i].getPublic())
        return tmp
    },

    getByID(id){
        let tmp = getSingleById(this.people, id, 'patientID');
        if(!tmp)
            return getSingleById(this.people, id, 'potentialPatientID');
        return tmp;
    },

    addPatient(patient){
        patient.patientID =  this.counterID.toString();
        patient = Patient(patient)
        this.people.push(patient)
        this.counterID++;
    },

    addPotentialPatient(potential_patient, encountered_patient_id){
        potential_patient.potentialPatientID = this.counterID.toString()
        potential_patient = PotentialPatient(potential_patient)
        this.people.push(potential_patient)
        this.getByID(encountered_patient_id).encountered.push(potential_patient)
        this.counterID++;
    },

    getAllEncounters(){
        let encounters =[]
        for(let i =0; i<this.people.length; i++){
            if(this.people[i].status == 'Patient')
                encounters.push(
                    {
                        potentialPatientDetails: this.people[i].encountered,
                        encounteredPatient: this.people[i].getPublic()
                    }
                )
        }
        return encounters;
    },

    movePotential(id,patient){
        let i = this.people.findIndex(x => x.potentialPatientID == id);
        this.people.splice(i, 1)
        this.addPatient(patient);
    },

    getByStatus(stat){
        let tmp = []
        for (let i=0; i< this.people.length; i++)
            if(this.people[i].status == stat )
                tmp.push(this.people[i])
        return tmp
    },

    getAllPositive(){
        let tmp = []
        for (let i=0; i< this.people.length; i++)
            if(this.people[i].isCovidPositive)
                tmp.push(this.people[i])
        return tmp
    },

    getCityStatistics(){
        let stats = [];
        for(let i =0 ;i<this.people.length;i++){
            let city_info = getSingleById(stats, this.people[i].address.city, 'city')
            if(city_info){
                if(this.people[i].isCovidPositive)
                    city_info.infected++;
            }
            else
            {
                if(this.people[i].isCovidPositive)
                    stats.push({city : this.people[i].address.city , infected:1})
                else
                    stats.push({city : this.people[i].address.city , infected:0})
            }

        }
        return stats;
    }
}