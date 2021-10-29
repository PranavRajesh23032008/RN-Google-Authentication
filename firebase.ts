import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAgDeA8goMjNOCvUCkXq59XcQQ0oLi-l7M",
  authDomain: "reactnative--login.firebaseapp.com",
  projectId: "reactnative--login",
  storageBucket: "reactnative--login.appspot.com",
  messagingSenderId: "252999858368",
  appId: "1:252999858368:web:aacc11e392e34f05025525",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const auth = firebase.auth();

export { auth };
