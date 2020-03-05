import React, { useContext, useState, useEffect } from 'react';
import {useHistory, useParams} from "react-router-dom";
import {connect} from 'react-redux';

import CompanyDBServiceContext from "../company-db-service-context";
import {
    EmployeeIncomeTable,
    EmployeeEducationTable,
    EmployeeChildrenTable
} from '../tables';
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
    let {getEmployee} = useContext(CompanyDBServiceContext),
        [detail, setDetail] = useState([]),
        [buttonEdit, setButtonEdit] = useState(false);
    let defaultDetail = [
            <ItemRecord label={'Фамилия'} field={'surname'} />,
            <ItemRecord label={'Имя'} field={'name'} />,
            <ItemRecord label={'Отчество'} field={'patronymic'} />,
            <ItemRecord label={'Пол'} field={'gender'} />,
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
        ];
    useEffect(()=>{
        if (groups.includes('Chief')) {
            setDetail([...defaultDetail, ...adminDetail, ...humanResDetail, ...accountingDetail])
        } else if (groups.includes('Accounting')) {
            setDetail([...defaultDetail, ...humanResDetail, ...accountingDetail])
        } else if (groups.includes('HumanResource')) {
            setDetail([...defaultDetail, ...adminDetail, ...humanResDetail])
        } else if (groups.includes('Admin')) {
            setDetail([...defaultDetail, ...adminDetail])
        } else {
            setDetail([...defaultDetail])
        }
        
        
        if (groups.includes('Chief') || 
            groups.includes('Accounting') ||
            groups.includes('Admin') ||
            groups.includes('Union') ||
            groups.includes('HumanResource')) {
                setDetail(prevState =>([...prevState, <EmployeeChildrenTable />]))
                // detail=[...detail, <EmployeeChildrenTable />]
        }
        if (groups.includes('Chief') || 
            groups.includes('Admin') ||
            groups.includes('HumanResource')) {
                setDetail(prevState =>([...prevState, <EmployeeEducationTable />]))
                // detail=[...detail, <EmployeeEducationTable />]
        }
        if (groups.includes('Chief') || 
            groups.includes('Accounting')) {
                setDetail(prevState =>([...prevState, <EmployeeIncomeTable />]))
                // detail=[...detail, <EmployeeIncomeTable />]
        }
        if (groups.includes('Chief') || 
            groups.includes('Accounting') ||
            groups.includes('Admin') ||
            groups.includes('HumanResource')){
                setButtonEdit(true)
        }
    },[])
    
    



    let history = useHistory(),
        {id} = useParams();
    return (
        <div>
            <div className='d-flex flex-row-reverse'>
            {buttonEdit && id?
                <i className="fa fa-cog p-3" aria-hidden="true" onClick={()=>history.push('edit')}></i>:''
            }
            </div>
            <ItemDetail getData={getEmployee}>
                {detail}
            </ItemDetail>
        </div>
    )
}


const mapStateToProps = (state) => ({
    ...state.user
})
export default connect(mapStateToProps)(EmployeeDetail);