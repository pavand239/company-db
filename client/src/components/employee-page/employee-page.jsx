import React from 'react';
import {Row, Col, Accordion, Card} from "react-bootstrap";

import {setAfterLoginRedirectPath} from "../../actions";
import EmployeeList from "../employee-list";
import EmployeeDetail from "../employee-detail";
import { connect } from 'react-redux';
import { Redirect, Route, Switch , useHistory} from 'react-router-dom';
import {
    EmployeeEditChief,
    EmployeeEditAccounting,
    EmployeeEditHumanResource,
    EmployeeEditAdmin,
    IncomeEditChief,
    IncomeEditAccounting,
    EducationEditDefault,
    ChildEditDefault,
    EmployeeCreate,
    EmployeeSearchDefault,
    EmployeeSearchChief
} from "../forms";
import IncomeDetail from "../income-detail";
import EducationDetail from "../education-detail";
import ChildDetail from "../child-detail";


const EmployeePage = ({user, setAfterLoginRedirectPath}) => {
    let history = useHistory();
    if (!user) {
        setAfterLoginRedirectPath(history.location.pathname);
        return <Redirect to='/'/>
    }
    let editEmployeePage = <h3>У вас не доступа для редактирования этого содержимого</h3>,
        editIncomePage = <h3>У вас не доступа для редактирования этого содержимого</h3>,
        editEducationPage = <h3>У вас не доступа для редактирования этого содержимого</h3>,
        editChildPage = <h3>У вас не доступа для редактирования этого содержимого</h3>,
        searchForm = <EmployeeSearchDefault />,
        {groups} = user;
    if (groups.includes('Chief')) {
        editEmployeePage = <EmployeeEditChief />;
        editIncomePage = <IncomeEditChief />;
        searchForm = <EmployeeSearchChief/>;
    } else if (groups.includes('Accounting')) {
        editEmployeePage = <EmployeeEditAccounting />
        editIncomePage = <IncomeEditAccounting />;
    } else if (groups.includes('HumanResource')) {
        editEmployeePage = <EmployeeEditHumanResource />;
        editEducationPage = <EducationEditDefault />;
        editChildPage = <ChildEditDefault />
        searchForm = <EmployeeSearchChief/>;
    } else if (groups.includes('Admin')) {
        editEducationPage = <EducationEditDefault />;
        editChildPage = <ChildEditDefault />;
        editEmployeePage = <EmployeeEditAdmin />;
        searchForm = <EmployeeSearchChief/>;
    }
    return (
        <Row  className='m-4'>
            <Col sm={4}>
                <Accordion>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            <p className='font-weight-bold'>Поиск и фильтрация</p>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                {searchForm}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                <EmployeeList onClickItem = {(id)=>{history.push(`/employee/${id}/`)}}/>
            </Col>
            <Col sm={8}>
                <div  className='border rounded p-5 w-100'>
                    <Switch>
                        <Route  path='/employee/create/'>
                            <EmployeeCreate />
                        </Route>
                        <Route path='/employee/:id/edit/'>
                            {editEmployeePage}
                        </Route>
                        <Route exact path='/employee/:id?/'>
                            <EmployeeDetail />
                        </Route>
                        <Route exact path='/employee/income/:id/'>
                            <IncomeDetail />
                        </Route>
                        <Route  path='/employee/income/:id/edit'>
                            {editIncomePage}
                        </Route>
                        <Route exact path='/employee/education/:id/'>
                            <EducationDetail />
                        </Route>
                        <Route  path='/employee/education/:id/edit'>
                            {editEducationPage}
                        </Route>
                        <Route exact path='/employee/child/:id/'>
                            <ChildDetail />
                        </Route>
                        <Route  path='/employee/child/:id/edit'>
                            {editChildPage}
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