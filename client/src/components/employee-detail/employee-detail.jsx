import React, {useCallback} from 'react';
import {connect} from 'react-redux';

import { withCompanyDBService } from '../hoc';
import {useGetData} from "../hooks";
import EmployeeIncomeTable from '../empoyee-income-table';
import EmployeeChildrenTable from '../empoyee-children-table';
import EmployeeEducationTable from '../empoyee-education-table';
import ErrorIndicator from "../error-indicator";
import LoadingIndicator from "../loading-indicator";

// Possible data fields
// {surname, name, patronymic, birth_date, birth_place, 
//     department, position, passport_series, passport_ID,
//     address, salary, attitude_to_conscription:attToCons, 
//     marital_status:maritalStatus, gender}
// Possible user groups
//['Admin','Chief','Accounting','HumanResource','Union']


const EmployeeDetail = ({employeeId, companyDBService, user:{user:{groups}}}) => {
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
    let moreDetail = '';

    if (groups.includes('Chief') || 
        groups.includes('Accounting') || 
        groups.includes('HumanResource')) {
            moreDetail = <EmployeeDetailChief data={data} />
    } else if (groups.includes('Admin')) {
        moreDetail = <EmployeeDetailAdmin data={data} />
    }
    return (
        <div>
            <EmployeeDetailDefault data={data} />
            {moreDetail}
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
const EmployeeDetailDefault = ({data}) => {
    let {surname, name, patronymic, birth_date, birth_place, 
        department, position, gender} = data;
    return (
        <div>
            <h3>{surname} {name} {patronymic}</h3>
            <p>Родился в {birth_date}, {birth_place}</p>
            <p>Отдел: {department}</p>
            <p>Должность: {position}</p>
            <p>Пол: {gender}</p>
        </div>
    )
}
const EmployeeDetailAdmin=({data}) => {
    let {address, salary, attitude_to_conscription:attToCons, 
        marital_status:maritalStatus} = data;
    return (
        <div>
            <p>Оклад: {salary} руб.</p>
            <p>Проживает: {address}</p>
            <p>Семейное положение: {maritalStatus}</p>
            <p>Отношение к воинской обязанности: {attToCons}</p>
        </div>
    )
}
const EmployeeDetailChief=({data}) => {
    let {passport_series, passport_ID,
        address, salary, attitude_to_conscription:attToCons, 
        marital_status:maritalStatus} = data;
    return (
        <div>
            <p>Оклад: {salary} руб.</p>
            <p>Паспорт: {passport_series} {passport_ID}</p>
            <p>Проживает: {address}</p>
            <p>Семейное положение: {maritalStatus}</p>
            <p>Отношение к воинской обязанности: {attToCons}</p>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user:state.user
})
export default connect(mapStateToProps)(withCompanyDBService(EmployeeDetail));