import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse, IMessage } from '../models/common.model';
import { HttpClient } from '@angular/common/http';
import { apiEndPoint } from '../constants/constanst';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  getAllMessage(): Observable<IApiResponse<IMessage[]>> {
    return this.http.get<IApiResponse<IMessage[]>>(
      `${apiEndPoint.MessageEndPoint}`
    )
  }
  sentMessage(message: IMessage): Observable<IApiResponse<IMessage>> {
    return this.http.post<IApiResponse<IMessage>>(
      `${apiEndPoint.MessageEndPoint}`,
      message
    );
  }

  deleteMessage(message: IMessage): Observable<IApiResponse<IMessage>> {
    return this.http.get<IApiResponse<IMessage>>(
      `${apiEndPoint.MessageEndPoint}/${message._id}/delete`
    );
  }
}
