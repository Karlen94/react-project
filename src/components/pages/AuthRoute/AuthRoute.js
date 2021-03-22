import React from 'react';
import {Route} from  'react-router-dom';



export default function AuthRoute({ path, component }) {
    return (
        <Route
            path={path}
            component={component}
        />
    )
}