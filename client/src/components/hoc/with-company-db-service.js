import React, {useContext} from 'react';
import CompanyDBServiceContext from "../company-db-service-context"

export const withCompanyDBService = (Wrapped) => (props)=> {
    const companyDBService = useContext(CompanyDBServiceContext);
    return <Wrapped companyDBService={companyDBService} {...props} />
}