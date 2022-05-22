import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, ApolloLink, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import {setContext} from '@apollo/client/link/context';

import {environment} from '../../environments/environment';
import {AuthenticationService} from './../shared/authentication/authentication.service';

const uri = environment.apiURL; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8'
    }
  }));

  const auth = setContext((operation, context) => {
    const token = AuthenticationService.getUserAuthToken();
    if (token === null) {
      return {};
    } else {
      return {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
    }
  });

  const link = ApolloLink.from([basic, auth, httpLink.create({uri})]);
  const cache = new InMemoryCache();
  // const defaultOptions = {
  //   watchQuery: {
  //     fetchPolicy: 'network-only',
  //   },
  //   query: {
  //     fetchPolicy: 'network-only',
  //   },
  // }

  return {
    link,
    cache,
    // defaultOptions
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {
}
