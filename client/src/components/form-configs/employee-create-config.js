import * as fields from "./form-fields";
import * as Yup from "yup";

export const EmployeeCreateConfig = {
    formName:"Добавление нового работника",
    getInitialValues:()=>({
        gender:"m",
        attitude_to_conscription:"neu",
        marital_status:"n",
        surname:"",
        name:"",
        patronymic:"",
        birth_date:"",
        birth_place:"",
        department:"",
        position:"",
        passport_series:"",
        passport_ID:"",
        address:"", 
        salary:0
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
        passport_series:Yup.string()
            .matches(/(\d{4})/,'Серия паспорта - 4 цифры')
            .length(4,'Серия паспорта - 4 цифры')
            .required('Необходимое поле'),
        passport_ID:Yup.string()
            .matches(/(\d{6})/,'Номер паспорта - 6 цифр')
            .length(6,'Серия паспорта - 6 цифры')
            .required('Необходимое поле'),
        marital_status: Yup.string()
            .required('Необходимое поле'),
        attitude_to_conscription:Yup.string()
            .required('Необходимое поле'),
        salary: Yup.number()
            .positive('Оклад больше 0')
            .required('Необходимое поле')
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
        fields.passportSeriesField(false),
        fields.passportIDField(false),
        fields.maritalStatusField(false),
        fields.attToConsField(false),
        fields.salaryField(false)
    ]
}