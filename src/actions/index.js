import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { provider, db } from "../firebase";
import { SET_USER, CHATS } from "./actionType";
import { serverTimestamp } from "firebase/database";
import {
  addDoc,
  collection,
  doc,
  documentId,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export const userAction = (payload) => ({
  type: SET_USER,
  user: payload,
});

export const chatsAction = (payload) => ({
  type: CHATS,
  chats: payload,
});

export const auth = getAuth();

export const signInAPI = () => {
  return (dispatch) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        dispatch(userAction(user.email));
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        alert(errorMessage);
      });
  };
};

export const onAuthUser = () => {
  return (dispatch) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userEmail = user.email;
        dispatch(userAction(userEmail));
      }
    });
  };
};

export const signOutApi = () => {
  return (dispatch) => {
    signOut(auth)
      .then(() => {
        dispatch(userAction(null));
      })
      .catch((error) => {
        // An error happened.
      });
  };
};

export function writeMessage(userId, name, imageUrl, mssgs) {
  return async (dispatch) => {
    try {
      const docRef = await addDoc(collection(db, "messages"), {
        userId,
        username: name,
        profile_picture: imageUrl,
        message: mssgs,
        timestamp: new Date(),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
}

export function getMessage() {
  return async (dispatch) => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const mssg = [];
      snapshot.forEach((doc) => {
        mssg.push({ ...doc.data(), keyId: doc.id });
      });
      dispatch(chatsAction(mssg));
    });
    return () => unsubscribe();
  };
}

export function getSingleData(keyId) {
  return async (dispatch) => {
    const q = query(
      collection(db, "messages"),
      where(documentId(), "==", keyId)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const mssg = [];
      snapshot.forEach((doc) => {
        mssg.push({ ...doc.data(), keyId: doc.id });
      });
      dispatch(updateMessage(mssg));
    });
    return () => unsubscribe();
  };
}

export function updateMessage(mssg) {
  return (dispatch) => {
    const keyId = mssg[0].keyId;
    const docRef = doc(db, "messages", keyId);
    const updatedData = {
      userId: mssg[0].userId,
      username: mssg[0].username,
      profile_picture: mssg[0].profile_picture,
      message: "updated six",
      timestamp: mssg[0].timestamp,
    };

    setDoc(docRef, updatedData)
      .then(() => console.log("success"))
      .catch((err) => console.log(err));
  };
}
