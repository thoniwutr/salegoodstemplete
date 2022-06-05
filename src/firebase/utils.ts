import { FirebaseError } from 'firebase/app'

export function beautifulErrorMessage(error: FirebaseError) {
  switch (error.code) {
    case 'auth/wrong-password':
      return 'Invalid password. Please try again'
    case 'auth/user-not-found':
      return 'User not found. Please use a different email'
    case 'auth/email-already-in-use':
      return 'This email address is already being used'
    default:
      return error.message
  }
}
