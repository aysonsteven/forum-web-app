import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

interface form{
    id:string,
    password:string,
    email:string
}
@Component( {
    selector: 'registration-page',
    templateUrl: 'registration.component.html'
})
export class RegistrationPage {
    registration_form:form = <form>{};
    constructor( public userService: UserService, public router: Router ){}

    onClickRegister(){
        if( this.validate() == false) return;
        this.userService.user_register( this.registration_form, res=>{
            console.log('successfull registered ' + res );
            this.router.navigate([''])
        }, err=> alert('error ' + err ))
    }



    validate(){
        if( this.registration_form.email == '' || this.registration_form.email == null){
            alert('enter email');
            return false;
        }
        if( this.registration_form.password == '' || this.registration_form.password == null ){
            alert('no password');
            return false;
        }
        if( this.registration_form.id == '' || this.registration_form.id == null ){
            alert('no uid');
            return false;
        }
        return true;
    }
}