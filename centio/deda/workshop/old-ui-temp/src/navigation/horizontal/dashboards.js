// ** Icons Import
import { Home, Circle } from 'react-feather'

export default [
  {
    header: 'FRONTDESK'
  },
  // {
  //   id: 'dashboards',
  //   title: 'FRONTDESK',
  //   icon: <Home size={20} />,

  // },
  // children: [
  {
    id: 'patientstDash',
    title: 'Patients',
    icon: <Circle size={12} />,
    navLink: `/dashboard/patients/view/${1}`
  },
  {
    id: 'appointmentDash',
    title: 'Appointments',
    icon: <Circle size={12} />,
    navLink: '/dashboard/appointments'
  },

  {
    id: 'admittedPatientsDash',
    title: 'Admitted Patients',
    icon: <Circle size={12} />,
    navLink: `/dashboard/admitted-patients${1}`
  },
  {
    id: 'insuranceTransactionDash',
    title: 'Insurance Trans...',
    icon: <Circle size={12} />,
    navLink: '/dashboard/insurance-transactions'
  },
  {
    header: 'CLINICAL LAB'
  },
  {
    id: 'labDash',
    title: 'Dashboard',
    icon: <Home size={20} />,
    navLink: `/dashboard/lab/${1}`
  },
  {
    header: 'PAYPOINT'
  },
  {
    id: 'paypointDash',
    title: 'Home',
    icon: <Home size={12} />,
    navLink: `/dashboard/paypoint`
  },
  {
    id: 'vouchersDash',
    title: 'Vouchers ',
    icon: <Circle size={12} />,
    navLink: `/dashboard/vouchers`
  },
  {
    id: 'pendingbillssDash',
    title: 'Pending Bills',
    icon: <Circle size={12} />,
    navLink: `/dashboard/pending-bills`
  },
  {
    id: 'transactionhistoryDash',
    title: 'Transaction History',
    icon: <Circle size={12} />,
    navLink: `/dashboard/transaction-history`
  },
  {
    header: 'PHARMACY'
  },
  {
    id: 'pharmacyDash',
    title: 'Dashboard',
    icon: <Home size={20} />,
    navLink: `/dashboard/pharmacy/${1}`
  },
  {
    id: 'pharmacypaypointDash',
    title: 'Pay Point',
    icon: <Circle size={12} />,
    navLink: `/dashboard/pharmacy-paypoint`
  },
  {
    id: 'pharmacyinventoryDash',
    title: 'Pharmacy Inventory',
    icon: <Circle size={12} />,
    navLink: `/dashboard/pharmacy-inventory`
  },
  {
    header: 'RADIOLOGY'
  },
  {
    id: 'radiologyDash',
    title: 'Dashboard',
    icon: <Home size={20} />,
    navLink: `/dashboard/radiology/${1}`
  },
  {
    header: 'PROCEDURE'
  },
  {
    id: 'procedureDash',
    title: 'Dashboard',
    icon: <Home size={20} />,
    navLink: `/dashboard/procedure/${1}`
  },
  {
    header: 'NURSE'
  },
  {
    id: 'vitalsqueueDash',
    title: 'Vitals Queue',
    icon: <Circle size={12} />,
    navLink: `/dashboard/vitals-queue`
  },
  {
    id: 'inpatientsDash',
    title: 'In-Patients (Care)',
    icon: <Circle size={12} />,
    navLink: `/dashboard/in-patients/${1}`
  },
  {
    id: 'clinicaltasksDash',
    title: 'Clinical Tasks',
    icon: <Circle size={12} />,
    navLink: `/dashboard/clinical-tasks`
  },
  {
    id: 'ivhDash',
    title: 'IVH',
    icon: <Circle size={12} />,
    navLink: `/dashboard/ivh`
  },
  {
    id: 'nicuDash',
    title: 'NICU',
    icon: <Circle size={12} />,
    navLink: `/dashboard/nicu`
  },
  {
    id: 'nurseantenatalDash',
    title: 'Antenatal ',
    icon: <Circle size={12} />,
    navLink: `/dashboard/antenatal`
  },
  {
    id: 'labourmanagementDash',
    title: 'Labour Management',
    icon: <Circle size={12} />,
    navLink: `/dashboard/labour-management`
  },

  {
    header: 'DOCTOR'
  },
  {
    id: 'doctorhomeDash',
    title: 'Dashboard',
    icon: <Home size={12} />,
    navLink: `/dashboard/doctor`
  },
  {
    id: 'doctorpatientstDash',
    title: 'Patients',
    icon: <Circle size={12} />,
    navLink: `/dashboard/patients/view/${1}`
  },
  {
    id: 'docotrinpatientsDash',
    title: 'In-Patients (Care)',
    icon: <Circle size={12} />,
    navLink: `/dashboard/in-patients/${1}`
  },
  {
    id: 'doctorappointmenthistoryDash',
    title: 'Appointment History',
    icon: <Circle size={12} />,
    navLink: `/dashboard/doctor-appointment-history`
  },
  {
    id: 'docotrivhDash',
    title: 'IVH',
    icon: <Circle size={12} />,
    navLink: `/dashboard/ivh`
  },
  {
    id: 'doctorantenatalDash',
    title: 'Antenatal ',
    icon: <Circle size={12} />,
    navLink: `/dashboard/antenatal`
  },
  {
    id: 'docotorlabourmanagementDash',
    title: 'Labour Management',
    icon: <Circle size={12} />,
    navLink: `/dashboard/labour-management`
  },
  {
    header: 'HR & PAYROLL'
  },
  {
    id: 'hrstafflistDash',
    title: 'Staff List',
    icon: <Circle size={12} />,
    navLink: `/dashboard/hr-staff-list`
  },
  {
    id: 'hrappraisalDash',
    title: 'Appraisal',
    icon: <Circle size={12} />,
    navLink: `/dashboard/hr-appraisal`
  },
  {
    id: 'hrpayrollDash',
    title: 'Payroll',
    icon: <Circle size={12} />,
    navLink: `/dashboard/hr-payroll`
  },
  {
    id: 'hrexcusedutyDash',
    title: 'Excuse Duty',
    icon: <Circle size={12} />,
    navLink: `/dashboard/hr-excuse-duty`
  },
  {
    id: 'hrleavemgtDash',
    title: 'Leave Mgt',
    icon: <Circle size={12} />,
    navLink: `/dashboard/hr-leave-mgt`
  },
  {
    id: 'hrdutyrosterDash',
    title: 'Duty Roster',
    icon: <Circle size={12} />,
    navLink: `/dashboard/hr-duty-roster`
  },
  {
    header: 'STORE'
  },
  {
    id: 'storeinventoryDash',
    title: 'Inventory',
    icon: <Circle size={12} />,
    navLink: `/dashboard/store-inventory`
  },
  {
    id: 'storerequisitionDash',
    title: 'Requisition',
    icon: <Circle size={12} />,
    navLink: `/dashboard/store-requisition`
  },
  {
    header: 'CAFETERIA'
  },
  {
    id: 'criteriahomeDash',
    title: 'Dashboard',
    icon: <Circle size={12} />,
    navLink: `/dashboard/vitals-queue`
  },
  {
    id: 'criteriainventoryDash',
    title: 'Inventory',
    icon: <Circle size={12} />,
    navLink: `/dashboard/vitals-queue`
  },
  {
    id: 'criteriarequisitionDash',
    title: 'Requisition',
    icon: <Circle size={12} />,
    navLink: `/dashboard/vitals-queue`
  },
  {
    header: 'HMO MGT'
  },
  {
    id: 'hmocompanyhomeDash',
    title: 'HMO Companies',
    icon: <Circle size={12} />,
    navLink: `/dashboard/hmo-companies`
  },
  {
    id: 'hmoschemesDash',
    title: 'HMO Schemes',
    icon: <Circle size={12} />,
    navLink: `/dashboard/hmo-schemes`
  },
  {
    id: 'hmotransactionnDash',
    title: 'Transaction',
    icon: <Circle size={12} />,
    navLink: `/dashboard/hmo-transaction`
  },
  {
    header: 'RECORDS'
  }, {
    header: 'ACCOUNTING'
  }, {
    header: 'CONFIGURATIONS'
  },
  {
    id: 'confiqsettingDash',
    title: 'Settings',
    icon: <Circle size={12} />,
    navLink: `/dashboard/setting/${1}`
  },
  {
    header: 'MY ACCOUNT'
  },
  {
    id: 'myaccountpayslipsDash',
    title: 'Payslips',
    icon: <Circle size={12} />,
    navLink: `/dashboard/my-account-payslips`
  },
  {
    id: 'myaccountdutyrsoterDash',
    title: 'Duty Roster',
    icon: <Circle size={12} />,
    navLink: `/dashboard/my-account-duty-roster`
  },
  {
    id: 'myaccountappraisalDash',
    title: 'Appraisal',
    icon: <Circle size={12} />,
    navLink: `/dashboard/my-account-appraisal`
  },
  {
    id: 'myaccountleaverequestDash',
    title: 'Leave Request',
    icon: <Circle size={12} />,
    navLink: `/dashboard/my-account-leave-request`
  },
  {
    id: 'myaccountexcusedutyDash',
    title: 'Excuse Duty',
    icon: <Circle size={12} />,
    navLink: `/dashboard/my-account-excuse-duty`
  },
  {
    id: 'myaccountrequisitionDash',
    title: 'Requisition',
    icon: <Circle size={12} />,
    navLink: `/dashboard/my-account-requisition`
  },
  {
    header: 'CONFIGURATIONS'
  },
  {
    id: 'settingDash',
    title: 'Settings',
    icon: <Circle size={12} />,
    navLink: `/dashboard/setting/${1}`
  },
  {
    header: 'THE END'
  },
  {
    id: 'invoiceAppp',
    title: 'Invoice',
    icon: <Circle size={20} />,
    children: [
      {
        id: 'invoiceList',
        title: 'List',
        icon: <Circle size={12} />,
        navLink: '/dashboard/invoice/list'
      },
      {
        id: 'invoicePreview',
        title: 'Preview',
        icon: <Circle size={12} />,
        navLink: '/dashboard/invoice/preview'
      },
      {
        id: 'invoiceEdit',
        title: 'Edit',
        icon: <Circle size={12} />,
        navLink: '/dashboard/invoice/edit'
      },
      {
        id: 'invoiceAdd',
        title: 'Add',
        icon: <Circle size={12} />,
        navLink: '/dashboard/invoice/add'
      }
    ]
  }
  // ]
]
