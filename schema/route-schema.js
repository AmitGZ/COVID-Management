import {check} from 'express-validator'
import checkDate from './date-schema.js'
import checkAddress from './address-schema.js'

export default [
    checkDate('dateOfVisit'),
    check('siteName').notEmpty().isString(),
    checkAddress('siteAddress')
];