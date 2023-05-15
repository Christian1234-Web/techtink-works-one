import React from 'react'
import { useRouter } from 'next/router' 

export default function PageLabel() {

    const router = useRouter()  
    const [label, setLabel] = React.useState("")

    React.useEffect(()=> {
        if(router.pathname === "/dashboard"){
            setLabel("Account Information")
        } else if(router.pathname === "/dashboard"){
            setLabel("Account Information")
        } else if(router.pathname === "/delivery-address"){
            setLabel("Delivery Address")
        } else if(router.pathname === "/active-order"){
            setLabel("Active Order")
        } else if(router.pathname === "/pending-order"){
            setLabel("Pending Order")
        } else if(router.pathname === "/completed-order"){
            setLabel("Completed Order")
        } else if(router.pathname === "/wallet" ){
            setLabel("Wallet")
        } else if(router.pathname === "/transactions" ){
            setLabel("Transactions")
        }
    }, [router])

    return (
        <div className=' w-full h-[80px] flex flex-col text-white px-[108px] bg-[#D2301C] py-[15px] ' >
            <p className=' font-medium text-sm ' >Home {">"} My Account {">"} {label}</p>
            <p className=' font-bold text-lg mt-auto ' >{label}</p>
        </div>
    )
} 