import firebase from "firebase"
// import firebase from 'firebase/app'
// import "firebase/firestore"
// import "firebase/auth"


const config = {
  apiKey: "AIzaSyAv8KMmA6L7IvgU15rAnavnJ-14Z80PEEo",
  authDomain: "crown-db-e8d82.firebaseapp.com",
  databaseURL: "https://crown-db-e8d82.firebaseio.com",
  projectId: "crown-db-e8d82",
  storageBucket: "crown-db-e8d82.appspot.com",
  messagingSenderId: "427567906558",
  appId: "1:427567906558:web:0c3d4580341f029fa86faf",
  measurementId: "G-69BV6Q719V"
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({prompt: "select_account"}) //always trigger google popup
export const signInWithGoogle = () => auth.signInWithPopup(provider)


export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapshot = await userRef.get()

  if (!snapshot.exists) {
    const {displayName, email} = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData //params that get passed in
      })
    } catch(error) {
      console.log(error.message)
    }
  }

  return userRef
}

export default firebase