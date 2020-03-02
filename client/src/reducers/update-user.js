export const updateUser=(state, action)=>{
    if (state===undefined){
        return {
            user:null,
            error:null,
            isLoading:false
        }
    }
    switch (action.type) {
        case 'FETCH_USER_REQUEST':
            return {
                user:null,
                error:null,
                isLoading:true
            }
        case 'FETCH_USER_SUCCESS':
            return {
                user:action.payload,
                error:null,
                isLoading:false
            }
        case 'FETCH_USER_FAILURE':
            return {
                user:null,
                error:action.payload,
                isLoading:false
            }
        case 'USER_LOGOUT':
            return {
                user:null,
                error:null,
                isLoading:false
            }
        default:
            return state.user;
    }
}