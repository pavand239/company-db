import React from 'react';
import {Row, Col, Jumbotron} from "react-bootstrap";
import {withRouter} from "react-router-dom";

import EmployeeList from "../employee-list";
import EmployeeDetail from "../employee-detail";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const EmployeePage = ({history,match,user}) => {
    let {id} = match.params;
    if (!user) {
        return <Redirect to='/'/>
    }
    return (
        <Row  className='m-4'>
            <Col sm={3}>
                <EmployeeList onClickItem = {(employeeId)=>{history.push(`${employeeId}`)}}/>
            </Col>
            <Col sm={9}>
                <div  className='border rounded p-5 w-100'>
                    <EmployeeDetail />
                </div>
            </Col>
        </Row>
    )
}
const mapStateToProps = (state) => ({
    ...state.user
})

export default connect(mapStateToProps)(withRouter(EmployeePage))