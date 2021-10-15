import React from "react"
import { Route, Redirect } from "react-router-dom"
import { CoreNavItems } from "../constants/routes"
import { useAuth } from "../contexts/AuthContext"
import { useOrganization } from "../contexts/OrganizationContext"

export default function PrivateRoute({ children, orgNotNeeded, ...rest }: any) {
    const currentUser = useAuth()
    const currentOrg = useOrganization();

    if (!currentUser) {
        return <Redirect to={`/${CoreNavItems.Login}`} />
    }

    if (!orgNotNeeded && !currentOrg) {
        return <Redirect to={`/${CoreNavItems.Signup}`} />
    }

    return (
        <Route {...rest}>
            {children}
        </Route>
    )
}