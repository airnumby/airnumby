import { doc, getDoc } from '@firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import { useDb } from '../hooks/firebaseHooks';
// import Loading from '../components/Loading'
import { Organization } from '../models/Organization';
import { fromFirebaseDoc } from '../utils/firebase';
import { useAuth } from './AuthContext';
import { useText } from './TextContext';


const orgContext = React.createContext<Organization | null>(null);

export const useOrganization = () => {
    return useContext(orgContext);
}


interface Props {
    children: any;
}

export default function OrganizationProvider(props: Props) {
    const [loading, setLoading] = useState(true);
    const [organization, setOrganization] = useState<Organization | null>(null);
    const currentUser = useAuth();
    const db = useDb();
    const text = useText();

    useEffect(() => {
        if (currentUser?.userData.currentOrganization) {
            getDoc(doc(db, 'organizations', currentUser?.userData.currentOrganization)).then(
                org => {
                    const organization = fromFirebaseDoc<Organization>(org);
                    setOrganization(organization);
                    setLoading(false);
                }
            ).catch((e) => {
                console.error('Failed to get current org', e);
                toast.error(text.error)
                setOrganization(null);
                setLoading(false);
            })

        } else {
            setOrganization(null);
            setLoading(false);
        }
    }, [currentUser, db, text.error])


    if (loading) {
        return <Loading />
    }


    return (
        <orgContext.Provider value={organization} >
            {props.children}
        </orgContext.Provider>
    )
}
