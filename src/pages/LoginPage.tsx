import React from 'react'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuth } from '../hooks/firebaseHooks';
import { useText } from '../contexts/TextContext';
import googleLogo from '../assets/google.svg';



export default function LoginPage() {
    const text = useText();
    const { auth, provider } = useAuth();

    const login = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user, token);
                // ...
            }).catch((error) => {
                console.error(error);
            });
    }

    return (
        <div className="center h-100">
            <div className="d-flex flex-column align-items-center">
                <div className="alert alert-danger">
                    <p><strong>Oh snap!</strong> AirNumby is NOT ready yet.</p>
                    <p>Feel free to go ahead but all the data might and probably will vanish!</p>
                    <small>If you want to "Be the change you want to see", reach out in <a href="https://github.com/airnumby/airnumby">GitHub</a>. We clearle need all the help we can ge 😀</small>
                </div>
                <button onClick={login} className="login-btn btn btn-secondary">
                    <div><img src={googleLogo} alt={text.loginWithGoogle} className="login-icon" /></div>
                    <div>{text.loginWithGoogle}</div>
                </button>
            </div>
        </div>
    )
}
