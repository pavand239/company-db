import {updateUser} from "./update-user"

export const reducer=(state, action)=>{
    return {
        user: updateUser(state,action),
    }
}