import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

export interface FileUploadResponse {
  success: boolean;
  item: any;
  response: any;
  status: any;
  headers: any;
}


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
    private result: FileUploadResponse
    loginForm: form = <form>{}
    constructor( public userService: UserService, private router: Router){
        this.userService.logged( res => this.logindata = res )
        if( this.logindata ){
            this.router.navigate(['/home'])
        }
    }
    
    
    onClickLogin(){
        this.userService.login( this.loginForm, res =>{
            console.log('response ' + res );
            this.router.navigate(['/home'])
        }, err => console.error( 'error : ' + err ) )
    }

    onClickReset(){

    }
    onFocusUserID(){}


}