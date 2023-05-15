import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Store } from "../../../../../../services/store";



const Navdata = () => {
    const store = useContext(Store);
    const [user_type, setUser_type] = store.user_type;

    const history = useHistory();
    //state data
    const [isDashboard, setIsDashboard] = useState(false);
    const [isApps, setIsApps] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [isPages, setIsPages] = useState(false);
    const [isBaseUi, setIsBaseUi] = useState(false);
    const [isAdvanceUi, setIsAdvanceUi] = useState(false);
    const [isForms, setIsForms] = useState(false);
    const [isTables, setIsTables] = useState(false);
    const [isCharts, setIsCharts] = useState(false);
    const [isIcons, setIsIcons] = useState(false);
    const [isMaps, setIsMaps] = useState(false);
    const [isMultiLevel, setIsMultiLevel] = useState(false);

    // Apps
    const [isEcommerce, setIsEcommerce] = useState(false);
    const [isProjects, setIsProjects] = useState(false);
    const [isTasks, setIsTasks] = useState(false);
    const [isCRM, setIsCRM] = useState(false);
    const [isCrypto, setIsCrypto] = useState(false);
    const [isInvoices, setIsInvoices] = useState(false);
    const [isSupportTickets, setIsSupportTickets] = useState(false);

    // Authentication
    const [isSignIn, setIsSignIn] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [isPasswordReset, setIsPasswordReset] = useState(false);
    const [isLockScreen, setIsLockScreen] = useState(false);
    const [isLogout, setIsLogout] = useState(false);
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);
    const [isVerification, setIsVerification] = useState(false);
    const [isError, setIsError] = useState(false);

    // Pages
    const [isProfile, setIsProfile] = useState(false);

    // Charts
    const [isApex, setIsApex] = useState(false);

    // Multi Level
    const [isLevel1, setIsLevel1] = useState(false);
    const [isLevel2, setIsLevel2] = useState(false);

    const [iscurrentState, setIscurrentState] = useState('Dashboard');

    function updateIconSidebar(e) {
        if (e && e.target && e.target.getAttribute("subitems")) {
            const ul = document.getElementById("two-column-menu");
            const iconItems = ul.querySelectorAll(".nav-icon.active");
            let activeIconItems = [...iconItems];
            activeIconItems.forEach((item) => {
                item.classList.remove("active");
                var id = item.getAttribute("subitems");
                if (document.getElementById(id))
                    document.getElementById(id).classList.remove("show");
            });
        }
    }

    useEffect(() => {
        document.body.classList.remove('twocolumn-panel');
        if (iscurrentState !== 'Dashboard') {
            setIsDashboard(false);
        }
        if (iscurrentState !== 'Apps') {
            setIsApps(false);
        }
        if (iscurrentState !== 'Auth') {
            setIsAuth(false);
        }
        if (iscurrentState !== 'Pages') {
            setIsPages(false);
        }
        if (iscurrentState !== 'BaseUi') {
            setIsBaseUi(false);
        }
        if (iscurrentState !== 'AdvanceUi') {
            setIsAdvanceUi(false);
        }
        if (iscurrentState !== 'Forms') {
            setIsForms(false);
        }
        if (iscurrentState !== 'Tables') {
            setIsTables(false);
        }
        if (iscurrentState !== 'Charts') {
            setIsCharts(false);
        }
        if (iscurrentState !== 'Icons') {
            setIsIcons(false);
        }
        if (iscurrentState !== 'Maps') {
            setIsMaps(false);
        }
        if (iscurrentState !== 'MuliLevel') {
            setIsMultiLevel(false);
        }
        if (iscurrentState === 'Widgets') {
            history.push("/widgets");
            document.body.classList.add('twocolumn-panel');
        }
    }, [
        history,
        iscurrentState,
        isDashboard,
        isApps,
        isAuth,
        isPages,
        isBaseUi,
        isAdvanceUi,
        isForms,
        isTables,
        isCharts,
        isIcons,
        isMaps,
        isMultiLevel
    ]);

    const menuItems = [

        {
            id: "dashboard",
            label: "Facility",
            icon: "ri-home-8-line",
            link: "/#",
            stateVariables: isDashboard,
            click: function (e) {
                e.preventDefault();
                setIsDashboard(!isDashboard);
                setIscurrentState('Dashboard');
                // updateIconSidebar(e);
            },
            subItems: [
                {
                    id: "registered_facility",
                    label: "Registered Facility",
                    icon: "ri-dashboard-2-line",
                    link: `/registered-facility`,
                    parentId: 'dashboard'

                },
                {
                    id: "approved_facility",
                    label: "Approved Facility",
                    icon: "ri-dashboard-2-line",
                    link: `/approved-facility`,
                    parentId: 'dashboard'
                }
            ],
        },
        //apps
        {
            id: "optician",
            label: "Optician",
            icon: " ri-eye-fill",
            link: `/#`,
            stateVariables: isApps,
            click: function (e) {
                e.preventDefault();
                setIsApps(!isApps);
                setIscurrentState('Apps');
                updateIconSidebar(e);
            },
            stateVariables: isApps,
            subItems: [
                {
                    id: "registered_optician",
                    label: "Registered Optician",
                    icon: "ri-dashboard-2-line",
                    link: `/registered-optician`,
                    parentId: 'optician'
                },
                {
                    id: "approved_optician",
                    label: "Approved Optician",
                    icon: "ri-dashboard-2-line",
                    link: `/approved-optician`,
                    parentId: 'optician'

                },
            ]
        },


        {
            id: "registered_training",
            label: "Supervised Ophthalmic Laboratory Experience",
            icon: "ri-dashboard-2-line",
            link: `/registered-training`,
        },
        // {
        //     id: "approved_training",
        //     label: "Approved Supervised Ophthalmic Laboratory Experience",
        //     icon: "ri-dashboard-2-line",
        //     link: `/approved-training`,
        // },

        // auth
        {
            id: "optometrist",
            label: "Optometrist",
            icon: "ri-search-eye-line",
            link: `/#`,
            stateVariables: isAuth,
            click: function (e) {
                e.preventDefault();
                setIsAuth(!isAuth);
                setIscurrentState('Auth');
                updateIconSidebar(e);
            },
            stateVariables: isAuth,
            subItems: [
                {
                    id: "registered_optometrist",
                    label: "Registered Optometrist",
                    icon: "ri-dashboard-2-line",
                    link: `/registered-optometrist`,
                    parentId: 'optometrist'

                },
                {
                    id: "approved_optometrist",
                    label: "Approved Optometrist",
                    icon: "ri-dashboard-2-line",
                    link: `/approved-optometrist`,
                    parentId: 'optometrist'
                },
            ]
        },

        {
            id: "registered_internship",
            label: "Internship",
            icon: "ri-dashboard-2-line",
            link: `/registered-internship`,
        },
        // {
        //     id: "approved_internship",
        //     label: "Approved Internship",
        //     icon: "ri-dashboard-2-line",
        //     link: `/approved-internship`,
        // },
        {
            id: "indexing",
            label: "Indexing",
            icon: "ri-dashboard-2-line", 
            link: `/registered-indexing`,
        },
        {
            id: "board_number",
            label: "Board Numbers",
            icon: " ri-barcode-line",
            link: `/board-number`,
        },
        {
            id: "plan_payment",
            label: "Payment Plan",
            icon: " ri-bank-card-2-fill",
            link: `/payment-plan`,
        },
        {
            id: "messages",
            label: "Messages",
            icon: "ri-message-2-line", 
            link: `/admin-messages`,
        }
    ];
    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;