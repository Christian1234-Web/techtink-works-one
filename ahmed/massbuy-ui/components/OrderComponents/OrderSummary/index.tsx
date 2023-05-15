import React from 'react'
import { Image } from '@chakra-ui/react'
import ItemsComponent from './component/ItemsComponent'


type props = {
    detail: Function
}

export default function OrderSummary({detail}: props) {

    const [tab, setTab] = React.useState(false)

    return (
        <div className=' w-full rounded-[10px] bg-white ' >
            <div className=' w-full border-b flex justify-between items-center border-[#D9D9D9] py-[15px] lg:py-[15px] lg:px-[46px] ' >
                <div className=' flex items-center ' >
                    <Image onClick={()=> detail(false)} src='/images/icon/backarrow.svg' className=' cursor-pointer ' alt='Arrow' width="16px" />
                    <p className=' font-bold lg:text-lg ml-2 lg:ml-6 ' >Christmas Package</p>
                </div>
                <button className=' text-white text-sm h-[26px] w-[90px] rounded-[5px] bg-[#E35C1B]  ' >Pay Now</button>
            </div> 
            <div className=' mt-4 lg:hidden ' >
                <ItemsComponent />
            </div>
            <div className=' lg:hidden flex justify-between mt-4 items-center text-sm ' >
                <button onClick={()=> setTab(false)} className={!tab ? ' font-bold text-[#E35C1B] ': ' font-bold '} >Summary</button>
                <button onClick={()=> setTab(true)} className={tab ? ' font-bold text-[#E35C1B] ': ' font-bold '}>Payment</button>
            </div>
            <div className=' w-full flex lg:mt-0 mt-6 ' > 
                <div className=' lg:flex hidden ' >
                    <ItemsComponent />
                </div>
                {/* <div className=' lg:block hidden px-4 w-fit pb-4 ' >
                    <div className='border-[#D9D9D9] border-b flex justify-center py-2 ' >
                        <p className=' font-medium ' >Items</p>
                    </div> 
                    <div className=' w-full flex items-center py-4 ' > 
                        <Image src="/images/items/g1.png" boxSize="49px" alt="g1" /> 
                        <div className=' ml-4 ' >
                            <p className=' font-normal text-sm ' >Groundnut oil</p> 
                        </div>
                    </div>
                    <div className=' w-full flex items-center py-4 ' > 
                        <Image src="/images/items/g2.png" boxSize="49px" alt="g1" /> 
                        <div className=' ml-4 ' >
                            <p className=' font-normal text-sm ' >Tin Tomatoes</p> 
                        </div>
                    </div>
                    <div className=' w-full flex items-center py-4 ' > 
                        <Image src="/images/items/g3.png" boxSize="49px" alt="g1" /> 
                        <div className=' ml-4 ' >
                            <p className=' font-normal text-sm ' >Maggi</p> 
                        </div>
                    </div>
                </div> */}
                <div className={!tab ? ' flex flex-col flex-1 lg:px-4 lg:border-[#D9D9D9] lg:border-l lg:border-r ': ' hidden lg:flex flex-col flex-1 px-4 lg:border-[#D9D9D9] lg:border-l lg:border-r '} >
                    <div className='border-[#D9D9D9] lg:block hidden border-b py-2 ' >
                        <p className=' font-medium text-center ' >Summary</p>
                    </div> 
                    <div className=' text-sm my-2 flex items-center justify-between ' >
                        <p className='  font-semibold ' >Order ID:</p>
                        <p className=' font-normal ml-4 text-right ' >MA1209098233</p>
                    </div>
                    <div className=' text-sm my-2 flex items-center justify-between ' >
                        <p className='  font-semibold ' >Category:</p>
                        <p className=' font-normal ml-4 text-right ' >Groceries</p>
                    </div>
                    <div className=' text-sm my-2 flex items-center justify-between ' >
                        <p className='  font-semibold ' >Package:</p>
                        <p className=' font-normal ml-4 text-right ' >Christmas</p>
                    </div>
                    <div className=' text-sm my-2 flex items-center justify-between ' >
                        <p className='  font-semibold ' >Payment frequency:</p>
                        <p className=' font-normal ml-4 text-right ' >Christmas</p>
                    </div>
                    <div className=' text-sm my-2 flex items-center justify-between ' >
                        <p className='  font-semibold ' >Amount:</p>
                        <p className=' font-normal ml-4 text-right text-[#E35C1B] ' >300,000</p>
                    </div>
                    <div className=' text-sm my-2 flex items-center justify-between ' >
                        <p className='  font-semibold ' >Paid:</p>
                        <p className=' font-normal ml-4 text-right text-[#E35C1B] ' >16,333.33</p>
                    </div>
                    <div className=' text-sm my-2 flex items-center justify-between ' >
                        <p className='  font-semibold ' >Date Created:</p>
                        <p className=' font-normal ml-4 text-right ' >17-Jan- 2023</p>
                    </div>
                    <div className=' text-sm my-2 flex items-center justify-between ' >
                        <p className='  font-semibold ' >Due Date</p>
                        <p className=' font-normal ml-4 text-right ' >17-Dec- 2023</p>
                    </div>
                    <div className=' text-sm my-2 flex items-center justify-between ' >
                        <p className='  font-semibold ' >Delivery Date</p>
                        <p className=' font-normal ml-4 text-right ' >24-Dec 2023</p>
                    </div>
                    <div className=' mb-[17px] mt-4 text-sm font-normal p-[14px] rounded-[5px] bg-[#06904633] ' >
                        All payments has to be completed on 
                        or before the due date to get package 
                        delivery 
                    </div>
                </div>
                <div className={tab ?' lg:px-4 w-full lg:w-fit pb-[54px] ':' lg:px-4 w-fit lg:block hidden pb-[54px] '} >
                    <div className='border-[#D9D9D9] border-b flex justify-between lg:justify-center lg:px-2 py-2 ' >
                        <p className=' font-medium ' >Monthly Payment</p>
                        <p className=' font-semibold ml-12' >12 </p>
                    </div> 
                    <div className=' py-[8px] border-[#D9D9D9] border-b ' >
                        <p className=' font-normal text-sm ' >Jan 18th 2023</p>
                        <div className=' flex items-center text-sm text-[#979494] font-normal justify-between mt-1 ' >
                            <p>8,333.33</p> 
                            <p>Paid</p>
                        </div>
                    </div>
                    <div className=' py-[8px] border-[#D9D9D9] border-b ' >
                        <p className=' font-normal text-sm ' >Feb 18th 2023</p>
                        <div className=' flex items-center text-sm text-[#979494] font-normal justify-between mt-1 ' >
                            <p>8,333.33</p> 
                            <p>Paid</p>
                        </div>
                    </div>
                    <div className=' py-[8px] border-[#E35C1B] border-b ' >
                        <p className=' font-normal text-sm ' >Mar 18th 2023</p>
                        <div className=' flex items-center text-sm text-[#979494] font-normal justify-between mt-1 ' >
                            <p className=' text-[#E35C1B] ' >8,333.33</p> 
                            <button className=' text-[#069046] ' >Pay Now</button>
                        </div>
                    </div>
                    <div className=' py-[8px] border-[#E35C1B] border-b ' >
                        <p className=' font-normal text-sm ' >Apr 18th 2023</p>
                        <div className=' flex items-center text-sm text-[#979494] font-normal justify-between mt-1 ' >
                            <p className=' text-[#E35C1B] ' >8,333.33</p> 
                            <button className=' text-[#069046] ' >Pay Now</button>
                        </div>
                    </div>
                    <div className=' py-[8px] border-[#E35C1B] border-b ' >
                        <p className=' font-normal text-sm ' >May 18th 2023</p>
                        <div className=' flex items-center text-sm text-[#979494] font-normal justify-between mt-1 ' >
                            <p className=' text-[#E35C1B] ' >8,333.33</p> 
                            <button className=' text-[#069046] ' >Pay Now</button>
                        </div>
                    </div>
                    <div className=' py-[8px] border-[#E35C1B] border-b ' >
                        <p className=' font-normal text-sm ' >Jun 18th 2023</p>
                        <div className=' flex items-center text-sm text-[#979494] font-normal justify-between mt-1 ' >
                            <p className=' text-[#E35C1B] ' >8,333.33</p> 
                            <button className=' text-[#069046] ' >Pay Now</button>
                        </div>
                    </div>
                    <div className=' py-[8px] border-[#E35C1B] border-b ' >
                        <p className=' font-normal text-sm ' >Jul 18th 2023</p>
                        <div className=' flex items-center text-sm text-[#979494] font-normal justify-between mt-1 ' >
                            <p className=' text-[#E35C1B] ' >8,333.33</p> 
                            <button className=' text-[#069046] ' >Pay Now</button>
                        </div>
                    </div>
                    <div className=' py-[8px] border-[#E35C1B] border-b ' >
                        <p className=' font-normal text-sm ' >Aug 18th 2023</p>
                        <div className=' flex items-center text-sm text-[#979494] font-normal justify-between mt-1 ' >
                            <p className=' text-[#E35C1B] ' >8,333.33</p> 
                            <button className=' text-[#069046] ' >Pay Now</button>
                        </div>
                    </div>
                    <div className=' py-[8px] border-[#E35C1B] border-b ' >
                        <p className=' font-normal text-sm ' >Sept 18th 2023</p>
                        <div className=' flex items-center text-sm text-[#979494] font-normal justify-between mt-1 ' >
                            <p className=' text-[#E35C1B] ' >8,333.33</p> 
                            <button className=' text-[#069046] ' >Pay Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 