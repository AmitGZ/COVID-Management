import express from 'express';
const app = express();
const PORT = 3000; //listening on port 3000

app.use(express.json()) //using express to parse json requests
import  { check, validationResult }  from 'express-validator';
import res from 'express';
import patientSchema from "./schema/patient-schema.js";
import routeSchema from "./schema/route-schema.js";
import checkDate from './schema/date-schema.js'

// initializing the app
app.listen(
    PORT,
   () => {console.log(`listening on http://localhost:${PORT}`)}
)

//initializing patinets list.

let patients = [];
let routes = [];
let encounters = [];
let labtests = [];
patients.push({govtID : 'a', name : 'b'})

function getPatientById(id){
    let tmp;
    for (let i =0; i<patients.length; i++){
        if (patients[i].govtID == id){
            tmp = patients[i];
            break;
        }
    }
    return tmp;
}

function getRoutesById(id){
    let tmp = [];
    for (let i =0; i<routes.length; i++)
        if (routes[i].id == id)
            tmp.push(routes[i]);
    return tmp;
}

function getEncountersById(id){
    let tmp = [];
    for (let i =0; i<encounters.length; i++)
        if (encounters[i].id == id)
            tmp.push(encounters[i]);
    return tmp;
}

function getHowManyDaysAgo(date){
    date = new Date(date)
    let current = new Date().toISOString().slice(0, 10)
    current = new Date(current)
    return (current-date)/(1000*60*60*24);
}

function isDateSmaller(date1,date2){
    //this funciton receives two dates and returns true if date1<=date2, else false
    date1 = new Date(date1)
    date2 = new Date(date2)
    if(date1<=date2)
        return true;
    return false;
}

function getLabTestById(id){
    let tmp;
    for (let i =0; i<labtests.length; i++)
        if (labtests[i].labID == id)
            tmp = labtests[i];
    return tmp;
}

//get patients request
app.get(`/patients`, (req, res) => {
    res.status(200).send({            
        patients
    })
});

//add new patient request
app.put(`/patients`,
    [patientSchema,
    check('govtID').notEmpty().isString().custom(value => {
        if(getPatientById(value))
            return Promise.reject('ID taken')
        return true;
     })
    ],
    (req,res)=>{
        //error handling
        const errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(400).send(errors);

        //handling valid request
        patients.push(req.body);
        return res.status(200).send({
            patients
        });
});

//get full patient
app.get(`/patients/:id/full`,(req,res)=>{
    const {id} = req.params;

    let patient = getPatientById(id)

    if(!patient)    //incase patient doesn't exist 
        return res.status(400).send(`error patient with ID = ${id} not found`)
    
    return res.status(200).send(patient)
});

//add route request
app.put(`/patients/:id/route` ,   
[routeSchema],
(req,res)=>{
    //error handling
    const errors = validationResult(req);
    if(!errors.isEmpty())
        return res.status(400).send(errors);

    const {id} = req.params;
    let patient = getPatientById(id)

    if(!patient) //incase patient doesn't exist 
        return res.status(400).send(`error patient with ID = ${id} not found`)
    
    routes.push(req.body)
    routes[routes.length-1].id = id;
    return res.status(200).send({
        routes
    });
});

//get route by id
app.get(`/patients/:id/route`,(req,res)=>{
     const {id} = req.params;
     let patient = getPatientById(id)
  
     if(!patient)   //incase patient doesn't exist
         return res.status(400).send(`error patient with ID = ${id} not found`)

    let patient_route = getRoutesById(id)
    return res.status(200).send({
        patient_route
    });
})

//add encounters request
app.put(`/patients/:id/encounters` ,   
[
    check('firstName').notEmpty().isString(),
    check('lastName').notEmpty().isString(),
    check('phoneNumber').notEmpty().isString()
],
(req,res)=>{
    //error handling
    const errors = validationResult(req);
    if(!errors.isEmpty())
        return res.status(400).send(errors);

    const {id} = req.params;
    let patient = getPatientById(id)

    //incase patient doesn't exist 
    if(!patient)
        return res.status(400).send(`error patient with ID = ${id} not found`)
    
    encounters.push(req.body)
    encounters[encounters.length-1].id = id;
    return res.status(200).send({
        encounters
    });
});

//get encounters by id
app.get(`/patients/:id/encounters`,(req,res)=>{
     const {id} = req.params;
     let patient = getPatientById(id)
  
     if(!patient)     //incase patient doesn't exist
         return res.status(400).send(`error patient with ID = ${id} not found`)

    let patient_encounter = getEncountersById(id)
    return res.status(200).send({
        patient_encounter
    });
})

//get patients since time
app.get(`/patients/new`,(req,res)=>{
    const value = req.query.since;

    //check date format
    if(!value.match(/\d{4}-([0][1-9]|[1][0-2])-([0][1-9]|[1-2][0-9]|[3][0-1])/))
        return res.status(400).send(`invalid date ${value}`)

    console.log(isDateSmaller(value,'2012-10-11'))

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
        check('labID').notEmpty().isString(),
        //NOT WORKING
        check('testID').notEmpty().isString().custom((value)=>{
            if(getLabTestById(value))
                return Promise.reject('ID taken')
            return true;
        }),
        check('patientID').notEmpty().isString(),
        checkDate('testDate'),
        check('isCovidPositive').notEmpty().isBoolean()
    ],
    (req,res)=>{
        //error handling
        const errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(400).send(errors);

        let patient = getPatientById(req.body.patientID)
        if(!patient)   //incase patient doesn't exist 
            return res.status(400).send(`error patient with ID = ${req.body.patientID} not found`)

        labtests.push(req.body)
        return res.status(200).send(req.body.patientID);
    }
);