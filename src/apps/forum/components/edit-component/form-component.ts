import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';



interface form{
  idx: number;
  comment  : string;
  parent_idx: number;

}
interface data{
    id:string,
    session_id
}
@Component( {
    selector: 'form-component',
    templateUrl: 'form-component.html'
})
export class EditFormComponent {
    userData:data = <data>{};
    commentForm: form = <form>{};
    post_idx = false;
    post_index
    // @Input()  mode    : 'comment.write';
    @Output() postLoad   = new EventEmitter();
    @Output() error      = new EventEmitter();
    @Output() success    = new EventEmitter();
    @Output() cancel     = new EventEmitter();
    @Input()  posts: any = null;
    @Input() parentIDX;
       constructor(
        private postService : PostService,
        private userService : UserService
    ) { 
        this.userService.logged( res =>{
            this.userData = JSON.parse(res);
        })
    }


  successCallback( re ) {
    
        try {
            // if ( ! this.post_idx ) {
                console.log("posts1: ", JSON.stringify(this.posts));
                console.log("re:2 ", JSON.stringify(re.data));
                this.posts.unshift( JSON.parse(re).data );
            // }else{
            //   console.log('index', this.post_index )
            //   this.posts.splice( this.post_index, 1, re.post )
            // }
        }
        catch ( e ) { alert("Please restart the app." + e ); }
    
    this.commentForm = <form>{};
    this.success.emit();
  }

    ngOnInit() { 


    }



    // onClickReply() {
    //     this.active = true;
    //     this.mode = 'create-comment';
    //     this.editComponent.initForm( this.mode );
    // }

    // onClickEdit() {
    //     console.log("ViewComponent::onClickEdit()", this.editComponent );
    //     this.active = true;
    //     this.hideContent = true;
    //     if ( this.post.idx == '0' ) this.mode = 'post-edit';
    //     else this.mode = 'edit-comment';
    //     this.editComponent.initForm( this.mode );
    // }




    onEnterComment(event){
        if( event.keyCode == 13){
            console.log('comment ' + event.target.value)
      let data ={
          'mc': 'comment.write',
          'comment': this.commentForm.comment,
          'user_id' : this.userData.id,
          'parent_idx': this.parentIDX
      }
      this.postService.query( data, response =>{
          this.commentForm = <form>{};
          console.log('comment data ' + JSON.stringify(response) + "comments " + JSON.stringify(this.posts));
          let data = JSON.parse(response);
          console.log('checking format ' + JSON.stringify(data))
          this.successCallback(response);
          
      }, err =>alert('Something went wrong ' + err ) )
        }
    }


    


}