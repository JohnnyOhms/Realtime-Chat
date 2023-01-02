import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { provider, db } from "../firebase";
import { SET_USER, CHATS } from "./actionType";
import {
  addDoc,
  collection,
  doc,
  documentId,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
  deleteDoc,
} from "firebase/firestore";
import ReadMessage from "../component/ReadMessage";

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
        // The signed-in user info.
        const user = result.user;
        dispatch(userAction(user.email));
      })
      .catch((error) => {
        const errorMessage = error.message;

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
      console.log(docRef);
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

export function getSingleData(keyId, value) {
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
      dispatch(updateMessage(mssg, value));
    });
    return () => unsubscribe();
  };
}

export function updateMessage(mssg, value) {
  return (dispatch) => {
    const keyId = mssg[0].keyId;
    const docRef = doc(db, "messages", keyId);
    const updatedData = {
      userId: mssg[0].userId,
      username: mssg[0].username,
      profile_picture: mssg[0].profile_picture,
      message: value,
      timestamp: mssg[0].timestamp,
    };

    setDoc(docRef, updatedData)
      .then(() => {
        console.log("success");
        // dispatch(chatsAction(mssg));
      })
      .catch((err) => console.log(err));
  };
}

export function deletMessage(keyId) {
  return async (dispatch) => {
    const docRef = doc(db, "messages", keyId);
    await deleteDoc(docRef)
      .then(() => {
        console.log("deleted");
        // dispatch(getMessage());
        return <ReadMessage />;
      })
      .catch((err) => console.log(err));
  };
}
