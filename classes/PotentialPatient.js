import { Person } from "./Person.js"
import { check } from 'express-validator'

export const PotentialPatient =function (potential_patient){return Object.assign(
    Person(potential_patient),
    {
        status: 'PotentialPatient',
        getPublic: function(){
            //remove these fields
            const { isIsolated,isPositive, lab_tests, negatives_in_a_row, isCovidPositive,added_date,status, ...publicObject } = this
            return publicObject;
        }
    }   
);
}

export function checkPrimaryDetails(){ 
    return [
    check('firstName').notEmpty().isString(),
    check('lastName').notEmpty().isString(),
    check('phoneNumber').notEmpty().isString(),
    ];
}