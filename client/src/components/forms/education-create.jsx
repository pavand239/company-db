import React, {useContext, useState} from 'react';
import {CreateForm} from "./create-form";
import CompanyDBServiceContext from "../company-db-service-context"
import { EducationCreateConfig } from "../form-configs";
import { Redirect, useParams } from 'react-router-dom';

export const EducationCreate = () => {
    let companyDBService = useContext(CompanyDBServiceContext),
        {id}=useParams(),
        {createEducation} = companyDBService,
        [newId, setNewId] = useState(null),
        afterUpload =()=> {
            console.log('after upload')
            return <Redirect to={`/education/${newId}/`} />
        };
    return <CreateForm  createData={createEducation}
                    formConfig={EducationCreateConfig}
                    service={companyDBService} 
                    afterUpload={afterUpload}
                    getResponseData={(data)=>setNewId(data.id)}
                    data={{id}}/>
}