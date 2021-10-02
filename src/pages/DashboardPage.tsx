import React from 'react'
import SideNavbar from '../components/SideNavbar'

export default function DashboardPage() {
    return (
        <div className="d-flex h-100">
            <SideNavbar />
            <div className="center flex-1" >
                Book
            </div>
        </div>
    )
}
