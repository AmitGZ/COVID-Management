import { check } from 'express-validator'

export function checkPrimaryDetails(){ 
    return [
    check('firstName').notEmpty().isString(),
    check('lastName').notEmpty().isString(),
    check('phoneNumber').notEmpty().isString(),
    ];
}
