import {Injectable} from '@angular/core';
import {gql, Mutation} from 'apollo-angular';


@Injectable({providedIn: 'root'})
export class SignupGqlService extends Mutation {
  override document = gql`
    mutation userCreate($userCreateData: userCreate!) {
      userCreate (input: $userCreateData){
        _id
      }
    }
  `;
}
