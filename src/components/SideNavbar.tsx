import { signOut } from '@firebase/auth';
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowFrontSVG, Book, LogoutSvg } from '../assets/svgs';
import { CoreNavItems } from '../constants/routes';
import { useText } from '../contexts/TextContext'
import { useFirebaseAuth } from '../hooks/firebaseHooks';

interface NavItem {
    path: string,
    icon: any,
    text: string,
    isActive: boolean,
}

export default function SideNavbar() {
    const { auth } = useFirebaseAuth();
    const text = useText();
    const location = useLocation();

    const navItems: NavItem[] = [
        {
            path: `/${CoreNavItems.Bookkeeping}`,
            icon: Book,
            text: text.bookKeeping,
            isActive: false,
        }
    ];

    const activ = navItems.find(navItem => navItem.path === location.pathname);
    if (activ) {
        activ.isActive = true;
    }


    return (
        <div className="d-flex flex-column navbar-dark bg-primary h-100" style={{ width: '250px' }}>

            <Link to='/'><div className="navbar-brand navbar-active pb-3 pt-3 me-0 center">{text.brand}</div></Link>
            <div className="flex-1 d-flex flex-column text-light">
                {navItems.map(navItem =>
                    <Link key={navItem.path} to={navItem.path}>
                        <div className={`navbar-item d-flex ${navItem.isActive ? 'navbar-active' : ''}`}>
                            <div className="navbar-icon">
                                {navItem.icon}
                            </div>
                            <div className="ms-1">
                                {navItem.text}
                            </div>
                            <div className="flex-1 d-flex justify-content-end">
                                <div className="navbar-arrow">
                                    {ArrowFrontSVG}
                                </div>
                            </div>
                        </div>
                    </Link>
                )}


                <div className={`navbar-item pointer d-flex logout`} style={{ marginTop: 'auto' }}
                    onClick={() => signOut(auth)}>
                    <div className="navbar-icon">
                        {LogoutSvg}
                    </div>
                    <div className="ms-1">
                        {text.logout}
                    </div>
                </div>
            </div>
        </div>
    )
}
