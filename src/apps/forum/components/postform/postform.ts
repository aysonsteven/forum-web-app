import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';



interface form{
  post  : string;

}

@Component( {
    selector: 'post-component',
    templateUrl: 'postform.html'
})
export class PostComponent {
    post_idx;
    postForm: form = <form>{};
    userData ={};

    constructor( private postService: PostService, private userService: UserService){
        this.userService.logged( res=>{
            this.userData = res;
        })
        console.log('userData ' + this.userData )
    }


  onClickSubmit(){
      let body = {
          'mc': 'post.write',
          'post': this.postForm.post
      }
      this.postService.post( body, res=>{
          console.log('response ' + JSON.stringify(res) )
      }, err=>alert('err'))
  }



}