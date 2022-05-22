import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {GraphQLModule} from './graphql/graphql.module';

import {LoginComponent} from './core/login/login.component';
import {SignUpComponent} from './core/signup/signup.component';
import {DashboardComponent} from './core/dashboard/dashboard.component';
import { UserComponent } from './core/user/user.component';
import { ChannelsComponent } from './core/channels/channels.component';
import { ServersComponent } from './core/servers/servers.component';
import { UsersComponent } from './core/users/users.component';
import { ChatComponent } from './core/chat/chat.component';
import { HeaderComponent } from './core/header/header.component';
import { UserSettingsComponent } from './core/user/user-settings/user-settings.component';
import { UserSettingsAccountComponent } from './core/user/user-settings/user-settings-account/user-settings-account.component';
import { UserSettingsProfileComponent } from './core/user/user-settings/user-settings-profile/user-settings-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    DashboardComponent,
    UserComponent,
    ChannelsComponent,
    ServersComponent,
    UsersComponent,
    ChatComponent,
    HeaderComponent,
    UserSettingsComponent,
    UserSettingsAccountComponent,
    UserSettingsProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    GraphQLModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
