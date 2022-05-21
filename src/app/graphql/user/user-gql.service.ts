import {Injectable} from '@angular/core';
import {gql, Query, Mutation} from 'apollo-angular';


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
            tagline
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

@Injectable({providedIn: 'root'})
export class UpdateUsernameGqlService extends Mutation {
  override document = gql`
    mutation updateUsername($updateUsernameData: UpdateUsername!){
      updateUsername(input: $updateUsernameData) {
        ok
        data{
          username
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
