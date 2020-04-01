import React, {useContext, useState} from 'react';
import {CreateForm} from "./create-form";
import CompanyDBServiceContext from "../company-db-service-context"
import { ChildCreateConfig } from "../form-configs";
import { Redirect, useParams } from 'react-router-dom';

export const ChildCreate = () => {
    let companyDBService = useContext(CompanyDBServiceContext),
        {id}=useParams(),
        {createChild} = companyDBService,
        [newId, setNewId] = useState(null),
        afterUpload =()=> {
            console.log('after upload')
            return <Redirect to={`/child/${newId}/`} />
        };
    return <CreateForm  createData={createChild}
                    formConfig={ChildCreateConfig}
                    service={companyDBService} 
                    afterUpload={afterUpload}
                    getResponseData={(data)=>setNewId(data.id)}
                    data={{id}}/>
}