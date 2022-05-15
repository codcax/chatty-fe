import {Injectable} from '@angular/core';
import {gql, Query} from 'apollo-angular';


@Injectable({providedIn: 'root'})
export class UserGqlService extends Query {
  override document = gql`
    query getUser{
      getUser {
        ok
        data{
          username
          email
          status{
            mode
            duration
            setTime
          }
          avatar,
          description
        }
        errors{
          type
          message
          code
        }
      }
    }
  `;
}
