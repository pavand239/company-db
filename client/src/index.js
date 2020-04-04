import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import store from "./store";
import {Provider} from "react-redux"
import {BrowserRouter as Router} from "react-router-dom";

import ErrorBoundry from "./components/error-boundry";
import CompanyDBService from "./services/company-db-service";
import CompanyDBServiceDev from "./services/company-db-service-dev";
import CompanyDBServiceContext from "./components/company-db-service-context";

const companyDBService = new CompanyDBServiceDev();
ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundry>
            <Router>
                <CompanyDBServiceContext.Provider value={companyDBService}>
                    <App />
                </CompanyDBServiceContext.Provider>
            </Router>
        </ErrorBoundry>
    </Provider>
    , document.getElementById('root'));

