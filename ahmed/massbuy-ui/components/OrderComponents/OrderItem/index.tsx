import { Image } from '@chakra-ui/react'
import React from 'react'

type props = {
    detail: Function
}

export default function OrderItem({detail}: props) {
    return (
        <div className=' w-full py-[24px] lg:px-[44px] ' >
            <div className=' w-full border border-[#D9D9D9] rounded-[5px] mb-[22px] py-[3px] lg:py-[15px] px-4 lg:px-[25px] flex lg:flex-row flex-col lg:items-center ' >
                <div className=' flex items-center ' >
                    <button className=' w-[12px] ' >
                        <Image src="/images/icon/left.svg" alt='left' />
                    </button>
                    <div className=' w-full justify-center lg:w-[130px] flex items-center mx-4 p-2 ' > 
                        <Image src="/images/items/Top1.png" alt='Top1' />
                    </div>
                    <button className=' w-[12px] ' >
                        <Image src="/images/icon/right.svg" alt='right' />
                    </button>
                </div>
                <div className=' lg:ml-6 lg:p-0 p-4 ' >
                    <p className=' font-semibold lg:text-lg ' >Christmas Package</p>
                    <p className=' font-normal mt-1 ' >MA1209098233</p>
                    <p className=' mt-1 text-[#E35C1B] lg:text-lg font-semibold ' >8,333.33 <span className=' text-black text-base font-normal ml-2 ' >Monthly </span></p>
                    <button className=' mt-2 w-full lg:w-[120px] rounded-[5px] h-[35px] text-sm font-medium text-white bg-[#E35C1B]  ' >Pay Now</button>
                    <p onClick={()=> detail(true)} className=' font-normal mt-3 text-center lg:text-left lg:mt-1 cursor-pointer text-[#0088FE] underline ' >See Details</p>
                </div>
            </div>
            <div className=' w-full border border-[#D9D9D9] rounded-[5px] mb-[22px] py-[3px] lg:py-[15px] px-4 lg:px-[25px] flex lg:flex-row flex-col lg:items-center ' >
                <div className=' flex items-center ' >
                    <button className=' w-[12px] ' >
                        <Image src="/images/icon/left.svg" alt='left' />
                    </button>
                    <div className=' w-full justify-center lg:w-[130px] flex items-center mx-4 p-2 ' > 
                        <Image src="/images/items/Top1.png" alt='Top1' />
                    </div>
                    <button className=' w-[12px] ' >
                        <Image src="/images/icon/right.svg" alt='right' />
                    </button>
                </div>
                <div className=' lg:ml-6 lg:p-0 p-4 ' >
                    <p className=' font-semibold lg:text-lg ' >Christmas Package</p>
                    <p className=' font-normal mt-1 ' >MA1209098233</p>
                    <p className=' mt-1 text-[#E35C1B] lg:text-lg font-semibold ' >8,333.33 <span className=' text-black text-base font-normal ml-2 ' >Monthly </span></p>
                    <button className=' mt-2 w-full lg:w-[120px] rounded-[5px] h-[35px] text-sm font-medium text-white bg-[#E35C1B]  ' >Pay Now</button>
                    <p onClick={()=> detail(true)} className=' font-normal mt-3 text-center lg:text-left lg:mt-1 cursor-pointer text-[#0088FE] underline ' >See Details</p>
                </div>
            </div>
            {/* <div className=' w-full border border-[#D9D9D9] rounded-[5px] mb-[22px] py-[15px] px-[25px] flex items-center ' >
                <div className=' flex items-center ' >
                    <button className=' w-[12px] ' >
                        <Image src="/images/icon/left.svg" alt='left' />
                    </button>
                    <div className=' w-[130px] flex items-center mx-4 p-2 ' > 
                        <Image src="/images/items/Top1.png" alt='Top1' />
                    </div>
                    <button className=' w-[12px] ' >
                        <Image src="/images/icon/right.svg" alt='right' />
                    </button>
                </div>
                <div className=' ml-6' >
                    <p className=' font-semibold text-lg ' >Christmas Package</p>
                    <p className=' font-normal mt-1 ' >MA1209098233</p>
                    <p className=' mt-1 text-[#E35C1B] text-lg font-semibold ' >8,333.33 <span className=' text-black text-base font-normal ml-2 ' >Monthly </span></p>
                    <button className=' mt-2 w-[120px] rounded-[5px] h-[35px] text-sm font-medium text-white bg-[#E35C1B]  ' >Pay Now</button>
                    <p onClick={()=> detail(true)} className=' font-normal mt-1 cursor-pointer text-[#0088FE] underline ' >See Details</p>
                </div>
            </div> */}
        </div>
    )
} 