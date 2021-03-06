import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpClientModule } from '@angular/common/http';
import { ApolloClient } from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: () => {
        return new ApolloClient({
          cache: new InMemoryCache(),
          link: new WebSocketLink({
            uri: 'wss://backend-todos-list.herokuapp.com/v1/graphql',
            options: {
              reconnect: true,
              connectionParams: {
                headers: {
                  'content-type': 'application/json',
                  'x-hasura-admin-secret': '_todos-angular'
                  //   Authorization: `Bearer ${localStorage.getItem('token')}`
                }
              }
            }
          })
        });
      },
      deps: [HttpLink]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
