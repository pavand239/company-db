import * as fields from "./form-fields";

export const EmployeeSearchConfigDefault = {
    formName:"Поиск и фильтрация",
    getInitialValues: {
        search:'',
        gender:''
    },
    formFields:[
        fields.searchField(),
        fields.genderField(false),
    ]
}
export const EmployeeSearchConfigChief = {
    formName:"Поиск и фильтрация",
    getInitialValues: {
        search:'',
        gender:'',
        marital_status:'',
        attitude_to_conscription:'',
    },
    formFields:[
        fields.searchField(),
        fields.genderField(false),
        fields.maritalStatusField(false),
        fields.attToConsField(false)
    ]
}
