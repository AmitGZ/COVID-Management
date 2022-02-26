export const Person = function (person){
    return (
    Object.assign(
    {
    //private values
    status: null,
    isIsolated: true,
    isCovidPositive: false,
    lab_tests: [],
    negatives_in_a_row: 0,
    added_date: (new Date()),
    addLabTest(lab_test){
        this.lab_tests.push(lab_test)
        this.isCovidPositive = lab_test.isCovidPositive
        if(lab_test.isCovidPositive == false){
            this.negatives_in_a_row++
            this.isIsolated = this.negatives_in_a_row >=2? false:true;
            this.status = 'Healed'
        }
        else
        {
            negatives_in_a_row =0;
            this.status = 'Infected'
        }
    },
    getType(){
        return this.status;
    }
    }
    ,person
))
}
