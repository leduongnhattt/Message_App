import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../shared/component/card/card.component';
import { SidebarComponent } from '../../shared/layouts/sidebar/sidebar.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GetAllUser, GetLoggedInUser, UserState } from '../../store/User.State';
import { Observable } from 'rxjs';
import { IUser } from '../../core/models/auth.model';
import { Select, Store } from '@ngxs/store';
import { CommonModule } from '@angular/common';
import { GetAllMessage } from '../../store/MessageState';
import { MessageService } from '../../core/services/message.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-compose',
  standalone: true,
  imports: [CardComponent, SidebarComponent, ReactiveFormsModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './compose.component.html',
  styleUrl: './compose.component.scss'
})
export class ComposeComponent implements OnInit{

    @Select(UserState.getLoggedUser) user$ !: Observable<IUser>;
    @Select(UserState.selectUsers) users$ !: Observable<IUser[]>;
    formBuilder = inject(FormBuilder);
    messageService: MessageService = inject(MessageService);
    toastr: ToastrService = inject(ToastrService);
    store:Store = inject(Store);
    composeForm: FormGroup;

    constructor() {
      this.composeForm = this.formBuilder.group({
        to: new FormControl('', [Validators.required]),
        sender: new FormControl('', [Validators.required]),
        subject: new FormControl('', [Validators.required]),
        body: new FormControl('', [Validators.required]),
      });
    }
  ngOnInit(): void {
    this.user$.subscribe({
      next: (user) => {
        this.composeForm.patchValue({
          sender: user?._id,
        });
        if(!user) {
          this.store.dispatch(new GetLoggedInUser());
        }
      }
    })
    this.store.dispatch(new GetAllUser());
  }

  sentMessage() {
    if(this.composeForm.valid) {
      this.messageService.sentMessage(this.composeForm.value).subscribe({
        next: (response) => {
          this.store.dispatch(new GetAllMessage());
          this.toastr.success(response.message);
        }
      })
    }
  }


}
