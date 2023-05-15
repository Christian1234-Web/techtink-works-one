import { Input, Select } from '@chakra-ui/react'
import React from 'react'

export default function FundWallet() {

    const [isShown, setIsShown] = React.useState("")

    return (
        <div className=' pt-[20px] pb-[40px] w-full flex flex-col items-center bg-white rounded-[5px] ' >
            <div className=' lg:w-[350px] w-full  ' >  
                <p className=' font-bold text-xl ' >Fund Wallet</p>
                <div className=' w-full mt-[30px] ' >
                    <p className=' mb-2 font-medium ' >Enter Amount</p>
                    <Input placeholder='0' height="45px" fontSize="sm" border="1px solid #D9D9D9" />
                </div>
                <div className=' mt-4 w-full ' >
                    <p className=' mb-2 font-medium ' >Funding method</p>
                    <Select onChange={(e)=> setIsShown(e.target.value)} placeholder='Select method' height="45px" fontSize="sm" border="1px solid #D9D9D9" >
                        <option>Online - Paystack</option>
                        <option>Bank Deposit, POS, Bank Transfer</option>
                    </Select>
                </div>
                {isShown === "Bank Deposit, POS, Bank Transfer" && (
                    <>
                    
                        <div className=' bg-[#06904633] p-[18px] mt-4 text-[15px] font-semibold w-full rounded-[5px] ' >
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
                        <p className=' font-normal mt-[18px] mb-2 ' >Upload Proof of payment</p>
                        <Input type="file" height="40px" paddingTop="5.5px" border="1px solid #D9D9D9" fontSize="sm" />
                    </>
                )}
                <button className=' mt-6 rounded-md w-full text-[15px] bg-[#069046] h-[45px] font-bold text-white ' >Submit</button> 
            </div>
        </div>
    )
} 