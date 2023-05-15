import React from 'react' 
import Router from 'next/router'
import { Image } from '@chakra-ui/react'

export default function Index() {
    return (
        <div className=' w-full h-screen bg-[#F5F5F5] flex flex-col items-center ' > 
            <div style={{boxShadow: "0px 0px 10px 0px #00000040"}} className=' bg-white w-full flex px-[35px] py-[22px] justify-center items-center ' >
                <button onClick={()=> Router.push("/")} className=' flex items-center ' >
                    <Image src="/images/logo.svg" alt='logo' className=' h-[15px] ' />
                    <Image src="/images/massbuy.svg" className=' ml-1 h-[18px] ' alt='logo' />
                </button>
            </div>
            <div className=' w-[600px] py-6 my-8 pb-12 px-8 bg-white ' >
                <p className=' font-semibold text-lg text-center mb-12 ' >Order Package Detail</p>
                <div className=' w-full flex mb-4 justify-between items-center ' >
                    <p className=' font-semibold text-[15px] ' >Order ID</p>
                    <p className=' font-normal text-[15px] ' >MA1209098233</p>
                </div>
                <div className=' w-full flex mb-4 justify-between items-center ' >
                    <p className=' font-semibold text-[15px] ' >Category</p>
                    <p className=' font-normal text-[15px] ' >Groceries</p>
                </div>
                <div className=' w-full flex mb-4 justify-between items-center ' >
                    <p className=' font-semibold text-[15px] ' >Package</p>
                    <p className=' font-normal text-[15px] ' >Christmas</p>
                </div>
                <div className=' w-full flex mb-4 justify-between items-center ' >
                    <p className=' font-semibold text-[15px] ' >Date Created</p>
                    <p className=' font-normal text-[15px] ' >17-Jan- 2022</p>
                </div>
                <div className=' w-full flex mb-4 justify-between items-center ' >
                    <p className=' font-semibold text-[15px] ' >Payment frequency</p>
                    <p className=' font-normal text-[15px] ' >Monthly</p>
                </div>
                <div className=' w-full flex mb-4 justify-between items-center ' >
                    <p className=' font-semibold text-[15px] ' >Amount</p>
                    <p className=' font-normal text-[15px] ' >₦300,000</p>
                </div>
                <div className=' w-full flex mb-4 justify-between items-center ' >
                    <p className=' font-semibold text-[15px] ' >Paid</p>
                    <p className=' font-normal text-[15px] ' >₦8,333.33</p>
                </div>
                <div className=' w-full flex mb-4 justify-between items-center ' >
                    <p className=' font-semibold text-[15px] ' >Next Payment</p>
                    <p className=' font-normal text-[15px] ' >17-Feb- 2022</p>
                </div> 
                <p className=' font-normal mt-12 text-[15px] ' >Package summary</p> 
                <div className='w-full py-2 ' >
                    <div className=' w-full flex justify-between  py-4 ' > 
                        <Image src="/images/items/g1.png" boxSize="49px" alt="g1" /> 
                        <div className=' ml-6 text-sm text-right ' >
                            <p className=' font-normal text-sm ' >1 carton of sugar</p>
                            <p className=' font-normal ' >2,000</p>
                        </div>
                    </div>
                    <div className=' w-full flex justify-between  py-4 ' > 
                        <Image src="/images/items/g2.png" boxSize="49px" alt="g1" /> 
                        <div className=' ml-6 text-sm text-right ' >
                            <p className=' font-normal text-sm ' >1 bag of rice</p>
                            <p className=' font-normal ' >2,000</p>
                        </div>
                    </div>
                    <div className=' w-full flex justify-between  py-4 ' > 
                        <Image src="/images/items/g3.png" boxSize="49px" alt="g1" /> 
                        <div className=' ml-6 text-sm text-right ' >
                            <p className=' font-normal text-sm ' >1 carton of sugar</p>
                            <p className=' font-normal ' >2,000</p>
                        </div>
                    </div>
                    <div className=' w-full flex justify-between  py-4 ' > 
                        <Image src="/images/items/g4.png" boxSize="49px" alt="g1" /> 
                        <div className=' ml-6 text-sm text-right ' >
                            <p className=' font-normal text-sm ' >1 carton of sugar</p>
                            <p className=' font-normal ' >2,000</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 