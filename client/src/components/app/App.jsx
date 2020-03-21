import React from 'react';
import {Container} from "react-bootstrap";
import {Switch, Route} from "react-router-dom";

import EmployeePage from "../employee-page";
import AppHeader from "../app-header";
import LoginPage from "../login-page"


export const App = () => {
    return (
        <>
            <AppHeader />
            <Container fluid>
                <Switch>
                    <Route exact path='/login/'>
                        <LoginPage />
                    </Route>
                    <Route path='/:id?/'>
                        <EmployeePage/>
                    </Route>


                    <Route>
                        <h2 className='m-5 text-center'>Page not found</h2>
                    </Route>
                </Switch>
            </Container>
        </>       
    )
}
