import React, {useCallback} from 'react';
import {Table} from "react-bootstrap";

import { withCompanyDBService } from '../hoc';
import {useGetData} from "../hooks";
import ErrorIndicator from "../error-indicator";
import LoadingIndicator from "../loading-indicator";

const EmployeeIncomeTable=({employeeId, companyDBService})=>{
    const useGetEmployeeIncome = () => {
        let token = localStorage.getItem('token'),
            getEmployeeIncome = useCallback(()=>companyDBService.getEmployeeIncome(token,employeeId),[employeeId, token]);
        return useGetData(getEmployeeIncome);
    }
    let {data, isLoading, error} = useGetEmployeeIncome();
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
                    <th>Дата</th>
                    <th>Оклад</th>
                    <th>Процент</th>
                    <th>Премия</th>
                    <th>Всего</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item)=>(
                    <tr key={item.id}>
                        <td>{item.income_date}</td>
                        <td>{item.salary}</td>
                        <td>{item.percent}</td>
                        <td>{item.premium}</td>
                        <td>{item.get_total}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default withCompanyDBService(EmployeeIncomeTable);