import { Injectable } from '@angular/core';
import { ILogin, ILoginResponse } from '../models/auth.model';
import { HttpClient } from '@angular/common/http';
import { apiEndPoint } from '../constants/constanst';
import { TokenService } from './token.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private tokenSerivce: TokenService) { }

  login(data: ILogin) {
    return this.http.post<ILoginResponse>(`${apiEndPoint.AuthEndPoint.login}`, data)
      .pipe(
        map((response) => {
          if(response && response.data.token) {
            this.tokenSerivce.setToken(response.data.token);
          }
          return response;
        })
      )
  }
  logout() {
    return this.http.get(`${apiEndPoint.AuthEndPoint.logout}`).pipe(map((response) => {
      if(response) {
        this.tokenSerivce.removeToken();
      }
      return response;
    }))
  }
}
