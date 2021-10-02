import React from 'react'
import { Link } from 'react-router-dom'
import { CoreNavItems } from '../constants/routes';
import { useText } from '../contexts/TextContext'

export default function SideNavbar() {
    const text = useText();
    console.log(window.location)

    return (
        <div className="d-flex flex-column navbar navbar-dark bg-primary h-100" style={{ width: '250px' }}>

            <Link to='/'><div className="navbar-brand mb-3 me-0">{text.brand}</div></Link>
            <div className="flex-1 d-flex flex-column">
                <Link to={`/${CoreNavItems.Bookkeeping}`}>
                    <div>{text.bookKeeping}</div>
                </Link>
            </div>
        </div>
    )
}
