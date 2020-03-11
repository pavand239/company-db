import * as fields from "./form-fields"

export const EducationEditConfig = {
    formName: 'Редактирование информации об образовании сотрудника',
    getInitialValues:   (data)=>({
                            ...data
                        }),
    formFields:[
        fields.employeeField(false),
        fields.eduInstNameField(false),
        fields.eduInstAdddressField(false),
        fields.facultyField(false),
        fields.eduTypeField(false),
        fields.admYearField(false),
        fields.gradYearField(false),
        fields.specialityField(false),
        fields.diplomaNumField(false),
        fields.degreeField(false)
    ]
}