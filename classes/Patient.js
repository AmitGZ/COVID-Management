import { Person } from "./Person.js";
import { check }  from 'express-validator';
import { checkPrimaryDetails } from "./PotentialPatient.js";
import { checkDate } from "./date-schema.js";
import { checkAddress } from "./Address.js";
import { isUnique } from "./functions.js";

export const Patient = function(patient){ 
    return Object.assign(
    Person(patient),
    {
        added_date: (new Date()),
        status: 'Patient',
        routes: [],
        lab_tests: [],
        encountered: [],
        getPublic: function(){
            //remove these fields
            const { added_date, routes,lab_tests, encountered, status, isIsolated, isCovidPositive, negatives_in_a_row, ...publicObject } = this
            return publicObject;
        }
    }   
);
}

export function checkPatient(db){ 
    return [
    checkPrimaryDetails(),
    check('govtID').notEmpty().isString().custom((value)=> {return  isUnique(db.getAllPatients(),value,'govtID')}),
    checkDate('birthDate'),
    check('email').notEmpty().isString(),
    checkAddress('address'),
    check('houseResidentsAmount').notEmpty().isInt(),
    check('isCovidPositive').notEmpty().isBoolean()
    ];
}