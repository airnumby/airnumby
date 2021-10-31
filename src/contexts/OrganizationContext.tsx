import { doc, getDoc } from '@firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import { useDb } from '../hooks/firebaseHooks';
import { ChartOfAccounts } from '../models/ChartOfAccounts';
// import Loading from '../components/Loading'
import { Organization } from '../models/Organization';
import { fromFirebaseDoc } from '../utils/firebase';
import { useAuth } from './AuthContext';
import { useText } from './TextContext';

// Fetching chart of accounts will not be blocking so let's make it non-nullable and provide some reasonable defaults
const initialCharts: ChartOfAccounts = {
    id: '',
    name: '',
    accounts: {}
}

const orgContext = React.createContext<Organization | null>(null);
const chartsContext = React.createContext<ChartOfAccounts>(initialCharts);

export const useOrganization = () => useContext(orgContext);
export const useCharts = () => useContext(chartsContext);


interface Props {
    children: any;
}

export default function OrganizationProvider(props: Props) {
    const [loading, setLoading] = useState(true);
    const [organization, setOrganization] = useState<Organization | null>(null);
    const [charts, setCharts] = useState<ChartOfAccounts>(initialCharts);
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

    useEffect(() => {
        if (organization?.chartOfAccount) {
            getDoc(doc(db, 'charts', organization.chartOfAccount)).then(
                charts => {
                    const chartOfAccounts = fromFirebaseDoc<ChartOfAccounts>(charts);
                    setCharts(chartOfAccounts);
                }
            ).catch((e) => {
                console.error('Failed to get chart of accounts', e);
                toast.error(text.error)
            })

        }
    }, [organization?.chartOfAccount, db, text.error])


    if (loading) {
        return <Loading />
    }


    return (
        <orgContext.Provider value={organization} >
            <chartsContext.Provider value={charts} >
                {props.children}
            </chartsContext.Provider>
        </orgContext.Provider>
    )
}
