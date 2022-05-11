import {Injectable} from '@angular/core';
import {gql, Mutation} from 'apollo-angular';


@Injectable({providedIn: 'root'})
export class SignupGqlService extends Mutation {
  override document = gql`
    mutation userSignUp($userSignUpData: userCreate!) {
      userSignUp (input: $userSignUpData){
        ok
        data{
          _id
          email

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
