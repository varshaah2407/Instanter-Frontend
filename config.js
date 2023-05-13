import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "@firebase/auth";
import "firebase/compat/firestore";

export const firebaseCongfig = {
  apiKey: "AIzaSyDObm1GwPzLBMYBw4Ot5-2CX_q6bTDs5fc",
  authDomain: "instanter-c885a.firebaseapp.com",
  projectId: "instanter-c885a",
  storageBucket: "instanter-c885a.appspot.com",
  messagingSenderId: "892411500811",
  appId: "1:892411500811:web:afdd4ea4dbe71f372e6a0e",
  measurementId: "G-JSRB6RKQ99",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseCongfig);
}
