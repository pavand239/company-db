import {updateUser} from "./update-user"
import {updateAfterLoginRedirectPath} from "./update-after-login-redirect-path"
export const reducer=(state, action)=>{
    return {
        user: updateUser(state,action),
        afterLoginRedirectPath:updateAfterLoginRedirectPath(state, action)
    }
}