import { fire } from "../config/firebaseConfig"
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
const provider = new GoogleAuthProvider()
const auth = getAuth(fire)

export const signIn = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log({ result })
            const credential = GoogleAuthProvider.credentialFromResult(result)
            console.log({ credential })
            return result
            // dispatch(updateCreds(credential))
            // dispatch(updateUser(result))
            // const token = credential.accessToken
            // const user = result.user
        })
        .catch((error) => {
            console.log(error)
            // const errorCode = error.code
            // const errorMessage = error.message
            // const email = error.customData.email
            // const credential = GoogleAuthProvider.credentialFromError(error)
        })
}

export const isUserLoggedIn = async (setUserInfo) => {
    return await auth.onAuthStateChanged((user) => {
        if (user) setUserInfo(user)
        else setUserInfo(null)
    })
}
