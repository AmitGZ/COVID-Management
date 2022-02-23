import {check} from 'express-validator'
import checkDate from './date-schema.js'
import checkAddress from './address-schema.js'

export default [
    check('firstName').notEmpty().isString(),
    check('lastName').notEmpty().isString(),
    checkDate('birthDate'),
    check('phoneNumber').notEmpty().isString(),
    check('email').notEmpty().isString(),
    checkAddress('address'),
    check('houseResidentsAmount').notEmpty().isInt(),
    check('isCovidPositive').notEmpty().isBoolean()
];
