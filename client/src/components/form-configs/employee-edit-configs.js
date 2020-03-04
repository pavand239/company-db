import * as fields from "./form-fields"

export const EmployeeEditChiefConfig = {
    formName:'Редактирование информации о сотруднике (Руководитель организации)',
    getInitialValues:(data)=>({
        position:data['position']
    }),
    formFields:[
        fields.surnameField(),
        fields.nameField(),
        fields.patronymicField(),
        fields.genderField(),
        fields.birthDateField(),
        fields.birthPlaceField(),
        fields.positionField(false),
        fields.departmentField(),
        fields.addressField(),
        fields.maritalStatusField(),
        fields.attToConsField(),
        fields.passportSeriesField(),
        fields.passportIDField(),
        fields.salaryField()
    ]
}
export const EmployeeEditAccountingConfig = {
    formName:'Редактирование информации о сотруднике (Бухгалтер)',
    getInitialValues:(data)=>({
        surname:data['surname'],
        name:data['name'],
        patronymic:data['patronymic'],
        position:data['position'],
        department:data['department'],
        salary:data['salary']
    }),
    formFields:[
        fields.surnameField(false),
        fields.nameField(false),
        fields.patronymicField(false),
        fields.genderField(),
        fields.birthDateField(),
        fields.birthPlaceField(),
        fields.positionField(false),
        fields.departmentField(false),
        fields.passportSeriesField(),
        fields.passportIDField(),
        fields.salaryField(false)
    ]
}
export const EmployeeEditHumanResourceConfig = {
    formName:'Редактирование информации о сотруднике (Отдел кадров)',
    getInitialValues:(data)=>({
        ...data
    }),
    formFields:[
        fields.surnameField(false),
        fields.nameField(false),
        fields.patronymicField(false),
        fields.genderField(false),
        fields.birthDateField(false),
        fields.birthPlaceField(false),
        fields.positionField(false),
        fields.departmentField(false),
        fields.addressField(false),
        fields.maritalStatusField(false),
        fields.attToConsField(false),
        fields.passportSeriesField(false),
        fields.passportIDField(false),
    ]
}