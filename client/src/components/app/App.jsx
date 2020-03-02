import React from 'react';
import {Container} from "react-bootstrap";
import {Switch, Route} from "react-router-dom";

import CompanyDBServiceTest from "../../services/company-db-service-test";
import CompanyDBService from "../../services/company-db-service";
import CompanyDBServiceContext from "../company-db-service-context";
import EmployeePage from "../employee-page";
import AppHeader from "../app-header";
import LoginPage from "../login-page"

export const App = () => {
    return (
        <>
            <AppHeader />
            <Container>
                <Switch>
                    <Route exact path='/employee/:id?'>
                        <EmployeePage/>
                    </Route>
                    <Route exact path='/'>
                        <LoginPage />
                    </Route>
                    <Route>
                        <h2 className='m-5 text-center'>Page not found</h2>
                    </Route>
                </Switch>
            </Container>
        </>       
    )
}
