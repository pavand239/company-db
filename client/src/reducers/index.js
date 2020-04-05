import {updateUser} from "./update-user"
import {updateAfterLoginRedirectPath} from "./update-after-login-redirect-path"
import { updateEmployeeList } from "./update-employee-list";
import { updateSelectedEmployee } from './update-selected-employee';
export const reducer=(state, action)=>{
    return {
        user: updateUser(state,action),
        afterLoginRedirectPath:updateAfterLoginRedirectPath(state, action),
        employeeList:updateEmployeeList(state,action),
        selectedEmployee: updateSelectedEmployee(state, action)
    }
}