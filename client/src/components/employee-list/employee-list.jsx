import React, {useEffect, useContext, useState} from 'react';
import {ListGroup} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import { fetchEmployeeList } from "../../actions";
import CompanyDBServiceContext from "../company-db-service-context";
import LoadingIndicator from "../loading-indicator";
import EmployeeListItem from "../employee-list-item";

const EmployeeList = ({employeeList, fetchEmployeeList, onClickItem,groups}) => {
    const companyDBService=useContext(CompanyDBServiceContext);
    let {employees, isLoading, error}=employeeList,
        history = useHistory(),
        [addNewButton, setAddNewButton] = useState(false);
    useEffect(()=>{
        fetchEmployeeList(companyDBService, localStorage.getItem('token'));
        if (groups.includes('HumanResource')) {
            setAddNewButton(true);
        }
    },[])
    console.log(employeeList);
    if (isLoading && !error) {
        return <LoadingIndicator />
    }
    if (error) {
        return error.message
    }
    
    return (
        <ListGroup>
            {employees.map(employee => (
                <ListGroup.Item 
                    key = {employee.id}
                    onClick={()=>onClickItem(employee.id)} >
                        <EmployeeListItem employee={employee}
                        />
                </ListGroup.Item>)
            )}
            {addNewButton?
                <ListGroup.Item onClick={()=>history.push(`/employee/create/`)}>
                    <div className='d-flex justify-content-center align-items-center'>
                        <i className="fas fa-plus-circle"></i>
                    </div>
                </ListGroup.Item>
            :''}
        </ListGroup>
    )
}
const mapStateToProps=(state)=>({
    employeeList:state.employeeList,
    groups:state.user.user.groups
})
const mapDispatchToProps = (dispatch)=>({
    fetchEmployeeList:(service, token)=>dispatch(fetchEmployeeList(service)(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList)