import * as fields from "./form-fields";
import * as Yup from "yup";

export const IncomeEditChiefConfig = {
    getInitialValues:(data)=>({
        premium:data['premium']
    }),
    validationSchema:Yup.object().shape({
        premium:Yup.number()
            .min(0,'Премия больше или равна 0')
            .required('Пожалуйста, заполните это поле или установите 0'),
    }),
    formFields:[
        fields.employeeField(),
        fields.incomeDateField(),
        fields.salaryField(),
        fields.percentField(),
        fields.premiumField(false),
        fields.taxField(),
        fields.totalField()
    ]
}
export const IncomeEditAccountingConfig = {
    getInitialValues:(data)=>({
        employee:data['employee'],
        income_date:data['income_date'],
        percent:data['percent']
    }),
    validationSchema:Yup.object().shape({
        employee:Yup.number()
            .required('Необходимое поле'),
        income_date: Yup.date()
            .min(new Date('1900-1-1'), 'Неверная дата')
            .max(new Date(), 'Неверная дата')
            .required('Необходимое поле'),
        percent: Yup.number()
            .min(0,'Миниамльное значение 0')
            .max(1,'Максимальное значение 1')
    }),
    deletePerm:true,
    formFields:[
        fields.employeeField(false),
        fields.incomeDateField(false),
        fields.salaryField(),
        fields.percentField(false),
        fields.premiumField(),
        fields.taxField(),
        fields.totalField()
    ]
}