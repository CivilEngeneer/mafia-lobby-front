import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { Game, RoleSetting, User } from 'src/app/models/models';
import { SocketService } from "../../services/socket.service";
import { GameService } from "../../services/game.service";
import { MatDrawerMode } from '@angular/material/sidenav';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LobbyComponent {
  private socketService = inject(SocketService);
  private gameService = inject(GameService);
  @Input() game: Game | undefined;

  onUserChanged(changedUser: User) {
    this.socketService.userChanged(changedUser);
  }

  onRolesChanged(roleSettings: RoleSetting[]) {
    this.socketService.rolesChanged(roleSettings);
  }

  startButtonClicked() {
    if (this.gameService.game?.state === 'inProcess') {
      this.socketService.restartGame();
    } else {
      this.socketService.startGame();
    }
  }

  getButtonTitle() {
    return this.isGameInProcess() ? 'Finish game' : 'Start game';
  }

  isGameInProcess() {
    return this.gameService.game?.state === 'inProcess';
  }

  isThisUserMaster(): boolean {
    return this.gameService.isThisUserMaster();
  }

  isMasterInGame(): boolean {
    return this.gameService.isMasterInGame();
  }

  closeClicked() {
    this.socketService.closeGame();
  }
}
