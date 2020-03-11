import React, {useContext} from 'react';
import EditForm from "./edit-form";
import CompanyDBServiceContext from "../company-db-service-context"
import {
    EducationEditConfig
} from "../form-configs";

const EducationEdit = ({formConfig}) => {
    const companyDBService = useContext(CompanyDBServiceContext);
    let {getEducation, patchEducation} = companyDBService;
    return <EditForm 
                    getData = {getEducation} 
                    formConfig={formConfig}
                    patchData = {patchEducation}
                    service = {companyDBService}/>
}

export const EducationEditDefault = () => <EducationEdit formConfig={EducationEditConfig} />