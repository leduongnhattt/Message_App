import { IMessage, MessageType } from './../../core/models/common.model';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../shared/component/card/card.component';
import { SidebarComponent } from "../../shared/layouts/sidebar/sidebar.component";
import { MessageItemComponent } from '../../shared/component/message-item/message-item.component';
import { MessageService } from '../../core/services/message.service';
import { GetAllMessage, MessageState } from '../../store/MessageState';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GetLoggedInUser, UserState } from '../../store/User.State';
import { IUser } from '../../core/models/auth.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CardComponent, SidebarComponent, MessageItemComponent, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit{

  @Select(MessageState.selectMessages) messages$ !: Observable<IMessage[]>;
  @Select(UserState.getLoggedUser) user$ !: Observable<IUser>;
  constructor(private messageService: MessageService, private store: Store) {}
  loggedUser: IUser | null = null;
  messageType: MessageType = 'inbox';
  toastr: ToastrService = inject(ToastrService);
  title: string = 'Messages'
  route: ActivatedRoute = inject(ActivatedRoute);
  ngOnInit(): void {

    this.route.data.subscribe({
      next: (data) => {
        this.messageType = data['type'] as MessageType;
        this.loadTitle(this.messageType);
      },
    });

    this.messages$.subscribe({
      next: (value) => {
        if(!value.length) {
          this.store.dispatch(new GetAllMessage())
        }

      }
    });

    this.user$.subscribe({
      next: (user) => {
        this.loggedUser = user;
        if(!user) {
          this.store.dispatch(new GetLoggedInUser())
        }
      }
    })

  }

  loadTitle(data: MessageType) {
    switch(data) {
      case 'sent':
        this.title = 'Sent Messages';
        break;
      case 'trash':
        this.title = 'Trash Messages';
        break;
      default:
        this.title = 'Messages';
    }
  }

  checkMessage(message: IMessage): boolean{
    switch(this.messageType) {
      case 'trash':
        if(message.status === 3) {
          return true;
        }
        break;
      case 'inbox':
        if(message.status === 1 && this.loggedUser?._id === message.sender._id) {
          return true;
        }
        break;
      case 'sent' :
        if(this.loggedUser?._id === message.sender._id) {
          return true;
        }
        break;
      default:
        return false;
    }
    return false
  }
  deleteMessage(data: IMessage) {
    this.messageService.deleteMessage(data).subscribe({
      next: (response) => {
        this.store.dispatch(new GetAllMessage());
        this.toastr.success(response.message);
      },
    });
  }
}
