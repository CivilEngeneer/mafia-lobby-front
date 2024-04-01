import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { RoleSetting, User } from 'src/app/models/models';
import { SocketService } from "../../services/socket.service";
import { GameService } from "../../services/game.service";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LobbyComponent implements OnInit {
  private socketService = inject(SocketService);
  private gameService = inject(GameService);
  users$ = new BehaviorSubject<User[]>([]);
  roleSettings$ = new BehaviorSubject<RoleSetting[]>([]);

  ngOnInit(): void {
    this.socketService.createOrJoinGame('');
    this.socketService.game$.subscribe(g => {
      if (g) {
        this.users$.next(g.users);
        this.roleSettings$.next(g.roleSettings);
      }
    });
  }

  onUserChanged(changedUser: User) {
    this.socketService.userChanged(changedUser);
  }

  onRolesChanged(roleSettings: RoleSetting[]) {
    this.socketService.rolesChanged(roleSettings);
  }

  buttonClick() {
    if (this.gameService.game?.state === 'inProcess'){
      this.socketService.restartGame();
    } else {
      this.socketService.startGame();
    }
  }

  canStart() {
    return true;
  }

  getButtonTitle() {
    return this.gameService.game?.state === 'inProcess' ? 'Finish game' : 'Start game';
  }

  isDisabled(): boolean {
    return this.gameService.thisUser?.type !== 'master';
  }
}
