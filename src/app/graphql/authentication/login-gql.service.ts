import {Injectable} from '@angular/core';
import {gql, Query} from 'apollo-angular';


@Injectable({providedIn: 'root'})
export class LoginGqlService extends Query {
  override document = gql`
    query userLogin($userLoginData: userLogin!) {
      userLogin (input: $userLoginData){
        ok
        data{
          userId
          token
          expiresIn
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
