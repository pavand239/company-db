import * as fields from "./form-fields";
import * as Yup from "yup";

export const IncomeCreateConfig = {
    getInitialValues:({id})=>({
        employee:id,
        income_date:'',
        percent:0
    }),
    validationSchema:Yup.object().shape({
        employee:Yup.number()
            .required(),
        income_date:Yup.date()
            .required(),
        percent:Yup.number()
            .min(0, 'Не меньше 0')
            .max(1, 'Не больше 1')
    }),
    formFields:[
        fields.employeeField(false),
        fields.incomeDateField(false),
        fields.percentField(false),
    ]
}
