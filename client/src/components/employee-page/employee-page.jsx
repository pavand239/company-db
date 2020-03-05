import React from 'react';
import {Row, Col} from "react-bootstrap";

import {setAfterLoginRedirectPath} from "../../actions";
import EmployeeList from "../employee-list";
import EmployeeDetail from "../employee-detail";
import { connect } from 'react-redux';
import { Redirect, Route, Switch , useHistory} from 'react-router-dom';
import {
    EmployeeEditChief,
    EmployeeEditAccounting,
    EmployeeEditHumanResource
} from "../forms"

const EmployeePage = ({user, setAfterLoginRedirectPath}) => {
    let history = useHistory();
    if (!user) {
        setAfterLoginRedirectPath(history.location.pathname);
        return <Redirect to='/'/>
    }
    let editPage = <h3>У вас не доступа для редактирования этого содержимого</h3>,
        {groups} = user;
    if (groups.includes('Chief')) {
        editPage = <EmployeeEditChief />
    } else if (groups.includes('Accounting')) {
        editPage = <EmployeeEditAccounting />
    } else if (groups.includes('HumanResource')) {
        editPage = <EmployeeEditHumanResource />
    }
    return (
        <Row  className='m-4'>
            <Col sm={3}>
                <EmployeeList onClickItem = {(id)=>{history.push(`/employee/${id}/`)}}/>
            </Col>
            <Col sm={9}>
                <div  className='border rounded p-5 w-100'>
                    <Switch>
                        <Route path='/employee/:id/edit/'>
                            {editPage}
                        </Route>
                        <Route exact path='/employee/:id?/'>
                            <EmployeeDetail />
                        </Route>
                    </Switch>
                </div>
            </Col>
        </Row>
    )
}
const mapStateToProps = (state) => ({
    ...state.user
})
const mapActionsToProps = (dispatch) => ({
    setAfterLoginRedirectPath:(path) => dispatch(setAfterLoginRedirectPath(path))
})

export default connect(mapStateToProps,mapActionsToProps)(EmployeePage)