import React from 'react';
import { Switch, Route } from "react-router-dom";

//Layouts
import NonAuthLayout from "../Layouts/NonAuthLayout";
import VerticalLayout from "../Layouts/VerticalLayouts";
import VerticalLayoutAdmin from "../pages/Pages/Government/Admin/AdminLayout/VerticalLayouts";

//routes
import { authProtectedRoutes, publicRoutes, authProtectedRoutesAdmin } from "./allRoutes";
// import { authProtectedRoutesAdmin } from "../pages/Pages/Government/Admin/AdminLayout/Routes/allRoutes";

import { AuthProtected, AccessRoute } from './AuthProtected';
import { AuthProtectedAdmin, AccessRouteAdmin } from './AuthProtectedAdmin';

const Index = () => {
    const availablePublicRoutesPaths = publicRoutes.map((r) => r.path);
    const availableAuthRoutesPath = authProtectedRoutes.map((r) => r.path);
    const availableAuthRoutesPathAdmin = authProtectedRoutesAdmin.map((r) => r.path);
    // console.log(authProtectedRoutesAdmin) 
    return (
        <React.Fragment>
            <Switch>
                <Route path={availablePublicRoutesPaths}>
                    <NonAuthLayout>
                        <Switch>
                            {publicRoutes.map((route, idx) => (
                                <Route
                                    path={route.path}
                                    component={route.component}
                                    key={idx}
                                    exact={true}
                                />
                            ))}
                        </Switch>
                    </NonAuthLayout>
                </Route>
                <Route path={availableAuthRoutesPathAdmin}>
                    <AuthProtectedAdmin>
                        <VerticalLayoutAdmin>
                            <Switch>
                                {authProtectedRoutesAdmin.map((route, idx) => (
                                    <AccessRouteAdmin
                                        path={route.path}
                                        component={route.component}
                                        key={idx}
                                        exact={true}
                                    />
                                ))}
                            </Switch>
                        </VerticalLayoutAdmin>
                    </AuthProtectedAdmin>
                </Route>
                <Route path={availableAuthRoutesPath}>
                    <AuthProtected>
                        <VerticalLayout>
                            <Switch>
                                {authProtectedRoutes.map((route, idx) => (
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