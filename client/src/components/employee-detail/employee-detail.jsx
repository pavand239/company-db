import React, {useCallback} from 'react';


import { withCompanyDBService } from '../hoc';
import {useGetData} from "../hooks";
import EmployeeIncomeTable from '../empoyee-income-table';
import EmployeeChildrenTable from '../empoyee-children-table';
import EmployeeEducationTable from '../empoyee-education-table';
import ErrorIndicator from "../error-indicator";
import LoadingIndicator from "../loading-indicator";

const EmployeeDetail = ({employeeId, companyDBService}) => {
    const useGetEmployee = () => {
        let token = localStorage.getItem('token'),
            getEmployee = useCallback(()=>companyDBService.getEmployee(token,employeeId),[employeeId, token]);
        return useGetData(getEmployee);
    }
    let {data, isLoading, error} = useGetEmployee();
    console.log(data)
    if (isLoading && !error) {
        return <LoadingIndicator />
    }
    if (error) {
        return  error.message
    }
    let {surname, name, patronymic, birth_date, birth_place, 
        department, position, passport_series, passport_ID,
        address, salary, attitude_to_conscription:attToCons, 
        marital_status:maritalStatus, sex} = data;
    return (
        <div>
            <h3>{surname} {name} {patronymic}</h3>
            <p>Родился в {birth_date}, {birth_place}</p>
            <p>Отдел: {department}</p>
            <p>Должность: {position}</p>
            <p>Оклад: {salary} руб.</p>
            <p>Пол: {sex}</p>
            <p>Паспорт: {passport_series} {passport_ID}</p>
            <p>Проживает: {address}</p>
            <p>Семейное положение: {maritalStatus}</p>
            <p>Отношение к воинской обязанности: {attToCons}</p>
            <p>Доходы:</p>
            <div className='ml-3 my-3'>
                <EmployeeIncomeTable employeeId={employeeId}/>
            </div>
            <p>Дети:</p>
            <div className='ml-3 my-3'>
                <EmployeeChildrenTable employeeId={employeeId}/>
            </div>
            <p>Образование:</p>
            <div className='ml-3 my-3'>
                <EmployeeEducationTable employeeId={employeeId}/>
            </div>
            
        </div>
    )
}
const EmployeeDetailDefault = (data) => (
    <div>
        <h3>{data.surname} {data.name} {data.patronymic}</h3>
        <p>Родился в {data.birth_date}, {data.birth_place}</p>
        <p>Отдел: {data.department}</p>
        <p>Должность: {data.position}</p>
        <p>Пол: {data.sex}</p>
    </div>
)
const EmployeeDetailChief=(data,childrenData, incomeData, educationData) => (
    <div>
        <p>Оклад: {data.salary} руб.</p>
        <p>Паспорт: {data.passport_series} {data.passport_ID}</p>
        <p>Проживает: {data.address}</p>
        <p>Семейное положение: {data.maritalStatus}</p>
        <p>Отношение к воинской обязанности: {data.attToCons}</p>
    </div>
)
export default withCompanyDBService(EmployeeDetail);