
export function isUnique(array, value, arg_name){
    for (let i =0; i<array.length; i++) {
        if (array[i].get()[arg_name] == value) {
            return Promise.reject('ID taken')
        }
    }
    return true;
}

function getHowManyDaysAgo(date){
    date = new Date(date)
    let current = new Date().toISOString().slice(0, 10)
    current = new Date(current)
    return (current-date)/(1000*60*60*24);
}

export function isDateSmaller(date1,date2){
    //this funciton receives two dates and returns true if date1<=date2, else false
    date1 = new Date(date1)
    date2 = new Date(date2)
    if(date1<=date2)
        return true;
    return false;
}

//remove maybe
export function isDateFormat(value){
    return Boolean(value.match(/\d{4}-([0][1-9]|[1][0-2])-([0][1-9]|[1-2][0-9]|[3][0-1])/))
}

export function getAllById(arr, id, arg_name){
    let tmp = [];
    for (let i =0; i<arr.length; i++)
        if (arr[i][arg_name] == id)
            tmp.push(arr[i]);
    return tmp;
}

export function getSingleById(arr, id, arg_name){
    let tmp;
    for (let i =0; i<arr.length; i++)
        if (arr[i][arg_name] == id){
            tmp = arr[i];
            break;
        }
    return tmp;
}