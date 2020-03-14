import React, {useContext} from 'react';
import {useDispatch} from "react-redux";
import {SearchForm }from "./search-form";
import CompanyDBServiceContext from "../company-db-service-context"
import { fetchEmployeeList } from "../../actions";
import {
    EmployeeSearchConfigDefault,
    EmployeeSearchConfigChief
 } from "../form-configs";

const EmployeeSearch =({formConfig})=>{
    const   companyDBService = useContext(CompanyDBServiceContext),
            dispatch = useDispatch(),
            onSubmit = (values)=> {
                let notEmptyValues={};
                for (let value in values) {
                    if(values[value]!=='') {
                        notEmptyValues[value] = values[value]
                    }
                }
                dispatch(fetchEmployeeList(companyDBService)(localStorage.getItem('token'),notEmptyValues));
            };
    return <SearchForm formConfig={formConfig}
                onSubmit={onSubmit} />
}

export const EmployeeSearchDefault = () => <EmployeeSearch formConfig={EmployeeSearchConfigDefault} />
export const EmployeeSearchChief = () => <EmployeeSearch formConfig={EmployeeSearchConfigChief} />

