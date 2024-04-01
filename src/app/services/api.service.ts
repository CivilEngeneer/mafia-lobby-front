import { inject, Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

export enum PermissionAnswer {
  userInGame,
  gameNotExists,
  userNotInGame,
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);

  constructor() {
  }

  canActivateRoute(): Observable<PermissionAnswer> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<PermissionAnswer>(
      `http://${environment.socketEndpoint}/checkUserInGame`,
      { headers: headers }, { withCredentials: true }
    );
  }
}


