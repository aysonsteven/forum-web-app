import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { PostService } from '../../../services/post.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component( {
    selector: 'forumhome-page',
    templateUrl: 'forumhome.html'
})


export class ForumHomePage {
    userData;
    showForm:boolean = false;
    opt = {};
    posts;
    constructor( private postService: PostService, private userService: UserService ){
        console.info('user logged ')
        
        this.userService.logged( res =>{
            this.userData = JSON.parse(res);
        })
        console.log('login data '+  this.userData )
        this.getPostList();
    }
    onClickShowPostForm(){
        this.showForm = true;
    }


  getPostList(){
    this.opt={
      'mc' : 'post.fetch',
      'options': {
        'orderby':'idx DESC'
        }
    }
    this.postService.query( this.opt, res=>{
      this.posts = res
      let arr = _.values(res.data.rows)
      console.log( 'posts ' + this.posts )
    //   this.loading = false;
    }, e=>{
        this.posts = JSON.parse(e).data;
        console.log('posts ' + this.posts)
    })
  }


  onClickDelete( post, index){
      if( this.userData.id != post.user_id) alert('not your post');
      let data = [];
      data['idx'] = post.idx;
      data['mc'] = 'post.delete'
      console.log('idx ' + post.idx)
    let confirmDelete = confirm('are you sure you want to delete');
    if( confirmDelete == false ) return;
    this.postService.query( data  , response =>{
        this.posts.splice(index, 1)
    }, err =>console.info('Something went wrong ' + err ) )
  }

  editComponentOnSuccess(){
      console.log('succes')
  }

}