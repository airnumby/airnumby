import React, { useContext, useState, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth";
import { useDb, useFirebaseAuth } from "../hooks/firebaseHooks";
import { AuthUser } from "../models/AuthUser";
import { getDoc, onSnapshot, setDoc } from "@firebase/firestore";
import { doc } from "firebase/firestore";
import { UserData } from "../models/UserData";
import Loading from "../components/Loading";
import { fromFirebaseDoc } from "../utils/firebase";


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
                const uid = firebaseAuthUser.uid;

                const userRef = doc(db, "users", uid);
                const userSnap = await getDoc(userRef);
                let userData: UserData;

                if (userSnap.exists()) {
                    userData = userSnap.data();
                    // delete userData.claimsUpdated;
                } else {
                    userData = {};
                    await setDoc<UserData>(userRef, userData);
                }

                const authUser: AuthUser = {
                    id: uid,
                    userData,
                    ownedOrganizations: []
                }
                setCurrentUser(authUser)
            } else {
                setCurrentUser(null)
            }
            setLoading(false)
        })

        return unsubscribe
    }, [auth, db])

    useEffect(() => {
        if (currentUser?.id) {
            const userRef = doc(db, "users", currentUser?.id);
            return onSnapshot(userRef, async (userDataDoc) => {
                const newUserData = fromFirebaseDoc<UserData>(userDataDoc);
                console.log('new', newUserData, currentUser)
                if (newUserData.claimsUpdated && (!currentUser.userData?.claimsUpdated || newUserData.claimsUpdated > currentUser.userData?.claimsUpdated)) {
                    const result = await auth.currentUser?.getIdTokenResult(true);
                    const authUser: AuthUser = {
                        ...currentUser,
                        userData: newUserData,
                        ownedOrganizations: (result?.claims?.ownedOrganizations || []) as string[],
                    }
                    setCurrentUser(authUser)
                } else if (newUserData.currentOrganization !== currentUser.userData?.currentOrganization) {
                    const authUser: AuthUser = {
                        ...currentUser,
                        userData: newUserData
                    }
                    setCurrentUser(authUser)
                }
            })
        }
    }, [db, currentUser, auth.currentUser])

    if (loading) {
        return <Loading />
    }

    return (
        <authContext.Provider value={currentUser} >
            {children}
        </authContext.Provider>
    )
}