import React, {useContext} from 'react';
import EditForm from "./edit-form";
import {useParams, Redirect} from 'react-router-dom';
import CompanyDBServiceContext from "../company-db-service-context"
import {
    EducationEditConfig
} from "../form-configs";

const EducationEdit = ({formConfig}) => {
    const   companyDBService = useContext(CompanyDBServiceContext),
            {id} = useParams(),
            afterUpload=()=>{
                return <Redirect to={`/employee/income/${id}`} />
            },
            afterDelete=()=>{
                return <Redirect to='/employee/' />
            };
    let {getEducation, patchEducation, deleteEducation} = companyDBService;
    return <EditForm 
                    getData = {getEducation} 
                    formConfig={formConfig}
                    patchData = {patchEducation}
                    service = {companyDBService}
                    deleteData={deleteEducation}
                    afterDelete={afterDelete}
                    afterUpload={afterUpload}/>
}

export const EducationEditDefault = () => <EducationEdit formConfig={EducationEditConfig} />