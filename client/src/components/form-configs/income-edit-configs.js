import * as fields from "./form-fields";

export const IncomeEditChiefConfig = {
    getInitialValues:(data)=>({
        premium:data['premium']
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