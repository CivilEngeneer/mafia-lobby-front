import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RoleSetting } from "../../models/models";

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RolesListComponent {
  @Input() roleSettings: RoleSetting[] = [];

}
