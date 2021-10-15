import React, { useContext, useState, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth";
import { useDb, useFirebaseAuth } from "../hooks/firebaseHooks";
import { AuthUser } from "../models/AuthUser";
import { getDoc, setDoc } from "@firebase/firestore";
import { doc } from "firebase/firestore";
import { UserData } from "../models/UserData";
import Loading from "../components/Loading";


const authContext = React.createContext<AuthUser | null>(null);

export function useAuth() {
    return useContext(authContext)
}

export function AuthProvider({ children }: any) {
    const { auth } = useFirebaseAuth();
    const db = useDb();

    const [currentUser, setCurrentUser] = useState<AuthUser | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseAuthUser) => {
            if (firebaseAuthUser) {
                const result = await firebaseAuthUser.getIdTokenResult();
                const isAdmin = (!!result?.claims?.isAdmin) || false
                const uid = firebaseAuthUser.uid;

                const userRef = doc(db, "users", uid);
                const userSnap = await getDoc(userRef);
                let userData: UserData;

                if (userSnap.exists()) {
                    userData = userSnap.data();
                } else {
                    userData = {};
                    await setDoc<UserData>(userRef, userData);
                }

                const authUser: AuthUser = {
                    id: uid,
                    isAdmin,
                    userData
                }
                setCurrentUser(authUser)
            } else {
                setCurrentUser(null)
            }
            setLoading(false)
        })

        return unsubscribe
    }, [auth, db])

    if (loading) {
        return <Loading />
    }

    return (
        <authContext.Provider value={currentUser} >
            {children}
        </authContext.Provider>
    )
}