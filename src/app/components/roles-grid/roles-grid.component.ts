import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Role, RoleSetting } from "../../models/models";
import { GameService } from "../../services/game.service";

@Component({
  selector: 'app-roles-grid',
  templateUrl: './roles-grid.component.html',
  styleUrls: ['./roles-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RolesGridComponent {
  private gameService = inject(GameService);

  @Input() roleSettings: RoleSetting[] = [];
  @Output() onRolesChanged = new EventEmitter<RoleSetting[]>();

  displayedColumns: string[] = ['role', 'amount', 'remove'];
  roles: Role[] = ['mafia', 'don', 'peaceful', 'commissar', 'doctor', 'lady', 'maniac'];

  shouldHideRole(role: Role) {
    return this.roleSettings.some(x => x.role === role);
  }

  removeRoleSetting(roleSetting: RoleSetting) {
    this.roleSettings = this.roleSettings.filter(x => x !== roleSetting);
    this.onRolesChanged.emit(this.roleSettings);
  }

  addRoleSetting() {
    const freeRole = this.roles.filter(x => !this.roleSettings.some(r => r.role === x))?.shift();
    if (freeRole) {
      this.roleSettings = [...this.roleSettings, { role: freeRole, amount: 1 }];
      this.onRolesChanged.emit(this.roleSettings);
    }
  }

  isGameOn(): boolean {
    return this.gameService.game?.state === "inProcess";
  }

  isDisabled(): boolean {
    return this.gameService.thisUser?.type !== 'master';
  }
}
