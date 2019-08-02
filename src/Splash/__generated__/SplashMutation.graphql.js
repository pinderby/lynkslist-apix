/**
 * @flow
 * @relayHash 5ef7795b6e340f814c3204ac8a0a16e1
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreateUserInput = {|
  attributes: UserAttributes,
  password: string,
  clientMutationId?: ?string,
|};
export type UserAttributes = {|
  username?: ?string,
  fname?: ?string,
  lname?: ?string,
  email?: ?string,
  preferences?: ?any,
|};
export type SplashMutationVariables = {|
  input: CreateUserInput,
  password: string,
|};
export type SplashMutationResponse = {|
  +createUser: ?{|
    +user: ?{|
      +id: string,
      +username: string,
      +fname: string,
      +lname: string,
      +email: string,
      +token: ?string,
    |},
    +errors: $ReadOnlyArray<string>,
  |}
|};
export type SplashMutation = {|
  variables: SplashMutationVariables,
  response: SplashMutationResponse,
|};
*/


/*
mutation SplashMutation(
  $input: CreateUserInput!
  $password: String!
) {
  createUser(input: $input) {
    user {
      id
      username
      fname
      lname
      email
      token(password: $password)
    }
    errors
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "CreateUserInput!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "password",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "createUser",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input",
        "type": "CreateUserInput!"
      }
    ],
    "concreteType": "CreateUserPayload",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "user",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "username",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "fname",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "lname",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "email",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "token",
            "args": [
              {
                "kind": "Variable",
                "name": "password",
                "variableName": "password",
                "type": "String!"
              }
            ],
            "storageKey": null
          }
        ]
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "errors",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "SplashMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "SplashMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "SplashMutation",
    "id": null,
    "text": "mutation SplashMutation(\n  $input: CreateUserInput!\n  $password: String!\n) {\n  createUser(input: $input) {\n    user {\n      id\n      username\n      fname\n      lname\n      email\n      token(password: $password)\n    }\n    errors\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4027e6779773b85f5994bc26420deca0';
module.exports = node;
