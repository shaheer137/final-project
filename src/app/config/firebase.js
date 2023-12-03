// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, collection, onSnapshot, query, where, addDoc, getDocs, updateDoc, doc , serverTimestamp,firebase} from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5O1hoYbdzAaJmyJnyOxVZruoRe36-JkM",
  authDomain: "final-project-d0a7e.firebaseapp.com",
  projectId: "final-project-d0a7e",
  storageBucket: "final-project-d0a7e.appspot.com",
  messagingSenderId: "284011778566",
  appId: "1:284011778566:web:e98f08ade439c4a52c6987"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new FacebookAuthProvider();
const auth = getAuth(app);
const db = getFirestore(app)
const storage = getStorage(app)

const user = [
  {
    fullname: 'Shaheer',
    email: 'shaheer@gmail.com',
    status: 'pending'
  },
  {
    fullname: 'Ali',
    email: 'ali@gmail.com',
    status: 'pending'
  },
  {
    fullname: 'Bilal',
    email: 'bilal@gmail.com',
    status: 'pending'
  },
  {
    fullname: 'Ubaid',
    email: 'ubaid@gmail.com',
    status: 'pending'
  },
  {
    fullname: 'Iqrar',
    email: 'iqrar@gmail.com',
    status: 'pending'
  },
  {
    fullname: 'Omais',
    email: 'omais@gmail.com',
    status: 'pending'
  },
  {
    fullname: 'Zayan',
    email: 'zayan@gmail.com',
    status: 'pending'
  },
  {
    fullname: 'Ahmed',
    email: 'ahmed@gmail.com',
    status: 'pending'
  },
  {
    fullname: 'Areeb',
    email: 'areeb@gmail.com',
    status: 'pending'
  },
  {
    fullname: 'Mahad',
    email: 'mahad@gmail.com',
    status: 'pending'
  }
]

async function postUsers() {
  try {
    for (var i = 0; i < user.length; i++) {
      const add = addDoc(collection(db, "users"), user[i])
      console.log('add', add)
      alert('data posted successfully')
    }
  } catch (e) {
    alert(e.message)
  }
}

function loginWithFacebook() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      console.log('user', user)
      return user
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = FacebookAuthProvider.credentialFromError(error)
    })
}

async function post( description, file) {
  try {
    const url = await uploadImage(file)
    await addDoc(collection(db, "data"), {
      description,
      imageUrl: url
    });
    alert('Post posted successfully')
  } catch (e) {
    alert(e.message)
  }
}

async function uploadImage(file) {
  try {
    const storageRef = ref(storage, 'data/' + file.name);
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    return url
  } catch (e) {
    alert(e.message)
  }
}

async function getPosts() {
  const querySnapshot = await getDocs(collection(db, "data"));
  const data = []
  querySnapshot.forEach((doc) => {
    const postData = doc.data()
    data.push(postData)
    console.log(doc.id, " => ", doc.data());
    console.log('data', data)
  });
  return data
}

async function updateStatus(id, status) {
  await updateDoc(doc(db, "users", id), {
    status
  });
}

async function handleChat(NewMessages) {
  const mainCollectionRef = collection(db, 'chatrooms');
  const mainDocRef = await addDoc(mainCollectionRef, {
   
  });

  const mainDocId = mainDocRef.id;
  const subCollectionRef = collection(db, 'chatrooms', mainDocId, 'messages')
  await addDoc(subCollectionRef, {
    
    text: NewMessages ,
    createdAt:Date.now(),
    userId:auth.currentUser.uid
    
  });


}

async function checkAndCreateRoom(friendId,setMsg) {
  const users = { [friendId]: true, [auth.currentUser.uid]: true }

  const docRef = await addDoc(collection(db, "chatrooms"), {
    users,
    createdAt: Date.now(),
    lastMessage:{}
  });

  const q = query(collection(db, "chatrooms"), where( `users.${friendId}`, "==", true));
  console.log('q',q)

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let room;
    const chat = [];
    querySnapshot.forEach((doc) => {
        chat.push({id:doc.id,...doc.data()});
        room = doc.data()
    });
    setMsg(chat)
    console.log('chats',chat)
  });
}


export { loginWithFacebook, getPosts, post, collection, query, where, onSnapshot, db, updateStatus, postUsers, checkAndCreateRoom, handleChat }