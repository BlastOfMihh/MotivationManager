import { Injectable } from "@angular/core"

export const UserType = {
  BASIC: 'basic',
  MANAGER: 'manager',
  ADMIN: 'admin'
}

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
    
    constructor(){
    }
    get_current_user(){
        return {
            username: localStorage.getItem('username'),
            user_type: localStorage.getItem('user_type')
        }
    }
    hasWriteAcces():boolean{
        let user_type=localStorage.getItem('user_type')
        if (user_type !== null ){
            return [UserType.ADMIN, UserType.MANAGER].includes(user_type)
        }
        return false
    }
    isAdmin():boolean{
        let user_type=localStorage.getItem('user_type')
        if (user_type !== null ){
            return user_type==UserType.ADMIN
        }
        return false
    }
}