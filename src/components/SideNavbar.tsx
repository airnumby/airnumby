import React from 'react'
import { Link } from 'react-router-dom'
import { useText } from '../contexts/TextContext'

export default function SideNavbar() {
    const text = useText();
    return (
        <div className="d-flex flex-column navbar navbar-light bg-light h-100" style={{width: '300px'}}>

            <Link to='/'><div className="navbar-brand">{text.brand}</div></Link>

        </div>
    )
}
