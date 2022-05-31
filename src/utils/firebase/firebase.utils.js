import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";


//mtgdraft
const firebaseConfig = {
  apiKey: "AIzaSyCSRboHoSTDxB1Dy6fkjvtoadIf9iQsjIg",
  authDomain: "mtgdraft-7b657.firebaseapp.com",
  projectId: "mtgdraft-7b657",
  storageBucket: "mtgdraft-7b657.appspot.com",
  messagingSenderId: "1070356307469",
  appId: "1:1070356307469:web:02dce15221d510db83ff44"
};

// crwn-db/crwn-clothing-web-app
// const firebaseConfig = {
//   apiKey: "AIzaSyAS1_7vP67VE0XmGH3KfCp0NmxSOAylkqc",
//   authDomain: "crwn-db-cd5b1.firebaseapp.com",
//   databaseURL: "https://crwn-db-cd5b1.firebaseio.com",
//   projectId: "crwn-db-cd5b1",
//   storageBucket: "crwn-db-cd5b1.appspot.com",
//   messagingSenderId: "280423869079",
//   appId: "1:280423869079:web:1a5dabf3385c03dcf1d7d2",
//   measurementId: "G-FBNG43DEDW"
// };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Google specific
// prompt: 'select_account', makes it so everytime we interact, we are forced to select account
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account'
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();


// additionlInfo param os for when userAuth does not return displayName,
// eg in case of signupWithEmailAndPassword
export  const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {

  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid )
  const userSnapshot = await getDoc(userDocRef);
  // console.log('createUserDocumentFromAuth', {userSnapshot})
  // console.log({'user already exists': userSnapshot.exists()})
  
  // if user data does not exist
  // create/set the document with the userAuth data in collection
  if (!userSnapshot.exists()){
    const { displayName, email } =  userAuth;
    const createdAt = new Date();

    try {
      console.log('new user, creating document....')
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo
      })
      
    } catch (error) {
      console.error('error creating user', error.message)
    }

  }
  // otherwise just return user data
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  console.log('signInUserWithEmailAndPassword', {email, password})
  return await signInWithEmailAndPassword(auth, email, password)
};