import React, {useCallback} from 'react';
import {ListGroup} from "react-bootstrap";
import {withRouter} from "react-router-dom";

import { withCompanyDBService } from '../hoc';
import {useGetData} from "../hooks";
import LoadingIndicator from "../loading-indicator";
import EmployeeListItem from "../employee-list-item";

const EmployeeList = ({onClickItem,companyDBService}) => {
    const useGetEmployees = () => {
        let token = localStorage.getItem('token'),
            getEmployees = useCallback(()=>companyDBService.getEmployeeList(token),[token]);
        return useGetData(getEmployees);
    }
    let {data, isLoading, error} = useGetEmployees();
    if (isLoading && !error) {
        return <LoadingIndicator />
    }
    if (error) {
        return error.message
    }
    return (
        <ListGroup>
            {data.map(employee => (
                <ListGroup.Item 
                    key = {employee.id}
                    onClick={()=>onClickItem(employee.id)} >
                        <EmployeeListItem employee={employee}
                        />
                </ListGroup.Item>)
            )}
        </ListGroup>
    )
}


export default withRouter(withCompanyDBService(EmployeeList))