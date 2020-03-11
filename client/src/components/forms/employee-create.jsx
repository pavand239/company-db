import React, {useContext} from 'react';
import CreateForm from "./create-form";
import CompanyDBServiceContext from "../company-db-service-context"
import { EmployeeCreateConfig } from "../form-configs";

export const EmployeeCreate = ()=>{
    let companyDBService = useContext(CompanyDBServiceContext),
        {createEmployee} = companyDBService;
    return <CreateForm  createData={createEmployee}
                        formConfig={EmployeeCreateConfig}
                        service={companyDBService} />
}


