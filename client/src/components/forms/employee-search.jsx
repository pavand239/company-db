import React, {useContext} from 'react';
import {useDispatch} from "react-redux";
import {SearchForm }from "./search-form";
import CompanyDBServiceContext from "../company-db-service-context"
import { fetchEmployeeList } from "../../actions";
import { EmployeeSearchConfig } from "../form-configs";

export const EmployeeSearch =()=>{
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
    return <SearchForm formConfig={EmployeeSearchConfig}
                onSubmit={onSubmit} />
}

