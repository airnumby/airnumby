import React from 'react'
import SideNavbar from '../components/SideNavbar';
import { useCharts } from '../contexts/OrganizationContext';
import { useText } from '../contexts/TextContext';

export default function BookkeepingNewEntryPage() {
    const charts = useCharts();
    const text = useText();

    const accounts = Array.from(charts.accounts.keys());

    const handleNewEntry = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('This should really save something:)')
    }

    return (
        <div className="d-flex h-100 text-light">
            <SideNavbar />
            <div className="flex-1 d-flex flex-column container" >
                <h2 className="mt-3">{text.newEntry}</h2>
                <form onSubmit={handleNewEntry}>
                    <div className="mb-3">
                        <label className="form-label">{text.description}</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">{text.bookingDate}</label>
                        <input type="date" className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary">{text.save}</button>
                </form>
            </div>
        </div>
    )
}
