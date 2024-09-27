/* eslint-disable no-useless-catch */
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, get } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyCrY4yn80E1ppy3Bjm3tHDGMESj0jH16-0',
  authDomain: 'personal-task-manager-2be33.firebaseapp.com',
  databaseURL: 'https://personal-task-manager-2be33-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'personal-task-manager-2be33',
  storageBucket: 'personal-task-manager-2be33.appspot.com',
  messagingSenderId: '353100503016',
  appId: '1:353100503016:web:471ed25b4ca9c14138365d'
}
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

export const tasksRef = ref(database, '/0')
/**
 * Asynchronously fetches data from the firebase database reference.
 *
 * @return {Promise<any>} The fetched data.
 */
export const fetchData = async () => {
  try {
    const snapshot = await get(tasksRef)
    return snapshot.val()
  } catch (error) {
    throw error
  }
}
