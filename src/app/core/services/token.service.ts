import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { constanst } from '../constants/constanst';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  isAuthentication: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() {
    const token = this.getToken();
    if(token) {
      this.updateToken(true);
    }
  }
  updateToken(status: boolean) {
    this.isAuthentication.next(status);
  }
  getToken(): string | null {
    return localStorage.getItem(constanst.CURRENT_TOKEN) || null
  }
  setToken(token: string) {
    if(typeof localStorage !== 'undefined') {
      localStorage.setItem(constanst.CURRENT_TOKEN, token);
      this.updateToken(true);
    }
    else {
      console.log('Web Storage is not supported in this environment')
    }
  }
  removeToken() {
    localStorage.removeItem(constanst.CURRENT_TOKEN);
    this.updateToken(false);
  }
}
