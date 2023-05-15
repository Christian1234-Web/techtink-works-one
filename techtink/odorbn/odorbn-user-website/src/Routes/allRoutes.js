import React from "react";
import { Redirect } from "react-router-dom";

import CoverSignIn from '../pages/AuthenticationInner/Login/CoverSignIn';
import CoverSignUp from "../pages/AuthenticationInner/Register/CoverSignUp";
import BasicPasswReset from '../pages/AuthenticationInner/PasswordReset/BasicPasswReset';

import ProfileDashoard from '../pages/Pages/Government/SimplePage';
import OpticianProfileDashboard from '../pages/Pages/Government/Pages/SimplePageOpticians';
import NewOptician from '../pages/Pages/Government/RegForm/PracticeRegTwoOptician';
import NewTraining from '../pages/Pages/Government/Intenship/WizardOptician';
import NewFacility from '../pages/Pages/Government/RegForm/PracticeReg';


import OptometristProfileDashboard from '../pages/Pages/Government/Pages/SimplePageOptometrists';
import NewOptometrist from '../pages/Pages/Government/RegForm/PracticeRegTwoOptometrist';
import NewInternship from '../pages/Pages/Government/Intenship/WizardOptometrist';
import IndectionProfileDashboard from '../pages/Pages/Government/Pages/SimplePageIndections';
import ProfileSetting from '../pages/Pages/Government/Settings';
import CoverPasswReset from '../pages/AuthenticationInner/PasswordReset/CoverPasswReset';

import CoverLockScreen from '../pages/AuthenticationInner/LockScreen/CoverLockScr';
import CoverLogout from '../pages/AuthenticationInner/Logout/CoverLogout';
import BasicSuccessMsg from '../pages/AuthenticationInner/SuccessMessage/BasicSuccessMsg';
import CoverSuccessMsg from '../pages/AuthenticationInner/SuccessMessage/CoverSuccessMsg';
import BasicTwosVerify from '../pages/AuthenticationInner/TwoStepVerification/BasicTwosVerify';
import CoverTwosVerify from '../pages/AuthenticationInner/TwoStepVerification/CoverTwosVerify';
import Basic404 from '../pages/AuthenticationInner/Errors/Basic404';
import Cover404 from '../pages/AuthenticationInner/Errors/Cover404';
import Alt404 from '../pages/AuthenticationInner/Errors/Alt404';
import Error500 from '../pages/AuthenticationInner/Errors/Error500';

//login
// import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";

import NewPasswReset from "../pages/AuthenticationInner/PasswordReset/NewPasswReset";
import CoverSignInIndex from "../pages/AuthenticationInner/Login/CoverSignInIndex";
import CoverSignUpIndex from "../pages/AuthenticationInner/Register/CoverSignUpIndex";
import Facility from "../pages/Pages/Government/Views/FaciltyIndexing";
import Indexing from "../pages/Pages/Government/Views/IndexingFacility";
import Optician from "../pages/Pages/Government/Views/InternshipTraining";
import Optometrist from "../pages/Pages/Government/Views/OpticianOptometrist";

import Invoice from "../pages/Pages/Government/Invoice";

// ADMIN SECTION
import Index from "../pages/Pages/Government/Admin/Index";
import InvoiceAdmin from "../pages/Pages/Government/Admin/Invoice";

import RegisterFacility from "../pages/Pages/Government/Admin/RegisterFacility";
import ApprovedFacility from "../pages/Pages/Government/Admin/ApprovedFacility";
import RegisterOptician from "../pages/Pages/Government/Admin/RegisteredOptician";
import ApproveOptician from "../pages/Pages/Government/Admin/ApprovedOptician";
import RegisterTraining from "../pages/Pages/Government/Admin/RegisteredTraining";
import ApproveTraining from "../pages/Pages/Government/Admin/ApprovedTraining";
import RegisterOptometrist from "../pages/Pages/Government/Admin/RegisteredOptometrist";
import ApproveOptometrist from "../pages/Pages/Government/Admin/ApprovedOptometrist";
import RegisterInternship from "../pages/Pages/Government/Admin/RegisteredInternship";
import ApproveInternship from "../pages/Pages/Government/Admin/ApprovedInternship";
import Messages from "../pages/Pages/Government/Admin/EmailInbox"
import EditFacility from "../pages/Pages/Government/Admin/EditFacility"
import AdminIndexing from "../pages/Pages/Government/Admin/Indexing";



import IndexingFacility from "../pages/Pages/Government/Admin/IndexingFacility";
import CoverSigninAdmin from "../pages/AuthenticationInner/Login/CoverSignInAdmin";
import FacilityIndexing from "../pages/Pages/Government/Admin/FaciltyIndexing";
import OpticianOptometristViewPage from "../pages/Pages/Government/Admin/OpticianOptometristViewPage";
import InternshipTraining from "../pages/Pages/Government/Admin/InternshipTraining";
import BoardNumber from "../pages/Pages/Government/Admin/BoardNumber";
import PaymentPlan from "../pages/Pages/Government/Admin/PaymentPlan";



const authProtectedRoutes = [
  //Pages
  // { path: "/admin-dashboard", component: Index },

  { path: '/facility-dashboard', component: ProfileDashoard },
  { path: '/:type/invoice/:id', component: Invoice },
  { path: '/optician-dashboard', component: OpticianProfileDashboard },
  { path: '/new-optician', component: NewOptician },
  { path: '/new-training', component: NewTraining },
  { path: '/update-optician/:id', component: NewOptician },
  { path: '/update-training/:id', component: NewTraining },
  { path: '/optometrist-dashboard', component: OptometristProfileDashboard },
  { path: '/new-optometrist', component: NewOptometrist },
  { path: '/new-internship', component: NewInternship },
  { path: '/new-facility', component: NewFacility },
  { path: '/update-facility/:id', component: NewFacility },


  { path: '/update-optometrist/:id', component: NewOptometrist },
  { path: '/update-internship/:id', component: NewInternship },
  { path: '/indexing-dashboard', component: IndectionProfileDashboard },

  { path: `/dashboard-profile/edit/:id`, component: ProfileSetting },
  { path: "/facility-dashboard/:type/:id", component: Facility },
  { path: "/indexing-dashboard/:type/:id", component: Indexing },
  { path: "/optician-dashboard/:type/:id", component: Optician },
  { path: "/optician-dashboard/oo/:type/:id", component: Optometrist },

  { path: "/optometrist-dashboard/:type/:id", component: Optician },
  { path: "/optometrist-dashboard/oo/:type/:id", component: Optometrist },


  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/signin" />,
  },
  {
    path: "*",
    exact: true,
    component: () => <Redirect to="/auth-404-cover" />,
  }
];
const authProtectedRoutesAdmin = [

  { path: "/admin-dashboard", component: Index },
  { path: "/registered-facility", component: RegisterFacility },
  { path: "/approved-facility", component: ApprovedFacility },
  { path: "/registered-optician", component: RegisterOptician },
  { path: "/approved-optician", component: ApproveOptician },
  { path: "/registered-training", component: RegisterTraining },
  { path: "/approved-training", component: ApproveTraining },
  { path: "/registered-optometrist", component: RegisterOptometrist },
  { path: "/approved-optometrist", component: ApproveOptometrist },
  { path: "/registered-internship", component: RegisterInternship },
  { path: "/approved-internship", component: ApproveInternship },
  { path: "/registered-indexing", component: AdminIndexing },


  { path: "/board-number", component: BoardNumber },
  { path: "/payment-plan", component: PaymentPlan },
  { path: "/admin-messages", component: Messages },

  { path: '/:type/:rp/invoice/:id', component: InvoiceAdmin },

  { path: "/edit-:type/facility/:id", component: EditFacility },

  { path: "/admin-:rp-op/:type/:id", component: OpticianOptometristViewPage },
  { path: "/admin-:rp-it/:type/:id", component: InternshipTraining },
  { path: "/admin-:rp-fi/:type/:id", component: FacilityIndexing },
  { path: "/admin-:rp-if/:type/:id", component: IndexingFacility },

  //AuthenticationInner pages

];
const publicRoutes = [
  // { path: "/admin-dashboard", component: Index },
  // Authentication Page
  // { path: "/forgot-password", component: ForgetPasswordPage },
  { path: "/register", component: CoverSignUp },
  { path: '/admin-login', component: CoverSigninAdmin },

  //AuthenticationInner pages
  { path: "/signin", component: CoverSignIn },
  { path: '/indexing-login', component: CoverSignInIndex },
  { path: '/indexing-signup', component: CoverSignUpIndex },

  { path: "/signup", component: CoverSignUp },
  { path: "/auth-pass-reset-cover", component: CoverPasswReset },
  { path: "/auth-new-pass-cover", component: NewPasswReset },

  { path: "/auth-lockscreen-cover", component: CoverLockScreen },
  { path: "/auth-logout-cover", component: CoverLogout },
  { path: "/auth-success-msg-basic", component: BasicSuccessMsg },
  { path: "/auth-success-msg-cover", component: CoverSuccessMsg },
  { path: "/auth-twostep-basic", component: BasicTwosVerify },
  { path: "/auth-twostep-cover", component: CoverTwosVerify },
  { path: "/auth-404-basic", component: Basic404 },
  { path: "/auth-404-cover", component: Cover404 },
  { path: "/auth-404-alt", component: Alt404 },
  { path: "/auth-500", component: Error500 },
  // {
  //   path: "*",
  //   exact: true,
  //   component: () => <Redirect to="/auth-404-cover" />,
  // }
];

export { authProtectedRoutes, authProtectedRoutesAdmin, publicRoutes };