import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"


const app = initializeApp({
  apiKey: "AIzaSyDQmxqMs5ga7x0oJK1NtI9pP-8Xz8EtL_U",
  authDomain: "bsd-salegoods.firebaseapp.com",
  databaseURL: "https://bsd-salegoods-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bsd-salegoods",
  storageBucket: "bsd-salegoods.appspot.com",
  messagingSenderId: "366692987482",
  appId: "1:366692987482:web:0c0681c5dd585506eb9e63",
  measurementId: "G-8RHXJYZ8VG"
})

export const auth = getAuth(app)
export const storage = getStorage(app)
export const firestore = getFirestore(app)