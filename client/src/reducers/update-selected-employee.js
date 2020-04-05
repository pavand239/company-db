export const updateSelectedEmployee=(state, action)=>{
    if (state===undefined){
        return null
    }
    switch (action.type) {
        case 'SELECT_EMPLOYEE':
            return action.payload;
        case 'CLEAR_EMPLOYEE':
            return null
        default:
            return state.selectedEmployee;
    }
}