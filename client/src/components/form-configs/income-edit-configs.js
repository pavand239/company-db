import * as fields from "./form-fields";

export const IncomeEditChiefConfig = {
    getInitialValues:(data)=>({
        premium:data['premium']
    }),
    formFields:[
        fields.employeeField(),
        fields.incomeDateField(),
        fields.salaryField(),
        fields.percentField(),
        fields.premiumField(false),
        fields.totalField()
    ]
}
export const IncomeEditAccountingConfig = {
    getInitialValues:(data)=>({
        employee:data['employee'],
        income_date:data['income_date'],
        percent:data['percent']
    }),
    formFields:[
        fields.employeeField(false),
        fields.incomeDateField(false),
        fields.salaryField(),
        fields.percentField(false),
        fields.premiumField(),
        fields.totalField()
    ]
}