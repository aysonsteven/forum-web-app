import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Server, MEMBER_LOGIN } from './server';
// import { FileUploader } from 'ng2-file-upload/components/file-upload/file-uploader.class';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';

const SESSION_ID = 'session-id';
@Injectable()

export class UserService extends Server{
    private uploader;
    private result
    constructor( public http: Http){
        super( http );
        this.uploader = new FileUploader({ url: 'http://work.org/forum-backend/?mc=user.upload' });
    }

    buildQuery( params : any ) {
        return this.http_build_query( params );
    }
  upload( files ) {
    console.log("PostEditService::upload()");
    try {
        this.uploader.addToQueue( files );
        console.log('test ' + JSON.stringify(files))
    }
    catch ( e ) {
        alert( "Failed to addToQueue() onBrowserUpload()" );
    }
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
    console.log(response);
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


    query( data : any, successCallback : any, errorCallback  : any ) {
        let body = this.buildQuery( data );
        console.log("debug url: ", this.server  + '?' + body );
        this.http.post( this.server, body, this.requestOptions )
            .subscribe( data => {
                try {
                    let re = JSON.parse( data['_body'] );
                    if ( re['code'] ) return errorCallback( re['message'] );
                    //console.log('query::sucess: ', data);
                    successCallback( re['data'] );
                }
                catch( e ) {
                    //console.log(data);
                    errorCallback(data['_body']);
                }
            });
    }



    user_search( options : any, successCallback: (re:any) => void, errorCallback: (error:string) => void ) {
        let data = {};
        data['mc'] = 'user.search';
        data['options'] = options;
        this.query( data, successCallback, errorCallback );
    }

    user_get( id : any, successCallback: (re:any) => void, errorCallback: (error:string) => void ) {
        let data = { mc: 'user.get', id: id};
        this.query( data, successCallback, errorCallback );
    }


    setLoginData( data ) : void {
        let login = { id: data.id, session_id: data.session_id };
        let str = JSON.stringify( data );
        localStorage.setItem( MEMBER_LOGIN, str );
    }
 
    user_register( data : any, successCallback: (session_id:string) => void, errorCallback: (error:string) => void ) {
        data['mc'] = 'user.register';
        this.query( data, (session_id : any)  => {
            localStorage.setItem( SESSION_ID, session_id );
          console.log('session Id',  localStorage.getItem( SESSION_ID ));
            successCallback( session_id );
        }, errorCallback );
    }

    logout() {
        localStorage.removeItem( SESSION_ID );
    }

    /**
     * Login and save login session id
     */
    user_login( data : any, successCallback: (session_id:string) => void, errorCallback: (error:string) => void ) {
        data['mc'] = 'user.login';
        this.query( data, (session_id : any )=> {
            localStorage.setItem( SESSION_ID, session_id );
            successCallback( session_id );
        let login;
            login ={
            id: data.user_id,
            session_id: data.session_id
        }
        console.log('login ' + data.user_id)
        this.setLoginData( login )
        console.log('login ' + JSON.stringify(login))
        }, errorCallback );
    }


    /**
     * Check if the user has has session
     */
    logged( yesCallback: ( session_id: string ) => void, noCallback?: () => void ) {
        let session_id = localStorage.getItem( SESSION_ID );
        if ( session_id ) yesCallback( session_id );
        else noCallback? noCallback() : console.log("no callback is undefined");
    }


    

    http_build_query (formdata : any, numericPrefix='', argSeparator='') { 
            var urlencode = this.urlencode;
            var value : any
            var key : any
            var tmp : any = []
            var _httpBuildQueryHelper = function (key : any, val : any, argSeparator : any) {
                var k : any
                var tmp : any = []
                if (val === true) {
                val = '1'
                } else if (val === false) {
                val = '0'
                }
                if (val !== null) {
                if (typeof val === 'object') {
                    for (k in val) {
                    if (val[k] !== null) {
                        tmp.push(_httpBuildQueryHelper(key + '[' + k + ']', val[k], argSeparator))
                    }
                    }
                    return tmp.join(argSeparator)
                } else if (typeof val !== 'function') {
                    return urlencode(key) + '=' + urlencode(val)
                } else {
                    throw new Error('There was an error processing for http_build_query().')
                }
                } else {
                return ''
                }
            }

            if (!argSeparator) {
                argSeparator = '&'
            }
            for (key in formdata) {
                value = formdata[key]
                if (numericPrefix && !isNaN(key)) {
                key = String(numericPrefix) + key
                }
                var query = _httpBuildQueryHelper(key, value, argSeparator)
                if (query !== '') {
                tmp.push(query)
                }
            }

            return tmp.join(argSeparator)
        }


        urlencode (str : any) {
            str = (str + '')
            return encodeURIComponent(str)
                .replace(/!/g, '%21')
                .replace(/'/g, '%27')
                .replace(/\(/g, '%28')
                .replace(/\)/g, '%29')
                .replace(/\*/g, '%2A')
                .replace(/%20/g, '+')
        }

}