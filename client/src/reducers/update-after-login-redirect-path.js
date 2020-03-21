export const updateAfterLoginRedirectPath = (state, action) => {
    if (state===undefined) {
        return '/'
    }
    switch (action.type) {
        case 'SET_AFTER_LOGIN_REDIRECT':
            return action.payload;
        default:
            return state.afterLoginRedirectPath;
    }
}