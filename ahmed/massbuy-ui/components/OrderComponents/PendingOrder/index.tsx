import React from 'react' 
import { Image } from '@chakra-ui/react'

type props = {
    detail: Function
}

export default function Index({detail}: props) {

    const [itemNumber, setItemNumber] = React.useState(1)

    return (
        <div className=' w-full flex flex-col rounded-[10px] pb-9 bg-white ' >
            <div className=' w-full border-b flex justify-between items-center border-[#D9D9D9] pb-[15px] lg:py-[15px] lg:px-[46px] ' >
                <div className=' flex items-center ' >
                    <Image onClick={()=> detail(false)} src='/images/icon/backarrow.svg' className=' cursor-pointer ' alt='Arrow' width="16px" />
                    <p className=' font-bold text-sm lg:text-lg ml-2 lg:ml-6 ' >Pending</p>
                    <p className='  text-sm font-normal lg:text-lg ml-6 ' >Christmas Package</p>
                </div> 
            </div> 
            <div className=' lg:mx-8 flex mt-9 rounded-[5px] lg:text-base text-sm font-medium bg-[#06904633] flex-1 p-[13px] ' >
                You have a pending order, start payment and get your items delivered at the end of the duration.
            </div>
            <div className=' lg:mx-8 flex mt-4 lg:mb-0 mb-2 lg:mt-9 rounded-[5px] pb-[15px] text-sm font-medium border border-[#D0D0D0] flex-col flex-1 px-[35px] ' >
                <div className=' flex flex-1 mt-[15px] justify-between items-center ' >
                    <p className=' font-semibold  ' >Duration </p>
                    <p className=' font-normal  ' >12 months </p>
                </div>
                <div className=' flex flex-1 mt-[15px] justify-between items-center ' >
                    <p className=' font-semibold  ' >Category </p>
                    <p className=' font-normal  ' >Groceries </p>
                </div>
                <div className=' flex flex-1 mt-[15px] justify-between items-center ' >
                    <p className=' font-semibold  ' >Package </p>
                    <p className=' font-normal  ' >Christmas</p>
                </div>
                <div className=' flex flex-1 mt-[15px] justify-between items-center ' >
                    <p className=' font-semibold  ' >Payment frequency </p>
                    <p className=' font-normal  ' >Monthly</p>
                </div>
            </div>  
            <div className=' w-full flex items-center my-2 justify-center border lg:border-b lg:border-r-0 lg:border-t-0 lg:border-l-0 py-3 lg:px-4 border-[#D9D9D9] ' > 
                <Image src='/images/items/Top1.png' className=' mr-6 w-[85px] lg:w-[207px] ' alt="TopOne"  />
                <div className=' ml-2  ' >
                    <p className=' lg:text-base text-sm font-medium ' >HP Laptop</p>
                    <p className='text-sm lg:text-lg font-bold ' >100,000</p>
                    <button className=' font-medium lg:hidden flex items-center bg-[#D2301C33] h-[30px] text-xs mt-4 px-4 text-[#D2301C] rounded ' > 
                        <Image src='/images/icon/trash.svg' alt="gone" className=' w-[12px] mr-2  object-contain ' />
                        Remove
                    </button>
                    <div className=' my-3 hidden lg:flex items-center ' >
                        <button className=' w-[20px] h-[20px] bg-[#979494] text-[20px] text-white flex justify-center items-center pb-[2px] font-normal rounded-full ' >-</button>
                        <p className=' mx-5 font-normal text-[13px] ' >{itemNumber}</p>
                        <button className=' w-[20px] h-[20px] bg-[#D3321C] text-[20px] text-white flex justify-center items-center font-normal rounded-full ' >+</button> 
                        <button className=' font-medium text-white h-[29px] text-sm ml-14 px-4 bg-[#D2301C] rounded ' >Remove</button>
                    </div>
                </div> 
                <div className=' ml-8 h-full lg:hidden flex flex-col items-center ' >
                    <button className=" w-[25px] h-[25px] rounded-full text-white bg-[#E35C1B] flex justify-center items-center text-2xl " >
                        <p className='mb-[1px] ' >+</p>
                    </button>
                    <p className=' text-[15px] font-medium my-2 ' >1</p>
                    <button className=" w-[25px] h-[25px] rounded-full text-white bg-[#979494] flex justify-center items-center text-2xl " >
                        <p className='mb-[1px] ' >-</p>
                    </button>
                </div>
            </div> 
            <div className=' w-full flex items-center my-2 justify-center border lg:border-b lg:border-r-0 lg:border-t-0 lg:border-l-0 py-3 lg:px-4 border-[#D9D9D9] ' > 
                <Image src='/images/items/Top1.png' className=' mr-6 w-[85px] lg:w-[207px] ' alt="TopOne"  />
                <div className=' ml-2  ' >
                    <p className=' lg:text-base text-sm font-medium ' >HP Laptop</p>
                    <p className='text-sm lg:text-lg font-bold ' >100,000</p>
                    <button className=' font-medium lg:hidden flex items-center bg-[#D2301C33] h-[30px] text-xs mt-4 px-4 text-[#D2301C] rounded ' > 
                        <Image src='/images/icon/trash.svg' alt="gone" className=' w-[12px] mr-2  object-contain ' />
                        Remove
                    </button>
                    <div className=' my-3 hidden lg:flex items-center ' >
                        <button className=' w-[20px] h-[20px] bg-[#979494] text-[20px] text-white flex justify-center items-center pb-[2px] font-normal rounded-full ' >-</button>
                        <p className=' mx-5 font-normal text-[13px] ' >{itemNumber}</p>
                        <button className=' w-[20px] h-[20px] bg-[#D3321C] text-[20px] text-white flex justify-center items-center font-normal rounded-full ' >+</button> 
                        <button className=' font-medium text-white h-[29px] text-sm ml-14 px-4 bg-[#D2301C] rounded ' >Remove</button>
                    </div>
                </div> 
                <div className=' ml-8 h-full lg:hidden flex flex-col items-center ' >
                    <button className=" w-[25px] h-[25px] rounded-full text-white bg-[#E35C1B] flex justify-center items-center text-2xl " >
                        <p className='mb-[1px] ' >+</p>
                    </button>
                    <p className=' text-[15px] font-medium my-2 ' >1</p>
                    <button className=" w-[25px] h-[25px] rounded-full text-white bg-[#979494] flex justify-center items-center text-2xl " >
                        <p className='mb-[1px] ' >-</p>
                    </button>
                </div>
            </div>  
            <div className=' w-full flex lg:flex-row flex-col lg:items-center justify-center border-b py-3 px-4 border-[#D9D9D9] ' >
                <p className=' font-normal text-lg lg:mr-14' >Items <span className=' font-bold ' >5</span></p>
                <p className=' font-normal text-lg lg:ml-14  ' >Amount <span className=' font-bold text-[#E35C1B] ' >300,000</span></p>
            </div>
            <div className=' w-[300px] mx-auto  ' > 
                <p className=' font-bold mt-4 ' >Payment Frequency</p>
                <div className=' flex justify-between my-2 items-center ' >
                    <p className=' font-normal text-[15px] ' >Daily</p>
                    <p className=' font-normal text-[15px] ' >₦273.9</p> 
                    <button className=' w-[12px] h-[12px] rounded-full border-[1.5px] border-black ' >

                    </button>
                </div>
                <div className=' flex justify-between my-2 items-center ' >
                    <p className=' font-normal text-[15px] ' >Weekly</p>
                    <p className=' font-normal text-[15px] ' >₦1,923</p> 
                    <button className=' w-[12px] h-[12px] rounded-full bg-[#E35C1B] border-[1.5px] border-[#E35C1B] ' >

                    </button>
                </div>
                <div className=' flex justify-between my-2 items-center ' >
                    <p className=' font-normal text-[15px] ' >Monthly</p>
                    <p className=' font-normal text-[15px] ' >₦8,333.33</p> 
                    <button className=' w-[12px] h-[12px] rounded-full border-[1.5px] border-black ' >

                    </button>
                </div>
                <div className=" mt-6 lg:flex-row flex-col flex items-center " >
                    <button className=' w-full lg:mr-2 text-sm rounded-[4px] text-white bg-[#E35C1B] h-[40px] ' >Pay N8,333.33</button>
                    <button className=' w-full lg:ml-2 text-sm lg:mt-0 mt-4 rounded-[4px] text-[#E35C1B] border border-[#E35C1B] font-semibold h-[40px] ' >Custome Pay</button>
                </div>
            </div>
        </div>
    )
} 