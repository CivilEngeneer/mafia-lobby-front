import { inject, Injectable } from '@angular/core';
import { Game, User } from '../models/models';
import { SocketService } from "./socket.service";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private userId: string = '';
  private socketService = inject(SocketService);
  game: Game | undefined;
  thisUser: User | undefined;

  constructor() {
    this.socketService.userId$.subscribe(id => this.userId = id);
    this.socketService.game$.subscribe(game => {
      this.game = game;
      this.thisUser = game?.users.find(x => x.id === this.userId);
    });
  }
}
