/**
 * @flow
 * @relayHash 0d734071b04c00c2b20c1f9e866cf022
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type SplashQueryVariables = {|
  username: string,
  password: string,
|};
export type SplashQueryResponse = {|
  +user: ?{|
    +id: string,
    +username: string,
    +fname: string,
    +lname: string,
    +token: ?string,
    +email: string,
    +preferences: any,
    +repos: $ReadOnlyArray<?{|
      +id: string,
      +name: string,
    |}>,
  |}
|};
export type SplashQuery = {|
  variables: SplashQueryVariables,
  response: SplashQueryResponse,
|};
*/


/*
query SplashQuery(
  $username: String!
  $password: String!
) {
  user(username: $username) {
    id
    username
    fname
    lname
    token(password: $password)
    email
    preferences
    repos {
      id
      name
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "username",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "password",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v2 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "user",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "username",
        "variableName": "username",
        "type": "String!"
      }
    ],
    "concreteType": "User",
    "plural": false,
    "selections": [
      (v1/*: any*/),
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
        "name": "preferences",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "repos",
        "storageKey": null,
        "args": null,
        "concreteType": "Repo",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "name",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "SplashQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v2/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "SplashQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v2/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "SplashQuery",
    "id": null,
    "text": "query SplashQuery(\n  $username: String!\n  $password: String!\n) {\n  user(username: $username) {\n    id\n    username\n    fname\n    lname\n    token(password: $password)\n    email\n    preferences\n    repos {\n      id\n      name\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '6e6a4871c68023a7376e95e7eb8933cc';
module.exports = node;
