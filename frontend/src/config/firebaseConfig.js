// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
    apiKey: "AIzaSyDIRNhWiutVvw1A76B1LNvREERcZ3jAv5Q",
    authDomain: "tic-tac-toe-7r.firebaseapp.com",
    projectId: "tic-tac-toe-7r",
    storageBucket: "tic-tac-toe-7r.appspot.com",
    messagingSenderId: "101489025514",
    appId: "1:101489025514:web:1c82821b65a67a7e391293",
    measurementId: "G-HQ2TFJSJ8N",
}

export const fire = initializeApp(firebaseConfig)
export const analytics = getAnalytics(fire)
