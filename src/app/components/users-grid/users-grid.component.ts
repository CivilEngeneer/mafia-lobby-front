import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { User, UserType } from 'src/app/models/models';
import { GameService } from "../../services/game.service";

@Component({
  selector: 'app-users-grid',
  templateUrl: './users-grid.component.html',
  styleUrls: ['./users-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersGridComponent {
  private gameService = inject(GameService);

  @Input() users: User[] = [];
  @Output() userChanged = new EventEmitter<User>();

  get displayedColumns(): string[] {
    if (this.gameService?.thisUser?.type === "master") {
      return ['position', 'name', 'type', 'role', 'note', 'open'];
    }
    return ['position', 'name', 'type', 'role', 'open'];
  }

  userTypes: UserType[] = ["master", "player", "observer"];

  onUserTypeChanged(value: UserType, user: User) {
    let changedUser = { ...user };
    changedUser.type = value;
    this.userChanged.emit(changedUser);
  }

  getRole(user: User) {
    if (user.opened) {
      return user.role?.toString();
    }

    if (this.gameService.thisUser?.type === 'master' || this.gameService.thisUser?.id === user.id) {
      return user.role?.toString();
    }

    // if (this.gameService.thisUser?.role?.includes('mafia') && user.role?.includes('mafia')){
    //   return 'mafia';
    // }

    return "-";
  }

  getName(user: User) {
    return this.gameService.thisUser?.id === user.id ? `${user.name}-(You)` : user.name;
  }

  isGameOn(): boolean {
    return this.gameService.game?.state === "inProcess";
  }

  isMaster(): boolean {
    return this.gameService.thisUser?.type === 'master';
  }

  openPlayerCard(user: User) {
    let changedUser = { ...user };
    changedUser.opened = true;
    this.userChanged.emit(changedUser);
  }
}
