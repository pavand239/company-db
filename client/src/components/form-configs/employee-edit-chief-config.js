import {
    surnameField,
    nameField,
    patronymicField,
    positionField,
    departmentField
} from "./form-fields"

export const EmployeeEditChiefConfig = {
    formName:'Редактирование информации о сотруднике',
    getInitialValues:(data)=>({
        position:data['position']
    }),
    formFields:[
        surnameField(),
        nameField(),
        patronymicField(),
        positionField(false),
        departmentField()
    ]
}