import { Image } from '@chakra-ui/react'
import React from 'react'

type props = {
    add: Function, 
}

export default function AllDeliveryAddress({add}: props) {
    return (
        <div className=' w-full rounded-[10px] pb-[57px] bg-white ' >
            <div className=' w-full border-b flex justify-between items-center border-[#D9D9D9] pb-[15px] lg:py-[15px] lg:px-[46px] ' >
                <p className=' lg:font-bold lg:text-lg text-sm ' >Delivery Address</p>
                <button onClick={()=> add(true)} className=' px-[14px] lg:h-[40px] h-[35px] rounded bg-[#E35C1B] text-white font-semibold text-sm ' >Add new address</button>
            </div> 
            <div className=' w-full px-0 lg:px-[46px] py-[27px] grid grid-cols-1 lg:grid-cols-2 gap-6 pb-[50px] ' >
                <div className=' border border-[#D9D9D9] rounded-[5px] w-full' >
                    <div className=' w-full p-[9px] border-b border-[#D9D9D9] justify-between flex items-center ' >
                        <p className=' text-[13px] text-[#767575] font-semibold ' >Default Delivery Address</p>
                        <div className=' flex items-center ' >
                            <button className=' flex text-xs font-normal ml-6 text-[#979494] ' >
                                <Image src="/images/icon/delete.svg" alt='delete' width="12px" />
                                <p className=' ml-2 ' >Delete</p>
                            </button> 
                            <button className=' flex text-xs font-normal ml-6 text-[#E35C1B] ' >
                                <Image src="/images/icon/edit.svg" alt='edit' width="12px" />
                                <p className=' ml-2 ' >Edit</p>
                            </button>
                        </div>
                    </div>
                    <div className=' w-full py-[19px] px-[17px] ' >
                        <div className=' flex items-center ' >
                            <div className=' w-14 ' >
                                <Image src='/images/icon/coloredperson.svg' alt="person" width="14px" />
                            </div>
                            <p className=' font-normal text-sm text-[#363535E5] ' >John Doe</p>
                        </div>
                        <div className=' flex items-center my-[14px] ' >
                            <div className=' w-14 ' >
                                <Image src='/images/icon/colorcall.svg' alt="call" width="14px" />
                            </div>
                            <p className=' font-normal text-sm text-[#363535E5] ' >East west road coast, Warimpa Abuja</p>
                        </div>
                        <div className=' flex items-center ' >
                            <div className=' w-14 ' >
                                <Image src='/images/icon/location.svg' alt="location" width="14px" />
                            </div>
                            <p className=' font-normal text-sm text-[#363535E5] ' >080674512345</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 