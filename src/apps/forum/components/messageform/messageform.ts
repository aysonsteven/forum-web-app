import { Component } from '@angular/core';
import { Router } from '@angular/router';





interface form{
    id:string,
    password:string
}

@Component( {
    selector: 'message-component',
    templateUrl: 'messageform.html'
})
export class MessageComponent {

    constructor(){

    }
    


}