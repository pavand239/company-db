import React, {useContext} from 'react';
import EditForm from "./edit-form";
import CompanyDBServiceContext from "../company-db-service-context"
import {
    ChildEditConfig
} from "../form-configs";

const ChildEdit = ({formConfig}) => {
    const companyDBService = useContext(CompanyDBServiceContext);
    let {getChild, patchChild} = companyDBService;
    return <EditForm 
                    getData = {getChild} 
                    formConfig={formConfig}
                    patchData = {patchChild}
                    service = {companyDBService}/>
}

export const ChildEditDefault = () => <ChildEdit formConfig={ChildEditConfig} />