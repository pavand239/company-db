import * as fields from "./form-fields";
import * as Yup from "yup";



export const EmployeeEditChiefConfig = {
    formName:'Редактирование информации о сотруднике (Руководитель организации)',
    validationSchema:Yup.object().shape({
        position:Yup.string()
            .max(100,'Максимальная длина 100')
            .required('Необходимое поле')
    }),
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
    validationSchema:Yup.object().shape({
        salary:Yup.number()
            .positive('Оклад должен быть больше 0')
            .required('Необходимое поле')
        
    }),
    getInitialValues:(data)=>({
        salary:data['salary']
    }),
    formFields:[
        fields.surnameField(),
        fields.nameField(),
        fields.patronymicField(),
        fields.salaryField(false)
    ]
}
export const EmployeeEditHumanResourceConfig = {
    formName:'Редактирование информации о сотруднике (Отдел кадров)',
    getInitialValues:(data)=>({
        ...data
    }),
    deletePerm:true,
    validationSchema:Yup.object().shape({
        surname:Yup.string()
            .min(2,'Минимальная длина 2 символа')
            .max(100,'Максимальная длина 100 символов')
            .required('Необходимое поле'),
        name:Yup.string()
            .min(2,'Минимальная длина 2 символа')
            .max(100,'Максимальная длина 100 символов')
            .required('Необходимое поле'),
        patronymic: Yup.string()
            .min(2,'Минимальная длина 2 символа')
            .max(100,'Максимальная длина 100 символов'),
        gender: Yup.string()
            .required('Необходимое поле'),
        birth_date: Yup.date()
            .min(new Date('1900-1-1'),'Неправильная дата')
            .max(new Date(),'Неправильная дата')
            .required('Необходимое поле'),
        birth_place: Yup.string()
            .max(250,'Максимальная длина 250')
            .required('Необходимое поле'),
        position:Yup.string()
            .max(100,'Максимальная длина 100')
            .required('Необходимое поле'),
        department:Yup.string()
            .max(100,'Максимальная длина 100')
            .required('Необходимое поле'),
        address:Yup.string()
            .max(200,'Максимальная длина 200')
            .required('Необходимое поле'),
        marital_status: Yup.string()
            .required('Необходимое поле'),
        attitude_to_conscription:Yup.string()
            .required('Необходимое поле'),
        passport_series:Yup.string()
            .matches(/(\d{4})/,'Серия паспорта - 4 цифры')
            .length(4,'Серия паспорта - 4 цифры')
            .required('Необходимое поле'),
        passport_ID:Yup.string()
            .matches(/(\d{6})/,'Номер паспорта - 6 цифр')
            .length(6,'Серия паспорта - 6 цифры')
            .required('Необходимое поле'),
    }),
    formFields:[
        fields.photoField(),
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
export const EmployeeEditAdminConfig = {
    formName:'Редактирование информации о сотруднике (Администратор)',
    getInitialValues:(data)=>({
        ...data
    }),
    validationSchema:Yup.object().shape({
        surname:Yup.string()
            .min(2,'Минимальная длина 2 символа')
            .max(100,'Максимальная длина 100 символов')
            .required('Необходимое поле'),
        name:Yup.string()
            .min(2,'Минимальная длина 2 символа')
            .max(100,'Максимальная длина 100 символов')
            .required('Необходимое поле'),
        patronymic: Yup.string()
            .min(2,'Минимальная длина 2 символа')
            .max(100,'Максимальная длина 100 символов'),
        gender: Yup.string()
            .matches(/(m|f)/)
            .required('Необходимое поле'),
        birth_date: Yup.date()
            .min(new Date('1900-1-1'),'Неправильная дата')
            .max(new Date(),'Неправильная дата')
            .required('Необходимое поле'),
        birth_place: Yup.string()
            .max(250,'Максимальная длина 250')
            .required('Необходимое поле'),
        address:Yup.string()
            .max(200,'Максимальная длина 200')
            .required('Необходимое поле'),
        marital_status: Yup.string()
            .required('Необходимое поле'),
        attitude_to_conscription:Yup.string()
            .required('Необходимое поле'),
    }),
    formFields:[
        fields.surnameField(false),
        fields.nameField(false),
        fields.patronymicField(false),
        fields.genderField(false),
        fields.birthDateField(false),
        fields.birthPlaceField(false),
        fields.positionField(),
        fields.departmentField(),
        fields.addressField(false),
        fields.maritalStatusField(false),
        fields.attToConsField(false),
    ]
}