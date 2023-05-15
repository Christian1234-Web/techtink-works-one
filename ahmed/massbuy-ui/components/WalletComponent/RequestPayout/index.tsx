import { Input, Select } from '@chakra-ui/react'
import React from 'react'

export default function RequestPayout() {
    return (
        <div className=' pt-[20px] pb-[40px] w-full flex flex-col items-center bg-white rounded-[5px] ' >
            <div className=' w-full lg:w-[350px]  ' >  
                <p className=' font-bold text-xl ' >Request Payout</p>
                <div className=' mt-[30px]  w-full ' >
                    <p className=' mb-2 font-medium ' >Bank Name</p>
                    <Select placeholder='Select method' height="45px" fontSize="sm" border="1px solid #D9D9D9" >
                        <option>UBA</option>
                        <option>Access Bank</option>
                    </Select>
                </div>
                <div className=' w-full mt-4' >
                    <p className=' mb-2 font-medium ' >Account Number</p>
                    <Input placeholder='0' height="45px" fontSize="sm" border="1px solid #D9D9D9" />
                </div>
                <div className=' w-full mt-4' >
                    <p className=' mb-2 font-medium ' >Amount</p>
                    <Input placeholder='0' height="45px" fontSize="sm" border="1px solid #D9D9D9" />
                </div>
                <button className=' mt-6 rounded-md w-full text-[15px] bg-[#069046] h-[45px] font-bold text-white ' >Submit</button> 
                <p className=' text-xs lg:mt-0 mt-1 lg:text-sm font-normal ' >Payment is done every last Friday of the month</p>
            </div>
        </div>
    )
} 