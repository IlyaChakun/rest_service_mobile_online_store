import React from 'react';
import {Route} from "react-router-dom";
import NoPermission from "../../common/error/NoPermission";
import {ROLE_ADMIN} from "../../constants";
import {isAdmin} from "../App";


const PrivateAdminRoute = ({component: Component, authenticated, currentUser, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            authenticated && isAdmin(currentUser) ? (
                <Component {...rest} {...props} />
            ) : (
                <NoPermission/>
            )
        }
    />
);

export default PrivateAdminRoute