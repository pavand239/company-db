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

const fetchUser = (companyDBService) => (token) => (dispatch)=>{
    console.log(token)
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
    fetchUser
}