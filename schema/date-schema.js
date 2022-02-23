import {check} from 'express-validator'

export default (function checkDate(arg_name){ 
        return [
        check(arg_name).notEmpty() //checking if the birthdate matches the format.
        .matches(/\d{4}-([0][1-9]|[1][0-2])-([0][1-9]|[1-2][0-9]|[3][0-1])T([0-1][0-9]|[2][0-3]):([0-5][0-9]):([0-5][0-9])Z/),
        ];
    }
)