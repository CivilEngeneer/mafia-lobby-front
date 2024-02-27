import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { ApiService, PermissionAnswer } from "./api.service";
import { map } from "rxjs";

export const CanActivateGame: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const router = inject(Router);
  return inject(ApiService).canActivateRoute().pipe(map(v => {
    if (v === PermissionAnswer.userNotInGame) {
      router.navigate(['']).catch((reason) => console.log(reason));
    }
    return true;
  }));
}

export const CanActivateJoin: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const router = inject(Router);
  return inject(ApiService).canActivateRoute().pipe(map(v => {
    if (v === PermissionAnswer.userInGame) {
      router.navigate(['/lobby']).catch((reason) => console.log(reason));
    }
    return true;
  }));
}
