import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';



interface form{
  idx: number;
  post  : string;

}
interface data{
    id:string,
    session_id
}
@Component( {
    selector: 'view-component',
    templateUrl: 'view-component.html'
})
export class PostComponent {




}