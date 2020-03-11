import * as fields from "./form-fields"

export const ChildEditConfig = {
    formName:'Редактирование информации о ребенке сотрудника',
    getInitialValues:   (data)=>({
                            ...data
                        }),
    formFields:[
        fields.employeeField(false, true),
        fields.surnameField(false),
        fields.nameField(false),
        fields.patronymicField(false)
    ]
}