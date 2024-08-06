import { Routes } from '@angular/router';
import { MessagesComponent } from './pages/messages/messages.component';
import { MasterComponent } from './shared/layouts/master/master.component';
import { ComposeComponent } from './pages/compose/compose.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  {
    path: '', component: MasterComponent,
    children: [
      {
        path: 'message', component: MessagesComponent
      },
      {
        path: 'compose', component: ComposeComponent
      },
      {
        path: '', component: LoginComponent
      },
      {
        path: 'register', component: RegisterComponent
      }
    ]
  },
];
