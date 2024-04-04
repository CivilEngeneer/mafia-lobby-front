import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ApiService, PermissionAnswer } from "../../services/api.service";
import { BehaviorSubject, map, Observable } from "rxjs";
import { SocketService } from "../../services/socket.service";
import { Game } from "../../models/models";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from "@angular/material/snack-bar";

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
  connected$!: Observable<boolean>;

  constructor(private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.apiService.checkUserInGame().subscribe(v => {
      if (v === PermissionAnswer.userInGame) {
        this.connect('');
      }
    });
  }

  onConnectionClick(name: string) {
    this.connect(name);
  }

  private connect(name: string) {
    this.socketService.createOrJoinGame(name);
    this.game$ = this.socketService.game$;
    this.game$.subscribe(v=>{
      const a = v
    })
    this.connected$ = this.socketService.connected$;
    this.socketService.error$.subscribe(msg => this._snackBar.open(msg, 'OK'));
  }
}

export function socketErrorAsync(apiService: ApiService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return apiService.isNameUnique(control.value).pipe(
      map(error => error ? { 'nameExists': error } : null)
    );
  }
}
