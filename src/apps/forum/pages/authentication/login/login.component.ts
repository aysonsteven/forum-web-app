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
    private uploader;
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
        this.userService.user_login( this.loginForm, res =>{
            console.log('response ' + res );
            this.router.navigate(['/home'])
        }, err => console.error( 'error : ' + err ) )
    }

    onClickReset(){

    }
    onFocusUserID(){}

  onChangeFileBrowser( $event ) {
    this.upload( $event.target.files );
    console.log( $event.target.files )
  }

  upload( files ) {
    console.log("PostEditService::upload()");
    setTimeout( ()=>{

    try {
        this.uploader.addToQueue( files );
        console.log('test ' + JSON.stringify(files))
    }
    catch ( e ) {
        console.log( "Failed to addToQueue() onBrowserUpload()" + e);
    
    } 
    },10000)
  }


    initBrowserUpload() {
        //console.log("initBrowserUpload()");

      this.uploader.onSuccessItem = (item, response, status, headers) => {
        this.result = {
          "success": true,
          "item": item,
          "response": response,
          "status": status,
          "headers": headers
        };
        //console.log( 'onSuccessItem : ', this.result );
      };
      this.uploader.onErrorItem = (item, response, status, headers) => {
        this.result = {
          "success": false,
          "item": item,
          "response": response,
          "status": status,
          "headers": headers
        };
        //console.log( 'onErrorItem : ', this.result );
      };
      this.uploader.onCompleteAll = () => {
          this.onBrowserUploadComplete();
      };
      this.uploader.onAfterAddingFile = ( fileItem ) => {
        //console.log('onAfterAddingFile: ', fileItem);
        fileItem.withCredentials = false; // remove credentials
        fileItem.upload(); // upload file.
    }
  }


   private onBrowserUploadComplete() {
    let response = this.result.response;
    console.log( response );
    if ( response ) {

      // try {
      //   re = JSON.parse( response );
      // }
      // catch ( e ) {
      //   return this.x.error( "Failed on JSON.parse() try in onBrowserUploadComplete(). Please show this message to admin.", e);
      // }

    //   let re = this.x.json( response );
    //   if ( re.success ) this.events.publish( 'file-upload-success', re.data );
    //   else return alert( re.data );
    }
    else return this.errorMaybeServerError();
  }


  errorMaybeServerError() {
    return alert("Please check if file server is alive and check if the photo size is too big.");
  }
}