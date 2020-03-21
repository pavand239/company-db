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
    EmployeeSearchChief,
    IncomeCreate,
    ChildCreate,
    EducationCreate,
    TaxEdit
} from "../forms";
import IncomeDetail from "../income-detail";
import EducationDetail from "../education-detail";
import ChildDetail from "../child-detail";


const EmployeePage = ({user, setAfterLoginRedirectPath}) => {
    let history = useHistory();
    const permDenied = <h3>У вас не доступа к этой странице</h3>;
    if (!user) {
        setAfterLoginRedirectPath(history.location.pathname);
        return <Redirect to='/login'/>
    }
    let editEmployeePage = permDenied,
        editIncomePage = permDenied,
        editEducationPage = permDenied,
        editChildPage = permDenied,
        createEmployeePage = permDenied,
        createIncomePage = permDenied,
        createChildPage = permDenied,
        createEducationPage = permDenied,
        searchForm = <EmployeeSearchDefault />,
        {groups} = user;
    if (groups.includes('Chief')) {
        editEmployeePage = <EmployeeEditChief />;
        editIncomePage = <IncomeEditChief />;
        searchForm = <EmployeeSearchChief/>;
    } else if (groups.includes('Accounting')) {
        editEmployeePage = <EmployeeEditAccounting />;
        editIncomePage = <IncomeEditAccounting />;
        createIncomePage = <IncomeCreate />
    } else if (groups.includes('HumanResource')) {
        editEmployeePage = <EmployeeEditHumanResource />;
        editEducationPage = <EducationEditDefault />;
        editChildPage = <ChildEditDefault />;
        searchForm = <EmployeeSearchChief/>;
        createEmployeePage = <EmployeeCreate />;
        createChildPage = <ChildCreate />;
        createEducationPage = <EducationCreate />;
    } else if (groups.includes('Admin')) {
        editEducationPage = <EducationEditDefault />;
        editChildPage = <ChildEditDefault />;
        editEmployeePage = <EmployeeEditAdmin />;
        searchForm = <EmployeeSearchChief/>;
        createChildPage = <ChildCreate />;
        createEducationPage = <EducationCreate />;
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
                <EmployeeList onClickItem = {(id)=>{history.push(`/${id}/`)}}/>
            </Col>
            <Col sm={8}>
                <div  className='border rounded p-5 w-100'>
                    <Switch>
                        <Route  path='/create/'>
                            {createEmployeePage}
                        </Route>
                        <Route exact path='/tax/edit/'>
                            <TaxEdit />
                        </Route>
                        <Route exact path='/income/:id/'>
                            <IncomeDetail />
                        </Route>
                        <Route  path='/income/:id/edit'>
                            {editIncomePage}
                        </Route>
                        <Route exact path='/education/:id/'>
                            <EducationDetail />
                        </Route>
                        <Route  path='/education/:id/edit'>
                            {editEducationPage}
                        </Route>
                        <Route exact path='/child/:id/'>
                            <ChildDetail />
                        </Route>
                        <Route  path='/child/:id/edit'>
                            {editChildPage}
                        </Route>
                        <Route path='/:id/income/create/'>
                            {createIncomePage}
                        </Route>
                        <Route path='/:id/child/create/'>
                            {createChildPage}
                        </Route>
                        <Route path='/:id/education/create/'>
                            {createEducationPage}
                        </Route>
                        <Route path='/:id/edit/'>
                            {editEmployeePage}
                        </Route>
                        <Route exact path='/:id?/'>
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