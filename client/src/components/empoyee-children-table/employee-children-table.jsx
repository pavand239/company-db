import React, {useCallback} from 'react';
import {Table} from "react-bootstrap";

import { withCompanyDBService } from '../hoc';
import {useGetData} from "../hooks";
import ErrorIndicator from "../error-indicator";
import LoadingIndicator from "../loading-indicator";

const EmployeeChildrenTable=({employeeId, companyDBService})=>{
    const useGetEmployeeChildren = () => {
        let token = localStorage.getItem('token'),
            getEmployeeChildren = useCallback(()=>companyDBService.getEmployeeChildren(token,employeeId),[employeeId, token]);
        return useGetData(getEmployeeChildren);
    }
    let {data, isLoading, error} = useGetEmployeeChildren();
    console.log(data)
    if (isLoading && !error) {
        return <LoadingIndicator />
    }
    if (error) {
        return  error.message
    }
    return (
        <Table responsive bordered>
            <thead>
                <tr>
                    <th>№</th>
                    <th>ФИО</th>
                    <th>Дата рождения</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item)=>(
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{`${item.surname} ${item.name} ${item.patronymic}`}</td>
                        <td>{item.birth_date}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default withCompanyDBService(EmployeeChildrenTable);