import React, {useContext} from 'react';
import EditForm from "./edit-form";
import {useParams, Redirect} from 'react-router-dom';
import CompanyDBServiceContext from "../company-db-service-context"
import {
    IncomeEditChiefConfig,
    IncomeEditAccountingConfig
} from "../form-configs";

const IncomeEdit = ({formConfig}) => {
    const   companyDBService = useContext(CompanyDBServiceContext),
            {id} = useParams(),
            afterUpload=()=>{
                return <Redirect to={`/income/${id}`} />
            },
            afterDelete=()=>{
                return <Redirect to='/' />
            }
    let {getIncome, patchIncome, deleteIncome} = companyDBService;
    return <EditForm 
                    getData = {getIncome} 
                    formConfig = {formConfig}
                    patchData = {patchIncome}
                    service ={companyDBService}
                    deleteData={deleteIncome}
                    afterUpload={afterUpload}
                    afterDelete={afterDelete}/>
}

export const IncomeEditChief =()=> <IncomeEdit formConfig={IncomeEditChiefConfig} />
export const IncomeEditAccounting =()=> <IncomeEdit formConfig={IncomeEditAccountingConfig} />