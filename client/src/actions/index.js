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


const fetchUser = (companyDBService) => (token) => (dispatch)=>{
    dispatch(userRequested());
    companyDBService.getMe(token)
        .then(user=>dispatch(userLoaded(user)))
        .catch(error=>dispatch(userError(error)))
}

export {
    userRequested,
    userLoaded,
    userError,
    userLogout,
    setAfterLoginRedirectPath,
    fetchUser
}