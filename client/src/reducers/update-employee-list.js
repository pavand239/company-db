export const updateEmployeeList = (state, action) => {
    if (state===undefined) {
        return {
            employees:[],
            isLoading:false,
            error:null
        }
    }
    switch (action.type) {
        case 'FETCH_EMPLOYEE_LIST_REQUEST':
            return {
                employees:[],
                isLoading:true,
                error:null
            }
        case 'FETCH_EMPLOYEE_LIST_SUCCESS':
            return {
                employees:action.payload,
                isLoading:false,
                error:null
            }
        case 'FETCH_EMPLOYEE_LIST_FAILURE':
            return {
                employees:[],
                isLoading:false,
                error:action.payload
            }
            
        default:
            return state.employeeList;
    }
}