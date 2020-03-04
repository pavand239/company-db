import React, {useContext} from 'react';
import EditForm from "./edit-form";
import CompanyDBServiceContext from "../company-db-service-context"
import {EmployeeEditChiefConfig} from "../form-configs";

export const EmployeeEditChief = () => {
    const companyDBService = useContext(CompanyDBServiceContext);
    let {getEmployee, patchEmployee} = companyDBService;
    return <EditForm 
                    getData = {getEmployee} 
                    formConfig={EmployeeEditChiefConfig}
                    patchData = {patchEmployee}/>
}