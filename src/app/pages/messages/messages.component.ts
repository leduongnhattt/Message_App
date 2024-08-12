import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CardComponent } from '../../shared/component/card/card.component';
import { SidebarComponent } from "../../shared/layouts/sidebar/sidebar.component";
import { MessageItemComponent } from '../../shared/component/message-item/message-item.component';
import { MessageService } from '../../core/services/message.service';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CardComponent, SidebarComponent, MessageItemComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit{

    constructor(private messageService: MessageService) {}
  ngOnInit(): void {
    this.getAllMessages();
  }
  getAllMessages() {
    this.messageService.getAllMessage().subscribe({
      next(value) {
        console.log(value)
      }
    })
  }
}
