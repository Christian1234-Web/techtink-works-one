import { Image } from '@chakra-ui/react'
import React from 'react'

export default function Footer() {
    return (
        <div className=' w-full lg:flex flex-col hidden ' >
            <div className=' bg-[#363535E5] w-full h-[98px] text-[#D9D9D9] px-[61px] flex items-center ' >
                <div className=' flex items-center ' >
                    <div className=' bg-[#D9D9D9] w-[30px] rounded-full flex justify-center items-center h-[30px] ' >
                        <Image src='/images/socialmedia/mail.svg' alt='Mail' width="20px" />
                    </div>
                    <div className=' pl-6 ' >
                        <p className=' font-medium ' >EMAIL SUPPORT</p>
                        <p className=' font-normal text-[13px] ' >help@massbuy.com</p>
                    </div>
                </div>
                <div className=' flex items-center ml-20 ' >
                    <div className=' bg-[#D9D9D9] w-[30px] rounded-full flex justify-center items-center h-[30px] ' >
                        <Image src='/images/socialmedia/call.svg' alt='call' width="20px" />
                    </div>
                    <div className=' pl-6 ' >
                        <p className=' font-medium ' >PHONE SUPPORT</p>
                        <p className=' font-normal text-[13px] ' >+234 8076-239-09</p>
                    </div>
                </div>
                <div className=' flex items-center ml-20 ' >
                    <div className=' bg-[#D9D9D9] w-[30px] rounded-full flex justify-center items-center h-[30px] ' >
                        <Image src='/images/socialmedia/whatapp.svg' alt='Maiwhatappl' width="20px" />
                    </div>
                    <div className=' pl-6 ' >
                        <p className=' font-medium ' >WHATSAPP</p>
                        <p className=' font-normal text-[13px] ' >+234 8076-239-09</p>
                    </div>
                </div>
            </div>
            <div className=' bg-[#131313] text-[#D9D9D9] w-full grid grid-cols-4 gap-6 p-[50px]  ' >
                <div className=' w-full ' >
                    <p className=' font-semibold ' >ABOUT MASSBUY</p>
                    <p className=' font-normal text-[13px] mt-4 ' >About us</p>
                    <p className=' font-normal text-[13px] mt-4 ' >Contact us</p>
                    <p className=' font-normal text-[13px] mt-4 ' >Our blog</p>
                    <p className=' font-normal text-[13px] mt-4 ' >Terms & Conditions</p>
                </div>
                <div className=' w-full ' >
                    <p className=' font-semibold ' >BUYING ON MASSBUY</p>
                    <p className=' font-normal text-[13px] mt-4 ' >Buyer Safety Centre</p>
                    <p className=' font-normal text-[13px] mt-4 ' >FAQs</p>
                    <p className=' font-normal text-[13px] mt-4 ' >Delivery</p>
                    <p className=' font-normal text-[13px] mt-4 ' >MassBuy Return/ cancellation Policy</p>
                </div>
                <div className=' w-full ' >
                    <p className=' font-semibold ' >MAKE MONEY ON MASSBUY</p>
                    <p className=' font-normal text-[13px] mt-4 ' >Become an agent</p> 
                </div>
                <div className=' w-full' >
                    <p className=' font-semibold text-center ' >DOWNLOAD AND CONNECT WITH US</p>
                    <div className=' mt-4 w-full flex flex-col items-center text-white ' >
                        <button className=' flex w-[200px] items-center justify-center rounded-[5px] bg-black px-2 py-3' >
                            <Image src='/images/socialmedia/apple.svg' alt='Maiwhatappl' width="20px" />
                            <div className=' ml-4 ' >
                                <p className=' font-normal text-center text-[12px] ' >Become an agent</p> 
                                <p className=' font-bold text-center text-[15px] ' >App store</p> 
                            </div>    
                        </button>
                        <button className=' flex w-[200px] mt-4 items-center justify-center rounded-[5px] bg-black px-2 py-3 ' >
                            <Image src='/images/socialmedia/apple.svg' alt='Maiwhatappl' width="20px" />
                            <div className=' ml-4 ' >
                                <p className=' font-normal text-center text-[12px] ' >Become an agent</p> 
                                <p className=' font-bold text-center text-[15px] ' >Google play</p> 
                            </div>    
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
} 