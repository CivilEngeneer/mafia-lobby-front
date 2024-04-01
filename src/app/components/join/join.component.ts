import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, ValidationErrors, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { map, Observable, Subject } from "rxjs";
import { SocketService } from "../../services/socket.service";

@Component({
  selector: 'app-lobby',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JoinComponent implements OnInit {
  private socketService = inject(SocketService);
  private route = inject(Router);
  private fb = inject(FormBuilder);
  private activatedRoute = inject(ActivatedRoute);

  title$!: Observable<string>;
  buttonName$!: Observable<string>;
  error$: Subject<string> = new Subject<string>();
  gameId!: string;


  ngOnInit() {
    this.title$ = this.activatedRoute.data.pipe(map(x => x['title']));
    this.buttonName$ = this.activatedRoute.data.pipe(map(x => x['buttonName']));
  }

  nameForm = this.fb.group({
    userName: ['', [
      Validators.required
    ], [
      // this.validateUserConnection
    ]]
  });

  connect() {
    if (this.nameForm.valid && this.nameForm.controls.userName.value) {
      this.socketService.createOrJoinGame(this.nameForm.controls.userName.value);
      this.socketService.connected$.subscribe({
        next: (value) => {
          if (value) {
            this.route.navigate(['/lobby']).catch();
          }
        },
        error: (error) => {
          this.error$.next(error);
        }
      });
      this.socketService.error$.subscribe(error => {
        this.error$.next(error);
      });
    }
  }

  validateUserConnection(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.error$.pipe(map(x => x ? { serverError: true } : null));
    };
  }
}
