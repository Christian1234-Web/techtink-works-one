import React from 'react'
import { Image } from '@chakra-ui/react'
import DashboardLayout from '../../components/DashboardLayout'
import FundWallet from '../../components/WalletComponent/FundWallet'
import RequestPayout from '../../components/WalletComponent/RequestPayout'

export default function Index() {

    const [tab, setTab] = React.useState("")

    return (
        <DashboardLayout menu={true}>
            <div className=' w-full rounded-[10px] bg-white ' > 
                <div className=' w-full lg:border-b flex justify-between items-center border-[#D9D9D9] pb-[15px] lg:py-[17px] lg:px-[46px] ' > 
                        <p className=' font-bold text-lg' >Wallet</p> 
                </div> 
                <div className=' sm:loginShadow md:loginShadow  rounded  w-full flex flex-col py-[45px] lg:px-0 px-6 lg:pb-[55px] pb-[45px] lg:py-[55px] items-center ' >
                    <p className=' font-medium text-lg flex items-center ' >Wallet Balance: <span className=' text-[30px] ml-3 font-bold ' >0</span></p>
                    <div className=' w-full lg:w-auto flex items-center mt-5 ' >
                        <button onClick={()=> setTab("fund")} className={tab === "fund" ? ' bg-[#E35C1B] text-white rounded-[5px] mr-3 h-[40px] lg:h-[45px] w-full lg:w-[150px] font-semibold text-sm ' : ' border-[#D9D9D9] border rounded-[5px] mr-3 h-[40px] lg:h-[45px] w-full lg:w-[150px] font-semibold text-sm '} > Fund Wallet </button>
                        <button onClick={()=> setTab("payout")} className={tab === "payout" ? ' bg-[#E35C1B] text-white border rounded-[5px] mr-3 h-[40px] lg:h-[45px] w-full lg:w-[150px] font-semibold text-sm ' : ' border-[#D9D9D9] border rounded-[5px] mr-3  h-[40px] lg:h-[45px]  w-full lg:w-[150px] font-semibold text-sm '} > Request Payout </button>
                    </div>
                </div>
            </div>
            <div className=' w-full mt-6 ' >
                {tab === "fund" && ( 
                    <FundWallet />
                )}
                {tab === "payout" && ( 
                    <RequestPayout />
                )}
            </div>
        </DashboardLayout>
    )
} 