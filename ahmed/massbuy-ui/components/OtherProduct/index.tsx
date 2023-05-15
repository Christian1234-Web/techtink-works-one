import { Image } from '@chakra-ui/react'
import Router from 'next/router'
import React from 'react'

export default function OtherProduct() {
    return (
        <div className=' w-full p-[17px] pb-[20px] bg-white ' >
            <div className=' pb-3 mb-3 border-b border-[#D9D9D9] ' >
                <p className=' font-bold text-xl ' >Other Products</p>
            </div>
            <div style={{boxShadow: "0px 0px 5px 0px #00000040"}} className=' w-full pt-7 rounded-[5px] mt-6 flex flex-col items-center px-4 pb-3 ' >
                <div className=' flex w-full justify-center ' >
                    <Image alt="OtherImages" src='/images/items/o1.png' className=' lg:w-[65%]  object-contain ' />
                    <div className=' w-fit ml-4 mt-2 ' >
                        <p className=' font-medium ' >Fridge</p>
                        <p className=' font-bold text-lg' >₦2,000</p>
                        <p className=' font-bold text-lg text-[#E35C1B] flex items-center  ' >₦5.5 <span className=' text-black text-base ml-1 font-normal ' >daily</span></p>
                    </div>
                </div>
                <button className=' mt-6 rounded-md w-auto px-8 text-sm bg-[#E35C1B] h-[35px] lg:h-[40px] font-semibold text-white ' >Add To Cart</button>
            </div>
            <div style={{boxShadow: "0px 0px 5px 0px #00000040"}} className=' w-full pt-7 mt-6 rounded-[5px] flex flex-col items-center px-4 pb-3 ' >
                <div className=' flex w-full justify-center ' >
                    <Image alt="OtherImages" src='/images/items/Top4.png' width="65%" className=' object-contain ' />
                    <div className=' w-fit ml-4 mt-2 ' >
                        <p className=' font-medium ' >Fridge</p>
                        <p className=' font-bold text-lg' >₦2,000</p>
                        <p className=' font-bold text-lg text-[#E35C1B] flex items-center  ' >₦5.5 <span className=' text-black text-base ml-1 font-normal ' >daily</span></p>
                    </div>
                </div>
                <button className=' mt-6 rounded-md w-auto px-8 text-sm bg-[#E35C1B] h-[35px] lg:h-[40px] font-semibold text-white ' >Add To Cart</button>
            </div>

            <div className=' pb-3 mb-3 border-b mt-10 border-[#D9D9D9] ' >
                <p className=' font-bold text-xl ' >Packages</p>
            </div>
            <div className=' w-full lg:px-6 py-4 ' > 
                <div style={{boxShadow: "0px 0px 2px 0px #00000040"}} className=' w-full rounded-[5px] ' >
                    <div className=' border-b border-[#D9D9D9] w-full h-[43px] flex justify-between items-center px-5 ' >
                        <p className=' font-semibold ' >Food Stuff</p> 
                        <p className=' font-bold text-lg text-[#E35C1B] ' >5.5<span className=' ml-2 font-normal text-base text-black ' >daily</span> </p>
                    </div>
                    <div className='px-6 py-2 ' >
                        <div className=' w-full flex py-4 ' > 
                            <Image src="/images/items/g1.png" boxSize="49px" alt="g1" /> 
                            <div className=' ml-6 ' >
                                <p className=' font-normal text-sm ' >Groundnut oil</p>
                                <p className=' font-bold ' >2,000</p>
                            </div>
                        </div>
                        <div className=' w-full flex py-4 ' > 
                            <Image src="/images/items/g2.png" boxSize="49px" alt="g1" /> 
                            <div className=' ml-6 ' >
                                <p className=' font-normal text-sm ' >Tin Tomatoes</p>
                                <p className=' font-bold ' >2,000</p>
                            </div>
                        </div>
                        <div className=' w-full flex py-4 ' > 
                            <Image src="/images/items/g3.png" boxSize="49px" alt="g1" /> 
                            <div className=' ml-6 ' >
                                <p className=' font-normal text-sm ' >Maggi</p>
                                <p className=' font-bold ' >2,000</p>
                            </div>
                        </div>
                        <div className=' w-full flex py-4 ' > 
                            <Image src="/images/items/g4.png" boxSize="49px" alt="g1" /> 
                            <div className=' ml-6 ' >
                                <p className=' font-normal text-sm ' >Peak Milk</p>
                                <p className=' font-bold ' >2,000</p>
                            </div>
                        </div>
                    </div>
                    <div className=' w-full px-6 py-5 ' > 
                        <button onClick={()=> Router.push("/product-detail")} className={' w-full text-[#D2301C] border-[#D2301C] border font-semibold text-sm h-[45px] rounded-[5px] '} >View Package</button>
                    </div>
                </div> 
            </div>
        </div>
    )
} 