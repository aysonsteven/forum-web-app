import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

interface form{
    id:string,
    password:string
}
@Component( {
    selector: 'login-page',
    templateUrl: 'login.component.html'
})
export class LoginPage {
    logindata
    loginForm: form = <form>{}
    constructor( public userService: UserService, private router: Router){
        this.userService.logged( res => this.logindata = res )
        if( this.logindata ){
            this.router.navigate(['/questions'])
        }
    }
    
    
    onClickLogin(){
        this.userService.user_login( this.loginForm, res =>{
            console.log('response ' + res );
            this.router.navigate(['/questions'])
        }, err => console.error( 'error : ' + err ) )
    }

    onClickReset(){

    }
    onFocusUserID(){}
}