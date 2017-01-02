import { Component, Input, Output, EventEmitter } from '@angular/core';
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
    @Output() cancel = new EventEmitter();

    constructor(){

    }
    onClickCancel(){
        this.cancel.emit()
    }


}