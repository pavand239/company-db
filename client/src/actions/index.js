const userRequested =()=>({
    type: 'FETCH_USER_REQUEST'
})
const userLoaded=(user)=>({
    type: 'FETCH_USER_SUCCESS',
    payload: user
})
const userError=(err)=>({
    type: 'FETCH_USER_FAILURE',
    payload: err
})
const userLogout=()=>({
    type: 'USER_LOGOUT'
})
const setAfterLoginRedirectPath = (path) =>({
    type: 'SET_AFTER_LOGIN_REDIRECT',
    payload:path
})
const employeeListRequested=()=>({
    type: 'FETCH_EMPLOYEE_LIST_REQUEST'
})
const employeeListLoaded=(list)=>({
    type: 'FETCH_EMPLOYEE_LIST_SUCCESS',
    payload:list
})
const employeeListError=(err)=>({
    type: 'FETCH_EMPLOYEE_LIST_FAILURE',
    payload: err
})


const fetchUser = (companyDBService) => (token) => (dispatch)=>{
    dispatch(userRequested());
    companyDBService.getMe(token)
        .then(user=>dispatch(userLoaded(user)))
        .catch(error=>dispatch(userError(error)))
}

const fetchEmployeeList = (companyDBService) => (token) => (dispatch)=>{
    console.log('fetched employee list ...')
    dispatch(employeeListRequested());
    companyDBService.getEmployeeList(token)
        .then(list=>dispatch(employeeListLoaded(list)))
        .catch(err=>dispatch(employeeListError(err)))
}

export {
    userRequested,
    userLoaded,
    userError,
    userLogout,
    setAfterLoginRedirectPath,
    fetchUser,
    fetchEmployeeList
}