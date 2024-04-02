import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ApiService, PermissionAnswer } from "../../services/api.service";
import { BehaviorSubject, map, Observable } from "rxjs";
import { SocketService } from "../../services/socket.service";
import { Game } from "../../models/models";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseComponent implements OnInit {
  private socketService = inject(SocketService);
  private apiService = inject(ApiService);
  game$ = new BehaviorSubject<Game | undefined>(undefined);

  ngOnInit(): void {
    this.apiService.checkUserInGame().subscribe(v => {
      if (v === PermissionAnswer.userInGame) {
        this.socketService.createOrJoinGame('');
        this.game$ = this.socketService.game$;
      }
    });
  }

  onConnectionClick(name: string) {
    this.game$ = this.socketService.game$;
    this.socketService.createOrJoinGame(name);

  }
}

export function socketErrorAsync(apiService: ApiService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return apiService.isNameUnique(control.value).pipe(
      map(error => error ? { 'nameExists': error } : null)
    );
  }
}
