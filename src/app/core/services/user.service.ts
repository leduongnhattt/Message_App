import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../models/auth.model';
import { IApiResponse } from '../models/common.model';
import { apiEndPoint } from '../constants/constanst';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  loggedInUser(): Observable<IApiResponse<IUser>> {
    return this.http.get<IApiResponse<IUser>>(`${apiEndPoint.AuthEndPoint.me}`);
  }

  getAllUsers(): Observable<IApiResponse<IUser[]>> {
    return this.http.get<IApiResponse<IUser[]>>(`${apiEndPoint.UsersEndPoint}`);
  }
}
