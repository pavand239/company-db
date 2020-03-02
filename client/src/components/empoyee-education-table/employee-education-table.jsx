import React, {useCallback} from 'react';
import {Table} from "react-bootstrap";

import { withCompanyDBService } from '../hoc';
import {useGetData} from "../hooks";
import ErrorIndicator from "../error-indicator";
import LoadingIndicator from "../loading-indicator";

const EmployeeEducationTable=({employeeId, companyDBService})=>{
    const useGetEmployeeEducation = () => {
        let token = localStorage.getItem('token'),
            getEmployeeEducation = useCallback(()=>companyDBService.getEmployeeEducation(token,employeeId),[employeeId, token]);
        return useGetData(getEmployeeEducation);
    }
    let {data, isLoading, error} = useGetEmployeeEducation();
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
                    <th>УЗ</th>
                    <th>Адрес УЗ</th>
                    <th>Форма обучения</th>
                    <th>Год поступления</th>
                    <th>Год окончания</th>
                    <th>Специальность</th>
                    <th>№ диплома</th>
                    <th>Научная степень, звание</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item)=>(
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.edu_inst_name}</td>
                        <td>{item.edu_inst_address}</td>
                        <td>{item.edu_type}</td>
                        <td>{item.admission_year}</td>
                        <td>{item.graduate_year}</td>
                        <td>{item.speciality_name}</td>
                        <td>{item.diploma_num}</td>
                        <td>{item.degree}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default withCompanyDBService(EmployeeEducationTable);