import { signOut } from '@firebase/auth';
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowFrontSVG, Book, LogoutSvg } from '../assets/svgs';
import { BookkeepingNavItems, CoreNavItems } from '../constants/routes';
import { useOrganization } from '../contexts/OrganizationContext';
import { useText } from '../contexts/TextContext'
import { useFirebaseAuth } from '../hooks/firebaseHooks';

interface NavItem {
    path: string,
    icon?: any,
    text: string,
    isActive: boolean,
    subItems?: NavItem[]
}

export default function SideNavbar() {
    const { auth } = useFirebaseAuth();
    const text = useText();
    const location = useLocation();
    const organization = useOrganization();

    const navItems: NavItem[] = [
        {
            path: `/${CoreNavItems.Bookkeeping}`,
            icon: Book,
            text: text.bookKeeping,
            isActive: false,
            subItems: [
                {
                    path: `/${CoreNavItems.Bookkeeping}/${BookkeepingNavItems.NewEntry}`,
                    text: text.newOrganization,
                    isActive: false,
                }
            ]
        },
    ];

    const subitems = navItems.map(item => item.subItems || []).flat();
    const allItems = subitems.concat(navItems);
    allItems
        .filter(item => location.pathname.includes(item.path))
        .forEach(item => item.isActive = true);


    const renderNavItem = (navItem: NavItem, subitem?: boolean) => {
        return <Link key={navItem.path} to={navItem.path}>
            <div className={`navbar-item d-flex ${subitem ? 'sub-item' : ''} ${navItem.isActive ? 'navbar-active' : ''}`}>
                <div className="navbar-icon">
                    {navItem.icon}
                </div>
                <div className="ms-1">
                    {navItem.text}
                </div>
                {!subitem &&
                    <div className="flex-1 d-flex justify-content-end">
                        <div className="navbar-arrow">
                            {ArrowFrontSVG}
                        </div>
                    </div>
                }
            </div>
        </Link>
    }

    return (
        <div className="d-flex flex-column navbar-dark bg-primary h-100" style={{ width: '250px' }}>

            <Link to='/'>
                <div className="navbar-brand navbar-active pt-3 me-0 center">{text.brand}</div>
                <div className="navbar-active text-light pb-3 me-0 center">{organization?.name} ({organization?.orgNum})</div>
            </Link>


            <div className="flex-1 d-flex flex-column text-light">
                {navItems.map(navItem => <>
                    {renderNavItem(navItem)}
                    {navItem.isActive && (navItem.subItems || []).map(subItem => renderNavItem(subItem, true))}
                </>
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
