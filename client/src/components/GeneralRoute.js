import React, { useEffect, useState } from "react";
import Error404 from "../pages/Error404";

const GeneralRoute = ({ element: Component, ...rest}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        // every logged in user will have own token
        const token = localStorage.getItem('token')
        const role = localStorage.getItem('role')

        if (token && role === 'general') {
            setIsAuthenticated(true)
        }

        else {
            setIsAuthenticated(false)
        }
    }, [])

    return isAuthenticated ? <Component {...rest} /> : <Error404 />
}

export default GeneralRoute;