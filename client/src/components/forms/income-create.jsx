import React, {useContext, useState} from 'react';
import {CreateForm} from "./create-form";
import CompanyDBServiceContext from "../company-db-service-context"
import { IncomeCreateConfig } from "../form-configs";
import { Redirect, useParams } from 'react-router-dom';

export const IncomeCreate = () => {
    let companyDBService = useContext(CompanyDBServiceContext),
        {id}=useParams(),
        {createIncome} = companyDBService,
        [newId, setNewId] = useState(null),
        afterUpload =()=> {
            console.log('after upload')
            return <Redirect to={`/income/${newId}/`} />
        };
    return <CreateForm  createData={createIncome}
                    formConfig={IncomeCreateConfig}
                    service={companyDBService} 
                    afterUpload={afterUpload}
                    getResponseData={(data)=>setNewId(data.id)}
                    data={{id}}/>
}