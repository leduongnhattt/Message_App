import { Injectable } from '@angular/core';
import { ILogin, ILoginResponse } from '../models/auth.model';
import { HttpClient } from '@angular/common/http';
import { apiEndPoint } from '../constants/constanst';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(data: ILogin) {
    return this.http.post<ILoginResponse>(`${apiEndPoint.AuthEndPoint.login}`, data);
  }
}
