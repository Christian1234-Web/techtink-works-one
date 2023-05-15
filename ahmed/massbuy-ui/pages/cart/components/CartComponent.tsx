import { Select, Image } from '@chakra-ui/react'
import React from 'react'
import PaymentModal from './PaymentModal'
import { getCartById } from '../../../services/useData'
import toast from 'react-hot-toast'

export default function CartComponent() {

    const [itemNumber, setItemNumber] = React.useState(1)
    const [isOpen, setIsOpen] = React.useState(false)

    const [data, setData] = React.useState({} as any)  
    const [user_id, setUserId] = React.useState(""); 
    const [loading, setLoading] = React.useState(true); 

    React.useEffect(() => {
        setUserId(localStorage.getItem("user")+"");
    }, []);  

    console.log(user_id);
    console.log(data);
    

    React.useEffect(() => { 
      (async () => {
          try { 
          const response = await getCartById(user_id); 
            setData(response);  

            
            setLoading(false)
          } catch (err) {
            toast.error("Error occured");
          } 
      })(); 
    }, [user_id]); 

    return (
        <> 
            {loading && (
                <div className=' w-full pt-32 text-2xl flex justify-center font-Inter-ExtraBold ' >
                    Loading ....
                </div>
            )}
            {!loading && ( 
                <div className=' w-full h-full items-center flex flex-col lg:px-6 pb-10 bg-white' >  
                    <div className=' w-full flex lg:flex-row flex-col lg:items-center lg:border-b lg:pb-3 pb-4 py-3 lg:px-4 lg:border-[#D9D9D9] ' > 
                        <div className=' w-full border-b lg:border-none py-3  border-[#D9D9D9]  '> 
                            <p className=' font-semibold text-[15px] ' >Christmas</p>
                        </div>
                        <p className=' lg:font-bold lg:text-[13px] lg:mb-0 mb-2 lg:mt-0 mt-4 lg:ml-12 lg:mr-3 ' >Duration</p>
                        <div className=' lg:w-[180px] w-full ' >
                            <Select border=" 1px solid #D9D9D9" height="35px" fontSize="sm" placeholder='Select duration' >
                                <option>1 month</option>
                                <option>2 month</option>
                                <option>3 month</option>
                                <option>4 month</option>
                                <option>5 month</option>
                                <option>6 month</option>
                                <option>7 month</option>
                                <option>8 month</option>
                                <option>9 month</option>
                                <option>10 month</option>
                                <option>11 month</option>
                                <option>12 month</option>
                            </Select>
                        </div>
                        <button className=' lg:flex items-center justify-center hidden ml-6 border border-[#E35C1B] text-[#E35C1B] bg-white text-[13px] h-[35px] w-[200px] ' >
                            Add More Items
                        </button>
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
                    {/* <div className=' w-full flex items-center my-2 justify-center border lg:border-b lg:border-r-0 lg:border-t-0 lg:border-l-0 py-3 lg:px-4 border-[#D9D9D9] ' > 
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
                    </div>  */}
                    <div className=' w-full flex lg:flex-row flex-col lg:items-center justify-center border-b py-3 px-4 border-[#D9D9D9] ' >
                        <p className=' font-normal text-sm lg:text-lg lg:mr-14' >Items: <span className=' font-bold ' >5</span></p>
                        <p className=' font-normal text-sm lg:mt-0 mt-2 lg:text-lg lg:ml-14  ' >Amount: <span className=' font-bold ' >300,000</span></p>
                    </div>
                    <button onClick={()=> setIsOpen(true)} className=' mt-14 rounded-md w-[200px] text-sm bg-[#069046] h-[40px] font-semibold text-white ' >Pay Now</button>
                    <PaymentModal isOpen={isOpen} setIsOpen={setIsOpen} />
                </div>
            )}
        </>
    )
} 