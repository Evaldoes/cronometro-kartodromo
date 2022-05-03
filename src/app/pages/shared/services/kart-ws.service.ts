import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KartWsService {

  private ws = `${environment.URL_WS}`;
  socket;
  // private userId: UserIdProps;

  constructor() {

    this.socket = io(`${this.ws}`, {
      transports: ['websocket'],
    });
    this.socket.on('connect', () => {
      console.log('connect ws');

      // return;
    });
    this.socket.on('user_id', (data) => {
      // this.setUserId(data);
    });
  }

  public listen(eventName: string): Observable<unknown> {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }

  public emit(eventName: string, data: unknown): void {
    this.socket.emit(eventName, data, (ans: any) => {
      console.log('emit ==> ', ans);

    });
  }

  public setUserId(userId: any): void {
    console.log('user ws ==> ', userId);

    // this.userId = userId;
  }

  public getUserId() {
    // return this.userId;
  }
}
