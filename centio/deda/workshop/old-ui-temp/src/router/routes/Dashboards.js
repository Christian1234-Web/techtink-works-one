import { lazy } from 'react'
import { Redirect } from 'react-router-dom'


const DashboardRoutes = [
  // Dashboards

  {
    path: '/dashboard/appointments',
    component: lazy(() => import('../../views/dashboard/appointment'))
  },
  {
    path: '/dashboard/store-inventory',
    component: lazy(() => import('../../views/dashboard/storeinventory'))
  },
  {
    path: '/dashboard/store-requisition',
    component: lazy(() => import('../../views/dashboard/storerequisition'))
  },
  {
    path: '/dashboard/hmo-schemes',
    component: lazy(() => import('../../views/dashboard/hmoscheme'))
  },
  {
    path: '/dashboard/hmo-companies',
    component: lazy(() => import('../../views/dashboard/hmocompany'))
  },
  {
    path: '/dashboard/hmo-transaction',
    component: lazy(() => import('../../views/dashboard/hmotransaction'))
  },
  {
    path: '/dashboard/my-account-payslips',
    component: lazy(() => import('../../views/dashboard/myaccountpayslip'))
  },
  {
    path: '/dashboard/my-account-duty-roster',
    component: lazy(() => import('../../views/dashboard/myaccountdutyroster'))
  },
  {
    path: '/dashboard/my-account-appraisal',
    component: lazy(() => import('../../views/dashboard/myaccountappraisal'))
  },
  {
    path: '/dashboard/my-account-leave-request',
    component: lazy(() => import('../../views/dashboard/myaccountleaverequest'))
  },
  {
    path: '/dashboard/my-account-excuse-duty',
    component: lazy(() => import('../../views/dashboard/myaccountexcuseduty'))
  },
  {
    path: '/dashboard/my-account-requisition',
    component: lazy(() => import('../../views/dashboard/myaccountrequisition'))
  },
  {
    path: '/dashboard/clinical-tasks',
    component: lazy(() => import('../../views/dashboard/clinicaltasks'))
  },
  {
    path: '/dashboard/hr-staff-list',
    component: lazy(() => import('../../views/dashboard/hrstafflist'))
  },

  {
    path: '/dashboard/hr-appraisal',
    component: lazy(() => import('../../views/dashboard/hrappraisal'))
  },
  {
    path: '/dashboard/hr-excuse-duty',
    component: lazy(() => import('../../views/dashboard/hrexcuseduty'))
  },
  {
    path: '/dashboard/hr-leave-mgt',
    component: lazy(() => import('../../views/dashboard/hrleavemgt'))
  },
  {
    path: '/dashboard/hr-payroll',
    component: lazy(() => import('../../views/dashboard/hrpayroll'))
  },
  {
    path: '/dashboard/hr-duty-roster',
    component: lazy(() => import('../../views/dashboard/hrdutyroster'))
  },
  {
    path: '/dashboard/ivh',
    component: lazy(() => import('../../views/dashboard/ivh'))
  },
  {
    path: '/dashboard/doctor',
    component: lazy(() => import('../../views/dashboard/doctorhome'))
  },
  {
    path: '/dashboard/setting/:id',
    component: lazy(() => import('../../views/dashboard/setting/view'))
  },
  {
    path: '/dashboard/staff/:id',
    component: lazy(() => import('../../views/dashboard/staffhome/user/view')),
    meta: {
      navLink: '/dashboard/staff/view'
    }
  },
  {
    path: '/dashboard/cafeteria',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/dashboard/cafeteriahome/checkout'))
  },
  {
    path: '/dashboard/doctor-appointment-history',
    component: lazy(() => import('../../views/dashboard/doctorappointmenthistory'))
  },
  {
    path: '/dashboard/labour-management',
    component: lazy(() => import('../../views/dashboard/labourmanagement'))
  },
  {
    path: '/dashboard/nicu',
    component: lazy(() => import('../../views/dashboard/nicu'))
  },
  {
    path: '/dashboard/vitals-queue',
    component: lazy(() => import('../../views/dashboard/vitalsqueue'))
  },
  {
    path: '/dashboard/antenatal',
    component: lazy(() => import('../../views/dashboard/antenatal'))
  },
  {
    path: '/dashboard/insurance-transactions',
    component: lazy(() => import('../../views/dashboard/insurance'))
  },
  {
    path: '/dashboard/vouchers',
    component: lazy(() => import('../../views/dashboard/vouchers'))
  }, {
    path: '/dashboard/pending-bills',
    component: lazy(() => import('../../views/dashboard/pendingbills'))
  }, {
    path: '/dashboard/transaction-history',
    component: lazy(() => import('../../views/dashboard/transactionhistory'))
  },
  {
    path: '/dashboard/transaction-history-print',
    layout: 'BlankLayout',
    component: lazy(() => import('../../views/dashboard/transactionhistory/list/print'))
  },
  {
    path: '/dashboard/paypoint',
    component: lazy(() => import('../../views/dashboard/paypointhome'))
  },
  {
    path: '/dashboard/pharmacy-paypoint',
    component: lazy(() => import('../../views/dashboard/pharmacypaypoint'))
  },
  {
    path: '/dashboard/pharmacy-inventory',
    component: lazy(() => import('../../views/dashboard/pharmacyinventory'))
  },
  {
    path: '/dashboard/pharmacy/:id',
    component: lazy(() => import('../../views/dashboard/pharmacyhome/view')),
    meta: {
      navLink: '/dashboard/laboratory/view'
    }
  },
  {
    path: '/dashboard/radiology/:id',
    component: lazy(() => import('../../views/dashboard/radiologyhome/view')),
    meta: {
      navLink: '/dashboard/radiology/view'
    }
  },
  {
    path: '/dashboard/procedure/:id',
    component: lazy(() => import('../../views/dashboard/procedurehome/view')),
    meta: {
      navLink: '/dashboard/procedure/view'
    }
  },
  {
    path: '/dashboard/in-patients/:id',
    component: lazy(() => import('../../views/dashboard/inpatients/view')),
    meta: {
      navLink: '/dashboard/inpatients/view'
    }
  },

  {
    path: `/dashboard/lab/:id`,
    component: lazy(() => import('../../views/dashboard/laboratory/view')),
    meta: {
      navLink: '/dashboard/laboratory/view'
    }
  },
  {
    path: '/dashboard/invoice/list',
    component: lazy(() => import('../../views/apps/invoice/list'))
  },
  {
    path: '/dashboard/invoice/preview/:id',
    component: lazy(() => import('../../views/apps/invoice/preview')),
    meta: {
      navLink: '/dashboard/invoice/preview'
    }
  },
  {
    path: '/dashboard/invoice/preview',
    exact: true,
    component: () => <Redirect to='/dashboard/invoice/preview/4987' />
  },
  {
    path: '/dashboard/invoice/edit/:id',
    component: lazy(() => import('../../views/apps/invoice/edit')),
    meta: {
      navLink: '/dashboard/invoice/edit'
    }
  },
  {
    path: '/dashboard/invoice/edit',
    exact: true,
    component: () => <Redirect to='/dashboard/invoice/edit/4987' />
  },
  {
    path: '/dashboard/invoice/add',
    component: lazy(() => import('../../views/dashboard/invoice/add'))
  },
  {
    path: '/dashboard/invoice/print',
    layout: 'BlankLayout',
    component: lazy(() => import('../../views/dashboard/invoice/print'))
  },

  {
    path: `/dashboard/admitted-patients/:id`,
    component: lazy(() => import('../../views/dashboard/admitted/index'))
  },
  {
    path: '/dashboard/admitted-patients',
    exact: true,
    component: () => <Redirect to='/dashboard/admitted-patients/1' />
  },
  {
    path: '/dashboard/patients/view/:id',
    component: lazy(() => import('../../views/dashboard/ecommerce/calendar/view')),
    meta: {
      navLink: '/dashboard/patients/calender/view'
    }
  },
  {
    path: '/dashboard/patients/view',
    exact: true,
    component: () => <Redirect to='/dashboard/patients/view/1' />

  }
]

export default DashboardRoutes
