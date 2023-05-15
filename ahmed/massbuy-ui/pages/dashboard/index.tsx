import React from 'react'
import MenuLayout from '../../components/MenuLayout'
import PageLabel from '../../components/DashboardLayout/components/PageLabel'
import DashboardLayout from '../../components/DashboardLayout'
import { Input } from '@chakra-ui/input'
import { MenuButton } from '@chakra-ui/react'

export default function Dashboard() {
    return (
        <DashboardLayout menu={true}>
            <div className=' w-full rounded-[10px] bg-white ' >
                <div className=' w-full border-b  border-[#D9D9D9] pb-[17px] lg:py-[17px] lg:px-[46px] ' >
                    <p className=' font-bold text-lg ' >Account Information</p>
                </div>
                <div className=' w-full lg:px-[46px] lg:py-[27px] lg:pb-[50px] ' >
                    <div className=' w-full mt-6 lg:mt-8 ' >
                        <p className=' text-sm font-medium mb-2 ' >First Name</p>
                        <Input height="45px" border="1px solid #595959E5" placeholder='Enter First Name' fontSize="sm" />
                    </div>
                    <div className=' w-full mt-4 ' >
                        <p className=' text-sm font-medium mb-2 ' >Last Name</p>
                        <Input height="45px" border="1px solid #595959E5" placeholder='Enter Last Name' fontSize="sm" />
                    </div>
                    <div className=' w-full mt-4 ' >
                        <p className=' text-sm font-medium mb-2 ' >Email Address</p>
                        <Input height="45px" border="1px solid #595959E5" placeholder='Enter email address' fontSize="sm" />
                    </div>
                    <div className=' w-full mt-4 ' >
                        <p className=' text-sm mb-2 ' >Current Password</p>
                        <Input height="45px" border="1px solid #595959E5" placeholder='Enter password' fontSize="sm" />
                    </div> 
                    <div className=' w-full mt-4 ' >
                        <p className=' text-sm mb-2 ' >New Password</p>
                        <Input height="45px" border="1px solid #595959E5" placeholder='Enter password' fontSize="sm" />
                    </div> 
                    <div className=' w-full mt-4 ' >
                        <p className=' text-sm mb-2 ' >Confirm Password</p>
                        <Input height="45px" border="1px solid #595959E5" placeholder='Enter password' fontSize="sm" />
                    </div> 
                    <button  className=' w-full h-[45px] rounded-[2px] text-white bg-[#069046] font-Inter-ExtraBold text-sm mt-6 '>Save Changes</button>
                </div> 
            </div>
        </DashboardLayout>
    )
} 