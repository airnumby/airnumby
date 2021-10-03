import React, { useEffect, useState } from 'react'
import SideNavbar from '../components/SideNavbar'
import { initializeApp } from "firebase/app";
import { collection, getFirestore, onSnapshot, query } from "firebase/firestore";
import firebaseConfig from '../utils/firebaseConfig';
import { fromFirebaseDocs } from '../utils/firebase';
import JournalEntry from '../models/JournalEntry';

initializeApp(firebaseConfig);


export default function BookkeepingDashboardPage() {

    const db = getFirestore();
    const [entries, setEntries] = useState<JournalEntry[]>([])

    useEffect(() => {
        const q = query(collection(db, "journalEntries"));
        return onSnapshot(q, (querySnapshot) => {
            const newEntries = fromFirebaseDocs<JournalEntry>(querySnapshot.docs);
            setEntries(newEntries);
        });
    }, [db])



    return (
        <div className="d-flex h-100">
            <SideNavbar />
            <div className="center flex-1 d-flex flex-column" >
                {entries.map(entry =>
                    <div>{entry.id}</div>
                )}
            </div>
        </div>
    )
}
