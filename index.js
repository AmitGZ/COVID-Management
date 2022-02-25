import express from 'express';//   
const app = express();
const PORT = 3000; //listening on port 3000

app.use(express.json()) //using express to parse json requests
import { check, validationResult }  from 'express-validator';
import { Patients ,checkPatient } from "./classes/Patients.js";
import { Routes, checkRoute } from "./classes/Route.js";
import { checkDate } from './classes/date-schema.js'
import { checkLabTest } from './classes/LabTests.js';
import { checkPrimaryDetails } from './classes/primary-details.js';
import { isDateSmaller , isDateFormat } from './classes/functions.js'
import { PotentialPatients, checkPotentialPatient } from './classes/PotentialPatients.js';

// initializing the app
app.listen(
    PORT,
   () => {console.log(`listening on http://localhost:${PORT}`)}
)

//initializing dataset.
let patients = new Patients;
let routes = new Routes;
let potential_patients = new PotentialPatients;
let labtests = [];
var counterID=0;
//for debug
//patients.addPatient({govtID : 'a', name : 'b'})

function getEncountersById(id){
    let tmp = [];
    for (let i =0; i<encounters.length; i++)
        if (encounters[i].id == id)
            tmp.push(encounters[i]);
    return tmp;
}

//get patients request
app.get(`/patients`, (req, res) => {
    res.status(200).send(patients.getAll())
});

//add new patient request
app.put(`/patients`,
    [checkPatient(patients.getAll())],
    (req,res)=>{
        //error handling
        const errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(400).send(errors);

        //handling valid request
        patients.addPatient(req.body);
        return res.status(200).send(patients.getAll());
});

//get full patient
app.get(`/patients/:id/full`,(req,res)=>{
    const {id} = req.params;

    let patient = patients.getById(id)

    if(!patient)    //incase patient doesn't exist 
        return res.status(400).send(`error patient with ID = ${id} not found`)
    let arr=[];
    arr.push(patient);
    arr.push(labtests);
    return res.status(200).send(arr)
});

//add route request
app.put(`/patients/:id/route` ,   
checkRoute(),
(req,res)=>{
    //error handling
    const errors = validationResult(req);
    if(!errors.isEmpty())
        return res.status(400).send(errors);

    const {id} = req.params;

    if(!patients.getById(id)) //incase patient doesn't exist 
        return res.status(400).send(`error patient with ID = ${id} not found`)
    
    routes.addRoute(req.body,id)
    return res.status(200).send(routes.getAll());
});

//get route by id
app.get(`/patients/:id/route`,(req,res)=>{
     const {id} = req.params;
  
     if(!patients.getById(id))   //incase patient doesn't exist
         return res.status(400).send(`error patient with ID = ${id} not found`)

    return res.status(200).send(routes.getById(id));
})

//add encounters request
app.put(`/patients/:id/encounters` ,   
[
    checkPrimaryDetails()
],
(req,res)=>{
    //error handling
    const errors = validationResult(req);
    if(!errors.isEmpty())
        return res.status(400).send(errors);

    const {id} = req.params;

    let patient =patients.getById(id)
    //incase patient doesn't exist 
    if(!patient)
        return res.status(400).send(`error patient with ID = ${id} not found`)
    
    potential_patients.addPotentialPatient(req.body, patient)
    return res.status(200).send({
        potential_patients
    });
});

app.get(`/patients/potential`,(req,res)=>{
    let arr=[];
    for(let i in patients){
        
    }
    arr.push(potential_patients.getAll());
    //patients.getAll()
    return res.status(200).send(arr);
})

//get encounters by id
app.get(`/patients/:id/encounters`,(req,res)=>{
     const {id} = req.params;
  
     if(!patients.getById(id))     //incase patient doesn't exist
         return res.status(400).send(`error patient with ID = ${id} not found`)

    let patient_encounter = getEncountersById(id)
    let tmp_enconters=[];
    //tmp_enconters.push(patient_encounter);
    return res.status(200).send({
        patient_encounter
    });
})

//get patients since time
app.get(`/patients/new`,(req,res)=>{
    const value = req.query.since;

    //check date format
    if(!isDateFormat(value))
        return res.status(400).send(`invalid date ${value}`)

    //find patients after value and insert to tmp
    let tmp = []
    for (let i=0; i< labtests.length; i++){
        if(isDateSmaller(value,labtests[i].testDate))
            if(labtests[i].isCovidPositive)
                tmp.push(labtests[i].patientID)
    }
    
    return res.status(200).send(tmp)
});

app.post(`/labtests` ,
    [
        checkLabTest(labtests)
    ],
    (req,res)=>{
        //error handling
        const errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(400).send(errors);

        let patient = patients.getById(req.body.patientID)
        if(!patient)   //incase patient doesn't exist 
            return res.status(400).send(`error patient with ID = ${req.body.patientID} not found`)

        labtests.push(req.body)
        return res.status(200).send(req.body.patientID);
    }
);

//get labtests returns twice same person
//adding labtests searches through id's