import React, { useEffect, useState } from 'react'
import SideNavbar from '../components/SideNavbar'
import { collection, onSnapshot, query } from "firebase/firestore";
import { fromFirebaseDocs } from '../utils/firebase';
import JournalEntry from '../models/JournalEntry';
import { useDb } from '../hooks/firebaseHooks';


export default function BookkeepingDashboardPage() {
    const db = useDb();
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
