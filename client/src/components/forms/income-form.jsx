import React, {useContext} from 'react';
import EditForm from "./edit-form";
import CompanyDBServiceContext from "../company-db-service-context"
import {
    IncomeEditChiefConfig
} from "../form-configs";

const IncomeEdit = ({formConfig}) => {
    const companyDBService = useContext(CompanyDBServiceContext);
    let {getIncome, patchIncome} = companyDBService;
    return <EditForm 
                    getData = {getIncome} 
                    formConfig = {formConfig}
                    patchData = {patchIncome}
                    service ={companyDBService}/>
}

export const IncomeEditChief =()=> <IncomeEdit formConfig={IncomeEditChiefConfig} />