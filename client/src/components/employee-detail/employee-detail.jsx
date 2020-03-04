import React, {useCallback, useContext} from 'react';
import {connect} from 'react-redux';

import { withCompanyDBService } from '../hoc';
import {useGetData} from "../hooks";
import CompanyDBServiceContext from "../company-db-service-context"
import {
    EmployeeIncomeTable,
    EmployeeEducationTable,
    EmployeeChildrenTable
} from '../tables';
import LoadingIndicator from "../loading-indicator";
import ItemDetail from "../item-detail";
import ItemRecord from "../item-record";

// Possible data fields
// {surname, name, patronymic, birth_date, birth_place, 
//     department, position, passport_series, passport_ID,
//     address, salary, attitude_to_conscription:attToCons, 
//     marital_status:maritalStatus, gender}
// Possible user groups
//['Admin','Chief','Accounting','HumanResource','Union']


const EmployeeDetail = ({ user:{groups}}) => {
    let {getEmployee} = useContext(CompanyDBServiceContext);
    let defaultDetail = [
            <ItemRecord label={'Фамилия'} field={'surname'} />,
            <ItemRecord label={'Имя'} field={'name'} />,
            <ItemRecord label={'Отчество'} field={'patronymic'} />,
            <ItemRecord label={'Дата рождения'} field={'birth_date'} />,
            <ItemRecord label={'Место рождения'} field={'birth_place'} />,
            <ItemRecord label={'Отдел'} field={'department'} />,
            <ItemRecord label={'Должность'} field={'position'} />
        ],
        adminDetail = [
            <ItemRecord label={'Адрес:'} field={'address'} />,
            <ItemRecord label={'Семейное положение'} field={'marital_status'} />,
            <ItemRecord label={'Отношение к воинской обязанности'} field={'attitude_to_conscription'} />,
        ],
        humanResDetail = [
            <ItemRecord label={'Серия паспорта'} field={'passport_series'} />,
            <ItemRecord label={'Номер паспорта'} field={'passport_ID'} />,
        ],
        accountingDetail = [
            <ItemRecord label={'Оклад'} field={'salary'} />,
        ],
        detail = [...defaultDetail];
    if (groups.includes('Chief')) {
        detail=[...detail, ...adminDetail, ...humanResDetail, ...accountingDetail]
    } else if (groups.includes('Accounting')) {
        detail=[...detail, ...humanResDetail, ...accountingDetail]
    } else if (groups.includes('HumanResource')) {
        detail=[...detail, ...adminDetail, ...humanResDetail];
    } else if (groups.includes('Admin')) {
        detail=[...detail, adminDetail];
    }
    
    
    if (groups.includes('Chief') || 
        groups.includes('Accounting') ||
        groups.includes('Admin') ||
        groups.includes('Union') ||
        groups.includes('HumanResource')) {
            detail=[...detail, <EmployeeChildrenTable />]
    }
    if (groups.includes('Chief') || 
        groups.includes('Admin') ||
        groups.includes('HumanResource')) {
            detail=[...detail, <EmployeeEducationTable />]
    }
    if (groups.includes('Chief') || 
        groups.includes('Accounting')) {
            detail=[...detail, <EmployeeIncomeTable />]
    }


    return (
        <div>
            <ItemDetail getData={getEmployee}>
                {detail}
            </ItemDetail>
        </div>
    )
}


const mapStateToProps = (state) => ({
    ...state.user
})
export default connect(mapStateToProps)(withCompanyDBService(EmployeeDetail));