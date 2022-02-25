import { check } from 'express-validator'
import { checkDate } from './date-schema.js'
import { checkAddress } from './Address.js'
import { checkPrimaryDetails } from './primary-details.js';
import { getSingleById, isUnique } from './functions.js'

export class Patients{
    constructor(){
        this.patients =[];
        this.counterID = 0;
    }

    getAll(){
        return this.patients;
    }

    addPatient(patient){
        patient.patientID = this.counterID;
        this.patients.push(patient)
        this.counterID++;
    }

    getById(id){
        return getSingleById(this.patients, id, 'patientID')
    }

    getCityStatistics(){
        let cityStatistics = {};
        for(let i =0; i<this.patients.length; i++){
            console.log(this.patients[i].address.city)
            if(!cityStatistics[this.patients[i].address.city])
                cityStatistics[this.patients[i].address.city] = 1
            else
                cityStatistics[this.patients[i].address.city] += 1
        }
        return cityStatistics;
    }
}

export function checkPatient(arr){ 
    return [
    checkPrimaryDetails(),
    check('govtID').notEmpty().isString().custom((value)=> {return  isUnique(arr,value,'govtID')}),
    checkDate('birthDate'),
    check('email').notEmpty().isString(),
    checkAddress('address'),
    check('houseResidentsAmount').notEmpty().isInt(),
    check('isCovidPositive').notEmpty().isBoolean()
    ];
}
