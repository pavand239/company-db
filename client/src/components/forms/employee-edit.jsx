import React, {useContext} from 'react';
import {useParams, Redirect} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {fetchEmployeeList} from '../../actions';
import EditForm from "./edit-form";
import CompanyDBServiceContext from "../company-db-service-context"
import {
    EmployeeEditChiefConfig,
    EmployeeEditAccountingConfig,
    EmployeeEditHumanResourceConfig,
    EmployeeEditAdminConfig
} from "../form-configs";

const EmployeeEdit = ({formConfig}) => {
    const   companyDBService = useContext(CompanyDBServiceContext),
            {id} = useParams(),
            dispatch=useDispatch(),
            afterUpload=()=>{
                return <Redirect to={`/${id}/`} />
            },
            afterDelete=()=>{
                dispatch(fetchEmployeeList(companyDBService)(localStorage.getItem('token')))
                return <Redirect to='/' />
            }
    let {getEmployee, patchEmployee, deleteEmployee} = companyDBService;
    return <EditForm 
                    getData = {getEmployee} 
                    formConfig={formConfig}
                    patchData = {patchEmployee}
                    deleteData={deleteEmployee}
                    afterUpload={afterUpload}
                    afterDelete={afterDelete}/>
}
export const EmployeeEditChief = () => <EmployeeEdit formConfig={EmployeeEditChiefConfig} />
export const EmployeeEditAccounting = () => <EmployeeEdit formConfig={EmployeeEditAccountingConfig} />
export const EmployeeEditHumanResource = () =><EmployeeEdit formConfig={EmployeeEditHumanResourceConfig} />
export const EmployeeEditAdmin = () =><EmployeeEdit formConfig={EmployeeEditAdminConfig} />