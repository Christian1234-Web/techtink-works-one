import React from "react";
import { Redirect } from "react-router-dom";
import OpticianOptometristViewPage from "../../OpticianOptometristViewPage";
import InternshipTraining from "../../InternshipTraining";
import RegisterFacility from "../../RegisterFacility";

//login
import Index from "../../Index";
import CoverSigninAdmin from "../../../../../AuthenticationInner/Login/CoverSignInAdmin";
import FacilityIndexing from "../../FaciltyIndexing";

import IndexingFacility from "../../IndexingFacility";


const authProtectedRoutesAdmin = [

  { path: "/admin-dashboard", component: Index },
  { path: "/registered-facility", component: RegisterFacility },

  { path: "/admin-dashboard-op/:type/:id", component: OpticianOptometristViewPage },
  { path: "/admin-dashboard-it/:type/:id", component: InternshipTraining },
  { path: "/admin-dashboard-fi/:type/:id", component: FacilityIndexing },
  { path: "/admin-dashboard-if/:type/:id", component: IndexingFacility },

  //AuthenticationInner pages
  { path: '/admin-login', component: CoverSigninAdmin },

];

export { authProtectedRoutesAdmin };