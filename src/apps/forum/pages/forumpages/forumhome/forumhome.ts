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
    showForm:boolean = false;
    opt = {};
    posts = [];
    constructor( private postService: PostService ){
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

}