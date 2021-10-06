import React from 'react'
import { signInWithPopup } from "firebase/auth";
import { useFirebaseAuth } from '../hooks/firebaseHooks';
import { useText } from '../contexts/TextContext';
import googleLogo from '../assets/google.svg';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { Redirect } from 'react-router';



export default function LoginPage() {
    const text = useText();
    const { auth, provider } = useFirebaseAuth();
    const currentUser = useAuth();

    if (currentUser) {
        return <Redirect to={`/`} />
    }

    const login = () => {
        signInWithPopup(auth, provider)
            .catch((error) => {
                console.error('failed to login', error);
                toast.error(text.error);
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
