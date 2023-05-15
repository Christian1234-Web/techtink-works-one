import React from 'react'
import DashboardLayout from '../../components/DashboardLayout'

export default function Index() {

    const [tab, setTab] = React.useState("0")

    return (
        <DashboardLayout menu={true}>
            <div className=' w-full rounded-[10px] bg-white ' > 
                <div className=' w-full border-b flex justify-between items-center border-[#D9D9D9] pb-[15px] lg:py-[15px] lg:px-[46px] ' > 
                        <p className=' font-bold text-lg' >Transaction</p> 
                </div> 
                <div className=' w-full flex justify-between lg:justify-around py-[20px] px-4 lg:py-[36px] items-center ' >
                    <button onClick={()=> setTab("0")} className={tab === "0" ?' font-medium text-sm lg:text-lg text-[#E35C1B] ' : ' font-medium text-sm lg:text-lg ' } > All</button>
                    <button onClick={()=> setTab("1")} className={tab === "1" ?' font-medium text-sm lg:text-lg text-[#E35C1B] ' : ' font-medium text-sm lg:text-lg ' } > Sent</button>
                    <button onClick={()=> setTab("2")} className={tab === "2" ?' font-medium text-sm lg:text-lg text-[#E35C1B] ' : ' font-medium text-sm lg:text-lg ' } > Received</button>
                </div>
            </div>
            <div className=' mt-6 w-full bg-white rounded-[5px] lg:p-[26px] ' >
                <div className=' w-full bg-[#F5F5F5] rounded-[5px] flex justify-between p-[12px] ' >
                    <div className='  ' > 
                        <p className=' font-normal text-[#6C6C6C] text-sm ' >Referral commission </p>
                        <p className=' font-normal text-[#6C6C6C] mt-1 text-sm '>MB-27189-1659905498</p>
                        <p className=' font-medium lg:hidden text-[#6C6C6C] text-xs mt-1 lg:text-sm '>Aug 8 2022. 9AM</p>
                    </div> 
                    <div className=' flex mt-2  ' >
                        <p className=' font-medium lg:block hidden text-[#6C6C6C] text-sm '>Aug 8 2022. <br/>9AM</p>
                        <p className=' font-medium text-[#038566] ml-14 text-sm ' >N1000</p>
                    </div> 
                </div>
                <div className=' w-full  mt-4 flex justify-between p-[12px] ' >
                    <div className='  ' > 
                        <p className=' font-normal text-[#6C6C6C] text-sm ' >Referral commission </p>
                        <p className=' font-normal text-[#6C6C6C] mt-1 text-sm '>MB-27189-1659905498</p>
                        <p className=' font-medium lg:hidden text-[#6C6C6C] text-xs mt-1 lg:text-sm '>Aug 8 2022. 9AM</p>
                    </div> 
                    <div className=' flex mt-2  ' >
                        <p className=' font-medium lg:block hidden text-[#6C6C6C] text-sm '>Aug 8 2022. <br/>9AM</p>
                        <p className=' font-medium text-[#038566] ml-14 text-sm ' >N1000</p>
                    </div> 
                </div>
                <div className=' w-full bg-[#F5F5F5]  mt-4 rounded-[5px] flex justify-between p-[12px] ' >
                    <div className='  ' > 
                        <p className=' font-normal text-[#6C6C6C] text-sm ' >Referral commission </p>
                        <p className=' font-normal text-[#6C6C6C] mt-1 text-sm '>MB-27189-1659905498</p>
                        <p className=' font-medium lg:hidden text-[#6C6C6C] text-xs mt-1 lg:text-sm '>Aug 8 2022. 9AM</p>
                    </div> 
                    <div className=' flex mt-2  ' >
                        <p className=' font-medium lg:block hidden text-[#6C6C6C] text-sm '>Aug 8 2022. <br/>9AM</p>
                        <p className=' font-medium text-[#038566] ml-14 text-sm ' >N1000</p>
                    </div> 
                </div>
            </div>
        </DashboardLayout>
    )
} 