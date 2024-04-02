import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { socketErrorAsync } from "../base/base.component";
import { ApiService } from "../../services/api.service";

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JoinComponent {
  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);

  @Output() onConnectClick = new EventEmitter();

  title = 'Для входа введите свое имя';
  buttonName = 'Подключиться';

  nameForm = this.fb.group({
    userName: ['', [
      Validators.required,
    ], [
      socketErrorAsync(this.apiService),
    ]]
  }, {updateOn: "blur"});

  onConnectClicked() {
    if (this.nameForm.valid && this.nameForm.controls.userName.value) {
      this.onConnectClick.emit(this.nameForm.controls.userName.value);
    }
  }
}
