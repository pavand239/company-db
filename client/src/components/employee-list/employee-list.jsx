import React, {useEffect, useContext, useState} from 'react';
import {ListGroup} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { fetchEmployeeList as fetchEmployeeListAction , selectEmployee } from "../../actions";
import CompanyDBServiceContext from "../company-db-service-context";
import LoadingIndicator from "../loading-indicator";
import EmployeeListItem from "../employee-list-item";


const EmployeeList = () => {
    const companyDBService=useContext(CompanyDBServiceContext),
          dispatch = useDispatch(),
          fetchEmployeeList = (service, token)=>dispatch(fetchEmployeeListAction(service)(token));
    let {employees, isLoading, error}=useSelector(state=>state.employeeList),
        groups = useSelector(state =>state.user.user.groups),
        history = useHistory(),
        [addNewButton, setAddNewButton] = useState(false),
        [changeTaxButton, setChangeTaxButton] = useState(false),
        [presentsTotal, setPresentsTotal] = useState(0);
    useEffect(()=>{
        fetchEmployeeList(companyDBService, localStorage.getItem('token'));
        if (groups.includes('HumanResource')) {
            setAddNewButton(true);
        }
        if (groups.includes('Admin')) {
            setChangeTaxButton(true);
        }
    },[]);
    useEffect(()=>{
        setPresentsTotal(0);
        if (groups.includes('Union')) {
            employees.forEach(employee => {console.log(employee.presents_num); setPresentsTotal(prev=>prev+=employee.presents_num)});
        }
    },[employees])
    if (isLoading && !error) {
        return <LoadingIndicator />
    }
    if (error) {
        return error.message
    }
    if (employees.length===0) {
        return <p>Работников не найдено</p>
    }

    return (
        <ListGroup>
            {changeTaxButton?
                <ListGroup.Item onClick={()=>history.push(`/tax/edit/`)}>
                    <div className='d-flex justify-content-center align-items-center'>
                        <span className='font-weight-bold'>Изменить ставку НДФЛ</span>
                    </div>
                </ListGroup.Item>
            :''}
            { groups.includes('Union')?
                <ListGroup.Item>
                    <div className='d-flex justify-content-center align-items-center'>
                        <span className='font-weight-bold'>Всего необходимо подарков: {presentsTotal}</span>
                    </div>
                </ListGroup.Item>
            :''
            }
            {employees.map(employee => (
                <ListGroup.Item 
                    key = {employee.id}
                    onClick={()=>{
                        history.push(`/${employee.id}/`);
                    }} >
                        <EmployeeListItem employee={employee}
                        />
                </ListGroup.Item>)
            )}
            {addNewButton?
                <ListGroup.Item onClick={()=>history.push(`/create/`)}>
                    <div className='d-flex justify-content-center align-items-center'>
                        <i className="fas fa-plus-circle"></i>
                    </div>
                </ListGroup.Item>
            :''}

        </ListGroup>
    )
}


export default EmployeeList;