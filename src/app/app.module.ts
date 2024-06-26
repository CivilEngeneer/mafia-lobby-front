import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LobbyComponent } from './components/lobby/lobby.component';
import { JoinComponent } from "./components/join/join.component";
import { HttpClientModule } from "@angular/common/http";
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MatTableModule } from "@angular/material/table";
import { MatSelectModule } from "@angular/material/select";
import { UsersGridComponent } from "./components/users-grid/users-grid.component";
import { RolesGridComponent } from './components/roles-grid/roles-grid.component';
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatCardModule } from "@angular/material/card";
import { BaseComponent } from './components/base/base.component';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatRadioModule } from "@angular/material/radio";
import { RolesListComponent } from './components/roles-list/roles-list.component';

@NgModule({
  declarations: [
    AppComponent,
    JoinComponent,
    LobbyComponent,
    NotFoundComponent,
    UsersGridComponent,
    UsersGridComponent,
    RolesGridComponent,
    BaseComponent,
    RolesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatSelectModule,
    FormsModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
