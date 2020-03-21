import React, {useContext} from 'react';
import EditForm from "./edit-form";
import {useParams, Redirect} from 'react-router-dom';
import CompanyDBServiceContext from "../company-db-service-context"
import {
    TaxEditConfig
} from "../form-configs";

export const TaxEdit = () => {
    const   companyDBService = useContext(CompanyDBServiceContext),
            afterUpload=()=>{
                return <Redirect to={`/`} />
            };
    let {getTax, patchTax} = companyDBService;
    return <EditForm 
                    getData = {getTax} 
                    formConfig={TaxEditConfig}
                    patchData = {patchTax}
                    afterUpload={afterUpload}/>
}