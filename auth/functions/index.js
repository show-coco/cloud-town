const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');

admin.initializeApp(functions.config().firebase);

const createUser = `
mutation insert_users($email: String!, $authId: String!, $name: String!, $slug: String! ) {
  insert_users_one(object: {auth_id: $authId, email: $email, name: $name, slug: $slug}) {
    auth_id
    id
    name
  }
}
`

exports.processSignUp = functions.auth.user().onCreate(user => {
  let customClaims;
  customClaims = {
    'https://hasura.io/jwt/claims': {
      'x-hasura-default-role': 'user',
      'x-hasura-allowed-roles': ['user'],
      'x-hasura-user-id': user.uid
    }
  }

  return admin.auth().setCustomUserClaims(user.uid, customClaims)
    .then(() => {
      let queryStr = {
        "query": createUser,
        "variables": {email: user.email, authId: user.uid, name: user.displayName, slug: user.uid }
      }

      console.log(queryStr)

      const res = axios({
        method: 'post',
        url: functions.config().hasura.url,
        data: queryStr,
        headers: {
          'x-hasura-admin-secret': functions.config().hasura.admin_secret
        }
      })

      console.log(res)

      admin
        .firestore()
        .collection("user_meta")
        .doc(user.uid)
        .create({
          refreshTime: admin.firestore.FieldValue.serverTimestamp()
        });
    })
    .catch(error => {
      console.log(error);
    });
});
