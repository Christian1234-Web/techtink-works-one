import React from 'react'
import DashboardLayout from '../../DashboardLayout'
import { Image, Input, Select } from '@chakra-ui/react'


type props = {
    add: Function, 
}

export default function AddDeliveryAddress({add}: props) {
    return ( 
        <div className=' w-full rounded-[10px] bg-white ' >
            <div className=' w-full border-b flex items-center border-[#D9D9D9] pb-[17px]  lg:py-[17px] lg:px-[46px] ' >
                <Image onClick={()=> add(false)} src='/images/icon/backarrow.svg' className=' cursor-pointer ' alt='Arrow' width="16px" />
                <p className=' font-bold text-lg ml-6 ' >Delivery Address</p>
            </div> 
            <div className=' w-full lg:px-[46px] lg:py-[27px] pb-[50px] ' >
                <div className=' w-full flex lg:flex-row flex-col mt-8' > 
                    <div className=' w-full lg:mr-2 ' >
                        <p className=' text-sm font-medium mb-2 ' >First Name</p>
                        <Input height="45px" border="1px solid #595959E5" placeholder='Enter First Name' fontSize="sm" />
                    </div>
                    <div className=' w-full mt-4 lg:mt-0 lg:ml-2 ' >
                        <p className=' text-sm font-medium mb-2 ' >Last Name</p>
                        <Input height="45px" border="1px solid #595959E5" placeholder='Enter Last Name' fontSize="sm" />
                    </div>
                </div>
                <div className=' w-full mt-4 ' >
                    <p className=' text-sm font-medium mb-2 ' >Phone Number</p>
                    <Input height="45px" border="1px solid #595959E5" placeholder='Enter Phone Number' fontSize="sm" />
                </div>
                <div className=' w-full mt-4 ' >
                    <p className=' text-sm mb-2 ' >Street Address</p>
                    <Input height="45px" border="1px solid #595959E5" placeholder='Enter Delivery Address' fontSize="sm" />
                </div> 
                <div className=' w-full mt-4 ' >
                    <p className=' text-sm mb-2 ' >Direction (Optional)</p>
                    <Input height="45px" border="1px solid #595959E5" placeholder='Directions' fontSize="sm" />
                </div> 
                <div className=' w-full mt-4 ' >
                    <p className=' text-sm mb-2 ' >City</p>
                    <Input height="45px" border="1px solid #595959E5" placeholder='Enter City' fontSize="sm" />
                </div> 
                <div className=' w-full mt-4 ' >
                    <p className=' text-sm mb-2 ' >State</p>
                    <Select height="45px" border="1px solid #595959E5" placeholder='Enter City' fontSize="sm" />
                </div> 
                <div className=' w-full mt-4 ' >
                    <p className=' text-sm mb-2 ' >LGA (Local Govt. Area)</p>
                    <Select height="45px" border="1px solid #595959E5" placeholder='Enter City' fontSize="sm" />
                </div> 
                <button  className=' w-full h-[45px] rounded-[2px] text-white bg-[#069046] font-Inter-ExtraBold text-sm mt-6 '>Continue</button>
            </div>
        </div> 
    )
} 