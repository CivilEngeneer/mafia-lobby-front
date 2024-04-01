import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinComponent } from "./components/join/join.component";
import { LobbyComponent } from "./components/lobby/lobby.component";
import { CanActivateGame, CanActivateJoin } from "./services/CanActivateGame";
import { NotFoundComponent } from "./components/not-found/not-found.component";

export const idParamName = 'id';
export const lobbyPath = `lobby`;


const routes: Routes = [
  { path: '', component: JoinComponent, data: { title: 'Для подключения к игре введите свое имя', buttonName: 'Подключиться' }, canActivate: [CanActivateJoin] },
  { path: lobbyPath, loadComponent: () => import('./components/lobby/lobby.component').then(m => m.LobbyComponent), canActivate: [CanActivateGame] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
