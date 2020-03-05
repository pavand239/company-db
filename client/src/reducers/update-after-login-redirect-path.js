export const updateAfterLoginRedirectPath = (state, action) => {
    if (state===undefined) {
        return '/employee/'
    }
    switch (action.type) {
        case 'SET_AFTER_LOGIN_REDIRECT':
            return action.payload;
        default:
            return state.afterLoginRedirectPath;
    }
}