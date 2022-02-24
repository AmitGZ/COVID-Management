import { check } from 'express-validator'
import { checkDate } from './date-schema.js'
import { checkAddress } from './Address.js'
import { getAllById } from './functions.js'

export class Routes{
    constructor(){
        this.routes = [];
    }

    addRoute(route,id){
        this.routes.push(route)
        this.routes[this.routes.length-1].id =id
    }

    getAll(){
        return this.routes;
    }

    getById(id){
        return getAllById(this.routes ,id ,'id')
    }
}

export function checkRoute(){ 
    return [
    checkDate('dateOfVisit'),
    check('siteName').notEmpty().isString(),
    checkAddress('siteAddress')
    ];
}