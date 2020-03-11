import React, {useContext} from 'react';
import EditForm from "./edit-form";
import CompanyDBServiceContext from "../company-db-service-context"
import {
    EmployeeEditChiefConfig,
    EmployeeEditAccountingConfig,
    EmployeeEditHumanResourceConfig,
    EmployeeEditAdminConfig
} from "../form-configs";

const EmployeeEdit = ({formConfig}) => {
    const companyDBService = useContext(CompanyDBServiceContext);
    let {getEmployee, patchEmployee} = companyDBService;
    return <EditForm 
                    getData = {getEmployee} 
                    formConfig={formConfig}
                    patchData = {patchEmployee}/>
}
export const EmployeeEditChief = () => <EmployeeEdit formConfig={EmployeeEditChiefConfig} />
export const EmployeeEditAccounting = () => <EmployeeEdit formConfig={EmployeeEditAccountingConfig} />
export const EmployeeEditHumanResource = () =><EmployeeEdit formConfig={EmployeeEditHumanResourceConfig} />
export const EmployeeEditAdmin = () =><EmployeeEdit formConfig={EmployeeEditAdminConfig} />