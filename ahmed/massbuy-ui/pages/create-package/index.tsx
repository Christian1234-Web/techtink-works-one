import React from 'react'
import MenuLayout from '../../components/MenuLayout'
import { Image, Input, Select } from '@chakra-ui/react'

export default function Create() {

    const [tab, setTab] = React.useState(false)

    return (
        <MenuLayout menu={false} category={true} >
            <div className=' w-full bg-white lg:bg-[#F5F5F5] lg:pl-[32px] lg:pr-[32px] pl-4 pr-4 ' > 
                <div className={!tab ? ' w-full  text-black flex items-center justify-between pt-3 lg:pt-6 lg:pb-4  ': ' w-full  text-black hidden lg:flex items-center justify-between pt-3 lg:pt-6 lg:pb-4  '} >
                    <p className=' font-semibold lg:text-base text-sm text-[#979494] ' >Create Package</p> 
                    <button onClick={()=> setTab(true)} className=' font-medium lg:hidden text-white h-[30px] text-xs px-4 bg-[#E35C1B] rounded ' >View 5 items</button>
                </div>
                <div className=' w-full flex pb-8 ' >
                    <div className={!tab ? ' w-full bg-white py-6 lg:py-[44px] lg:px-[63px] ':' w-full lg:flex flex-col hidden bg-white py-6 lg:py-[44px] lg:px-[63px] '} >
                        <div className=' w-full lg:w-[80%] ' >
                            <Input placeholder='Search....' border="1px solid #D9D9D9" height="40px" />
                        </div>
                        <div className=' lg:pt-[40px] w-full ' >
                            <div className=' flex items-center py-2 justify-between w-full ' >
                                <div className=' flex items-center ' >
                                    <div className=' border border-[#EEEDED] lg:h-[60px] lg:w-[60px] flex justify-center items-center ' > 
                                        <Image src='/images/items/g1.png' alt="gone" width="45px" className=' object-contain ' />
                                    </div>
                                        <p className=' ml-4 lg:text-base text-sm font-normal text-black ' >1 liter of groundnut oil</p>
                                </div>
                                <button className=' font-medium lg:flex hidden text-white h-[30px] items-center px-4 bg-[#FE7062] rounded ' >Add</button>
                                <button className='flex lg:hidden w-[20px] mr-4 '>
                                    <Image src='/images/icon/add.svg' width="45px" alt="add" />
                                </button>
                            </div>
                            <div className=' flex items-center py-2 justify-between w-full ' >
                                <div className=' flex items-center ' >
                                    <div className=' border border-[#EEEDED] lg:h-[60px] lg:w-[60px] flex justify-center items-center ' > 
                                        <Image src='/images/items/g1.png' alt="gone" width="45px" className=' object-contain ' />
                                    </div>
                                        <p className=' ml-4 lg:text-base text-sm font-normal text-black ' >1 liter of groundnut oil</p>
                                </div>
                                <button className=' font-medium lg:flex hidden text-white h-[30px] items-center px-4 bg-[#FE7062] rounded ' >Add</button>
                                <button className='flex lg:hidden w-[20px] mr-4 '>
                                    <Image src='/images/icon/add.svg' width="45px" alt="add" />
                                </button>
                            </div>
                            <div className=' flex items-center py-2 justify-between w-full ' >
                                <div className=' flex items-center ' >
                                    <div className=' border border-[#EEEDED] lg:h-[60px] lg:w-[60px] flex justify-center items-center ' > 
                                        <Image src='/images/items/g1.png' alt="gone" width="45px" className=' object-contain ' />
                                    </div>
                                        <p className=' ml-4 lg:text-base text-sm font-normal text-black ' >1 liter of groundnut oil</p>
                                </div>
                                <button className=' font-medium lg:flex hidden text-white h-[30px] items-center px-4 bg-[#FE7062] rounded ' >Add</button>
                                <button className='flex lg:hidden w-[20px] mr-4 '>
                                    <Image src='/images/icon/add.svg' width="45px" alt="add" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={tab ? ' w-full lg:w-fit ':' w-full hidden lg:flex flex-col lg:w-fit '} >
                        <div className=' lg:w-[400px] w-full bg-white lg:ml-8 pb-12 ' >
                            <div className=' border-b border-[#D9D9D9] w-full lg:mt-0 mt-4 h-[43px] flex items-center lg:justify-center ' > 
                                <Image onClick={()=> setTab(false)} src='/images/icon/backarrow.svg' className=' cursor-pointer lg:hidden ' alt='Arrow' width="16px" />
                                <p className=' font-semibold lg:ml-0 ml-2 ' >My Package</p>  
                            </div>
                            <div className=' w-full flex lg:flex-row flex-col items-center lg:px-6 lg:mb-4 py-4 ' >
                                <div className=' w-full lg:w-[60%] ' >
                                    <p className=' font-semibold text-sm mb-2 ' >Package Name <span className=' font-normal ' >(Optional)</span></p>
                                    <Input height="40px" border="1px solid #D9D9D9" backgroundColor="#fff" />
                                </div>
                                <div className=' w-full lg:w-[30%] lg:mt-0 mt-3 lg:ml-3 font-medium ' >
                                    <p className=' font-semibold text-sm mb-2 ' >Duration</p>
                                    <Select placeholder='Select Duration' fontSize="sm"  height="40px" border="1px solid #D9D9D9" backgroundColor="#fff" />
                                </div>
                            </div> 
                            <div className=' flex items-center py-4 border lg:border-t-0 lg:border-r-0 lg:border-l-0 lg:border-b px-4 lg:px-6 justify-between border-[#D9D9D9] ' >
                                <div className=' w-full flex items-center  ' > 
                                    <Image src='/images/items/g1.png' alt="gone"  className=' w-[70px] lg:w-[50px] object-contain ' />
                                    <div className=' ml-3 ' >
                                        <p className=' text-[13px] font-medium ' >1 liter of groundnut oil</p>
                                        <p className=' text-[13px] font-bold ' >2,000</p>
                                        <button className=' font-medium lg:hidden flex items-center bg-[#D2301C33] h-[30px] text-xs mt-4 px-4 text-[#D2301C] rounded ' > 
                                            <Image src='/images/icon/trash.svg' alt="gone" className=' w-[12px] mr-2  object-contain ' />
                                            Remove
                                        </button>
                                    </div>
                                </div>
                                <div className=' h-full lg:hidden flex flex-col items-center ' >
                                    <button className=" w-[25px] h-[25px] rounded-full text-white bg-[#E35C1B] flex justify-center items-center text-2xl " >
                                        <p className='mb-[1px] ' >+</p>
                                    </button>
                                    <p className=' text-[15px] font-medium my-2 ' >1</p>
                                    <button className=" w-[25px] h-[25px] rounded-full text-white bg-[#979494] flex justify-center items-center text-2xl " >
                                        <p className='mb-[1px] ' >-</p>
                                    </button>
                                </div>
                                <button className=' font-medium lg:flex hidden items-center text-white h-[30px] text-sm px-4 bg-[#D2301C] rounded ' >Remove</button>
                            </div> 
                            <div className=' flex items-center py-4 border lg:border-t-0 lg:border-r-0 lg:border-l-0 lg:border-b px-4 lg:px-6 justify-between border-[#D9D9D9] ' >
                                <div className=' w-full flex items-center  ' > 
                                    <Image src='/images/items/g1.png' alt="gone"  className=' w-[70px] lg:w-[50px] object-contain ' />
                                    <div className=' ml-3 ' >
                                        <p className=' text-[13px] font-medium ' >1 liter of groundnut oil</p>
                                        <p className=' text-[13px] font-bold ' >2,000</p>
                                        <button className=' font-medium lg:hidden flex items-center bg-[#D2301C33] h-[30px] text-xs mt-4 px-4 text-[#D2301C] rounded ' > 
                                            <Image src='/images/icon/trash.svg' alt="gone" className=' w-[12px] mr-2  object-contain ' />
                                            Remove
                                        </button>
                                    </div>
                                </div>
                                <div className=' h-full lg:hidden flex flex-col items-center ' >
                                    <button className=" w-[25px] h-[25px] rounded-full text-white bg-[#E35C1B] flex justify-center items-center text-2xl " >
                                        <p className='mb-[1px] ' >+</p>
                                    </button>
                                    <p className=' text-[15px] font-medium my-2 ' >1</p>
                                    <button className=" w-[25px] h-[25px] rounded-full text-white bg-[#979494] flex justify-center items-center text-2xl " >
                                        <p className='mb-[1px] ' >-</p>
                                    </button>
                                </div>
                                <button className=' font-medium lg:flex hidden items-center text-white h-[30px] text-sm px-4 bg-[#D2301C] rounded ' >Remove</button>
                            </div> 
                            <div className=' flex items-center py-4 border lg:border-t-0 lg:border-r-0 lg:border-l-0 lg:border-b px-4 lg:px-6 justify-between border-[#D9D9D9] ' >
                                <div className=' w-full flex items-center  ' > 
                                    <Image src='/images/items/g1.png' alt="gone"  className=' w-[70px] lg:w-[50px] object-contain ' />
                                    <div className=' ml-3 ' >
                                        <p className=' text-[13px] font-medium ' >1 liter of groundnut oil</p>
                                        <p className=' text-[13px] font-bold ' >2,000</p>
                                        <button className=' font-medium lg:hidden flex items-center bg-[#D2301C33] h-[30px] text-xs mt-4 px-4 text-[#D2301C] rounded ' > 
                                            <Image src='/images/icon/trash.svg' alt="gone" className=' w-[12px] mr-2  object-contain ' />
                                            Remove
                                        </button>
                                    </div>
                                </div>
                                <div className=' h-full lg:hidden flex flex-col items-center ' >
                                    <button className=" w-[25px] h-[25px] rounded-full text-white bg-[#E35C1B] flex justify-center items-center text-2xl " >
                                        <p className='mb-[1px] ' >+</p>
                                    </button>
                                    <p className=' text-[15px] font-medium my-2 ' >1</p>
                                    <button className=" w-[25px] h-[25px] rounded-full text-white bg-[#979494] flex justify-center items-center text-2xl " >
                                        <p className='mb-[1px] ' >-</p>
                                    </button>
                                </div>
                                <button className=' font-medium lg:flex hidden items-center text-white h-[30px] text-sm px-4 bg-[#D2301C] rounded ' >Remove</button>
                            </div> 
                            <div className=' flex  py-4  border-b lg:px-6 justify-between border-[#D9D9D9] ' >
                                <p className=' font-normal text-[13px] ' >Items <span className=' ml-2 font-bold ' >5</span></p>
                                <div className='  ' >
                                    <p className=' font-normal text-[13px] ' >Amount <span className=' ml-2 font-bold text-[#E35C1B] ' >300,000</span></p>
                                    <p className=' font-normal text-[13px] mt-4 ' >Daily <span className=' ml-2 font-bold text-[#E35C1B] ' >27.38</span></p>
                                </div>
                            </div>
                            <div className=' w-full flex justify-center pt-8 ' > 
                                <button className=' font-medium text-white h-[40px] text-sm w-[150px] bg-[#E35C1B] rounded ' >Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MenuLayout>
    )
} 