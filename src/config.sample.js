const appName = 'your app name'
const apiKey = 'your api key'
const senderId = 'your sender id'

export const firebaseConfig = {
  apiKey: apiKey,
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: appName,
  storageBucket: `${appName}.appspot.com`,
  messagingSenderId: senderId
}
