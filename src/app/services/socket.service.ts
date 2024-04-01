import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { io, Socket } from "socket.io-client";
import { environment } from 'src/environments/environment';
import { Game, RoleSetting, User } from "../models/models";

// https://catalincodes.com/posts/socketio-with-angular
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket!: Socket;
  private errorSubject!: Subject<string>;
  private connectionSubject!: Subject<boolean>;
  connected$!: Observable<boolean>;
  error$!: Observable<string>;
  game$ = new BehaviorSubject<Game | undefined>(undefined);
  userId$ = new BehaviorSubject<string>('');

  createOrJoinGame(userName: string) {
    if (!this.socket || this.socket.disconnected) {
      this.socket = io(environment.socketEndpoint, { query: { name: userName }, withCredentials: true });
      this.error$ = this.setupSocketErrorListeners();
      this.connected$ = this.monitorConnection();
      this.socket.on('changed', (game) => {
        this.game$.next(JSON.parse(game));
      });
      this.socket.on('set id', (id) => {
        this.userId$.next(id.id);
      });
      this.socket.connect();
    }
  }

  userChanged(user: User) {
    this.socket.emit('userChanged', user);
  }

  private monitorConnection(): Observable<boolean> {
    this.connectionSubject = new BehaviorSubject<boolean>(false);

    this.socket.on('connect', () => {
      this.connectionSubject.next(true);
    });

    this.socket.on('connection', () => {
      this.connectionSubject.next(true);
    });

    this.socket.on('disconnect', () => {
      this.connectionSubject.next(false);
    });

    this.socket.on('disconnecting', () => {
      this.connectionSubject.next(false);
    });

    return this.connectionSubject.asObservable();
  }

  private setupSocketErrorListeners(): Observable<string> {
    this.errorSubject = new Subject<string>();

    this.socket.on('exception', (error) => {
      console.log(error.message);
    })

    this.socket.on('error', (error: Error) => {
      this.errorSubject.next('error ' + error);
    });

    this.socket.on('connect_error', (connectionError: Error) => {
      this.errorSubject.next('connect_error ' + connectionError?.message);
    });

    this.socket.on('connect_timeout', (connectionError: Error) => {
      this.errorSubject.next('connect_timeout ' + connectionError?.message);
    });

    this.socket.on('reconnect_error', () => {
      this.errorSubject.next('reconnect_error');
    });

    this.socket.on('reconnect_failed', () => {
      this.errorSubject.next('reconnect_failed');
    });

    return this.errorSubject.asObservable();
  }

  rolesChanged(roleSettings: RoleSetting[]) {
    this.socket.emit('rolesChanged', roleSettings);
  }

  startGame() {
    this.socket.emit('startGame');
  }

  restartGame(){
    this.socket.emit('restartGame');
  }
}
