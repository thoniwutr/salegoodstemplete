import {
  FacebookAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  User as FirebaseUser,
} from 'firebase/auth'

import { collection, addDoc, getDocs } from "firebase/firestore"; 

import { auth, firestore } from '../../firebase-config'

export function loginUser(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password)
}

export function loginWithFacebook() {
  const provider = new FacebookAuthProvider()
  return signInWithPopup(auth, provider)
}

export function logoutUser() {
  return signOut(auth)
}

export function createUser(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password)
}

export function resetPassword(email: string) {
  return sendPasswordResetEmail(auth, email)
}

export function getCurrentUser() {
  return auth.currentUser
}
export type { FirebaseUser }


export async function addProduct(payload) {
  try {
    const docRef = await addDoc(collection(firestore, "Products"), payload);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


export async function getProduct(payload) {
  try {
    const docRef = await addDoc(collection(firestore, "Products"), payload);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}