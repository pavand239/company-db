import React, { useContext, useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { selectEmployee } from '../../actions';
import CompanyDBServiceContext from "../company-db-service-context";
import {
    EmployeeIncomeTable,
    EmployeeEducationTable,
    EmployeeChildrenTable
} from '../tables';
import ItemDetail from "../item-detail";
import ItemRecord, {ManyFieldItemRecord} from "../item-record";

// Possible data fields
// {surname, name, patronymic, birth_date, birth_place, 
//     department, position, passport_series, passport_ID,
//     address, salary, attitude_to_conscription:attToCons, 
//     marital_status:maritalStatus, gender}
// Possible user groups
//['Admin','Chief','Accounting','HumanResource','Union']


const EmployeeDetail = () => {
    let {getEmployee} = useContext(CompanyDBServiceContext),
        [detail, setDetail] = useState([]),
        [buttonEdit, setButtonEdit] = useState(false),
        groups=useSelector(state =>state.user.user.groups),
        dispatch=useDispatch();
    let defaultDetail = [
            <ManyFieldItemRecord fieldToDisplay={['surname','name','patronymic']} className='h3'/>,
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
    
    



    let {id} = useParams();
    if (!id) {
        return <h3>Выберите объект из списка</h3>
    }

    return (
        <ItemDetail 
            getData={getEmployee} 
            buttonEdit={buttonEdit && id}
            actionWithItem={(employee)=>dispatch(selectEmployee(employee))}>
            {detail}
        </ItemDetail>
    )
}


export default EmployeeDetail;