import React, {useContext} from 'react';
import EditForm from "./edit-form";
import {useParams, Redirect} from 'react-router-dom';
import CompanyDBServiceContext from "../company-db-service-context"
import {
    ChildEditConfig
} from "../form-configs";

const ChildEdit = ({formConfig}) => {
    const   companyDBService = useContext(CompanyDBServiceContext),
            {id} = useParams(),
            afterUpload=()=>{
                return <Redirect to={`/employee/child/${id}`} />
            },
            afterDelete=()=>{
                return <Redirect to='/employee/' />
            };  
    let {getChild, patchChild, deleteChild} = companyDBService;
    return <EditForm 
                    getData = {getChild} 
                    formConfig={formConfig}
                    patchData = {patchChild}
                    service = {companyDBService}
                    deleteData={deleteChild}
                    afterDelete={afterDelete}
                    afterUpload={afterUpload}/>
}

export const ChildEditDefault = () => <ChildEdit formConfig={ChildEditConfig} />