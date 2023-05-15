import React from 'react';
import { Switch, Route } from "react-router-dom";

//Layouts
import VerticalLayout from "../VerticalLayouts";
//routes
import { authProtectedRoutesAdmin } from "./allRoutes";
import { AuthProtected, AccessRoute } from './AdminAuthProtected';

const Index = () => {
    const availableAuthRoutesPath = authProtectedRoutesAdmin.map((r) => r.path);
    return (
        <React.Fragment>
            <Switch>
                <Route path={availableAuthRoutesPath}>
                    <AuthProtected>
                        <VerticalLayout>
                            <Switch>
                                {authProtectedRoutesAdmin.map((route, idx) => (
                                    <AccessRoute
                                        path={route.path}
                                        component={route.component}
                                        key={idx}
                                        exact={true}
                                    />
                                ))}
                            </Switch>
                        </VerticalLayout>
                    </AuthProtected>
                </Route>
            </Switch>
        </React.Fragment>
    );
};

export default Index;