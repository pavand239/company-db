import React, {useContext, useState} from 'react';
import {CreateForm} from "./create-form";
import CompanyDBServiceContext from "../company-db-service-context"
import { EmployeeCreateConfig } from "../form-configs";
import {connect} from "react-redux";
import {fetchEmployeeList} from "../../actions";
import { Redirect } from 'react-router-dom';

const EmployeeCreate = ({fetchEmployeeList})=>{
    let companyDBService = useContext(CompanyDBServiceContext),
        {createEmployee} = companyDBService,
        [newId,setNewId] = useState(null),
        afterUpload =()=> {
            fetchEmployeeList(companyDBService, localStorage.getItem('token'));
            return <Redirect to={`/employee/${newId}/`} />
        }
    return <CreateForm  createData={createEmployee}
                        formConfig={EmployeeCreateConfig}
                        service={companyDBService} 
                        afterUpload={afterUpload}
                        getResponseData={(data)=>setNewId(data.id)}/>
}

const mapDispatchToProps = (dispatch)=>({
    fetchEmployeeList:(service, token)=>dispatch(fetchEmployeeList(service)(token))
})

export default connect(()=>({}),mapDispatchToProps)(EmployeeCreate)
