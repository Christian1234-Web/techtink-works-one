import React from 'react'
import MenuLayout from '../../components/MenuLayout'
import { Input } from '@chakra-ui/react'

export default function Index() {
    return (
        <MenuLayout menu={false} category={true} >
            <div className=' w-full bg-[#F5F5F5] flex justify-center py-8 ' >  
                <div className=' w-[900px] flex flex-col items-center py-12 bg-white  ' >
                    <p className=' font-semibold text-center text-lg ' >Pay for Christmas Package</p>
                    <div className=' w-[380px] ' >
                        <div className=' w-full flex justify-between items-center py-3 ' >
                            <p className='  font-semibold ' >Hello John</p>
                            <p className='  font-normal text-[#069046] ' >Pay <span className=' font-semibold  ' >₦8,333.33</span></p>
                        </div>
                        <div className=' bg-[#06904633] p-[18px] text-[15px] font-semibold w-full rounded-[5px] ' >
                            <div className=' flex items-center ' >
                                <p className=' text-[#6C6C6C]  w-32 ' >Bank:</p>
                                <p>Zenith Bank</p>
                            </div>
                            <div className=' flex items-center py-2 ' >
                                <p className=' text-[#6C6C6C]  w-32 ' >Acct Number:</p>
                                <p>2034095253</p>
                            </div>
                            <div className=' flex items-center ' >
                                <p className=' text-[#6C6C6C]  w-32 ' >Name:</p>
                                <p>Massbuy Ltd</p>
                            </div>
                            <p className=' mt-4 font-normal text-[14px] ' >Make payment to Massbuy Ltd and upload the proof of payment here</p>
                        </div>
                        <div className=' mt-3 w-full p-[18px] border border-[#D9D9D9] rounded-[5px] ' >
                            <p className=' font-normal  mb-2 ' >Custom Pay</p>
                            <Input placeholder='Enter Amount' height="40px" border="1px solid #D9D9D9" fontSize="sm" />
                            <p className=' mt-[1px] font-normal text-[13px] text-[#D3321C]  ' >Use custom if you want to pay above <span className=' text-black ' >₦8,333.33</span> </p>
                        </div>
                        <p className=' font-normal mt-[18px] mb-2 ' >Upload Proof of payment</p>
                        <Input type="file" height="40px" paddingTop="5.5px" border="1px solid #D9D9D9" fontSize="sm" />
                    
                        <button className=' mt-8 rounded-md w-full text-[15px] bg-[#069046] h-[40px] font-semibold text-white ' >Submit</button> 
                    </div>
                </div>
            </div>
        </MenuLayout>
    )
} 