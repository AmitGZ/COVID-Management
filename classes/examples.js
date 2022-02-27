export function examples(){
    let examples = {
    patient : {
        "govtID": "d",
        "firstName": "0",
        "lastName": "string",
        "birthDate": "2019-08-24T14:15:22Z",
        "phoneNumber": "string",
        "email": "string@a.coom",
        "address": 
        {
          "city": "sdsd",
          "street": "string",
          "houseNumber": 0,
          "apartmentNumber": 0
        },
        "houseResidentsAmount": 0,
        "isCovidPositive": true
      },
      
    route : {
        "dateOfVisit": "2019-08-24T14:15:22Z",
        "siteName": "string",
        "siteAddress": 
        {
        "city": "string",
        "street": "string",
        "houseNumber": 0,
        "apartmentNumber": 0
        }
      },
      
    encounter : {
        "firstName": "g",
        "lastName": "string",
        "phoneNumber": "string"
        },
      
    labtest : {
        "labID": "string",
        "testID": "g",
        "patientID": "0",
        "testDate": "2019-08-24T14:15:22Z",
        "isCovidPositive": false
        }
    }
    return examples
}