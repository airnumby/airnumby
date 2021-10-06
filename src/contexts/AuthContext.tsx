import React, { useContext, useState, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth";
import { useFirebaseAuth } from "../hooks/firebaseHooks";
import { AuthUser } from "../models/AuthUser";


const authContext = React.createContext<AuthUser | null>(null);

export function useAuth() {
    return useContext(authContext)
}

export function AuthProvider({ children }: any) {
    const { auth } = useFirebaseAuth();

    const [currentUser, setCurrentUser] = useState<AuthUser | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseAuthUser) => {
            if (firebaseAuthUser) {
                const result = await firebaseAuthUser.getIdTokenResult();
                const isAdmin = (!!result?.claims?.isAdmin) || false
                const authUser: AuthUser = {
                    id: firebaseAuthUser.uid,
                    isAdmin,
                }
                setCurrentUser(authUser)
            } else {
                setCurrentUser(null)
            }
            setLoading(false)
        })

        return unsubscribe
    }, [auth])


    return (
        <authContext.Provider value={currentUser} >
            {!loading && children}
        </authContext.Provider>
    )
}