import React from "react"
import { Route, Redirect } from "react-router-dom"
import { CoreNavItems } from "../constants/routes"
import { useAuth } from "../contexts/AuthContext"

export default function PrivateRoute({ children, ...rest }: any) {
    const currentUser = useAuth()

    if (!currentUser) {
        return <Redirect to={`/${CoreNavItems.Login}`} />
    }

    return (
        <Route {...rest}>
            {children}
        </Route>
    )
}