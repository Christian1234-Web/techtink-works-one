import { Image, Radio, Select, useToast } from '@chakra-ui/react'
import React from 'react'
import { cashFormat } from '../../../components/utils/cashFormat'
import { useAddToCartCallback } from '../../../services/useData'

type props = {
    data: any,
    productId: any
}

export default function ProductDetail({ data, productId }:props) {

    const [itemNumber, setItemNumber] = React.useState(1)
    const toast = useToast()
    const { handleAddToCart } = useAddToCartCallback();
    const [tab, setTab] = React.useState(0) 
    const [loading, setLoading] = React.useState(false); 
    const [user_id, setUserId] = React.useState("");  

    React.useEffect(() => {
        setUserId(localStorage.getItem("user")+"");
    }, []);  

    console.log(user_id); 
        
    const submit =async()=> { 
        setLoading(true)
        const response = await handleAddToCart(JSON.stringify({
            product_id: productId,
            user_id: user_id
        }), user_id)   

        if(response?.status === 200){       
            toast({
                title: response?.data?.message ? response?.data?.message : "Added To Cart",
                position: "bottom",
                status: "success",
                isClosable: true,
            })  
            console.log(response);
            

        } else { 
            toast({
                title: response?.data?.message ? response?.data?.message : "Error occured",
                position: "bottom",
                status: "error",
                isClosable: true,
            })  
        } 
        setLoading(false)
    }


    return (
        <div className=' w-full px-4 ' > 
            <div className=' w-full flex items-center lg:flex-row flex-col justify-around lg:py-8  lg:bg-white ' >
                <div className='lg:w-[207px] w-full flex justify-center bg-white lg:p-0 p-[14px] ' >
                    <Image src={data?.image} className=' lg:w-[207px] lg:h-auto h-[250px]  ' alt="TopOne" />
                </div>
                <div className=' bg-white lg:mt-0 mt-6 lg:w-auto lg:py-0 py-6 lg:px-0 px-10 w-full ' >
                    <p className=' font-medium ' >{data?.itemName}</p>
                    <p className=' text-lg font-bold ' >{cashFormat(data?.price)}</p>
                    <div className=' my-3 flex items-center ' >
                        <button className=' w-[20px] h-[20px] bg-[#979494] text-[20px] text-white flex justify-center items-center pb-[2px] font-normal rounded-full ' >-</button>
                        <p className=' mx-5 font-normal text-[13px] ' >{itemNumber}</p>
                        <button className=' w-[20px] h-[20px] bg-[#D3321C] text-[20px] text-white flex justify-center items-center font-normal rounded-full ' >+</button>
                        <p className=' ml-3 font-normal text-[13px] '>( 1 item(s) added )</p>
                    </div>
                    <p className=' font-bold text-[13px] mb-2 '>Duration</p>
                    <Select border=" 1px solid #D9D9D9" width="230px" placeholder='Select duration' >
                        <option>1 month</option>
                        <option>2 month</option>
                        <option>3 month</option>
                        <option>4 month</option>
                        <option>5 month</option>
                        <option>6 month</option>
                        <option>7 month</option>
                        <option>8 month</option>
                    </Select>
                    <p className=' font-bold mt-4 ' >Payment Frequency</p>
                    <div className=' flex justify-between my-2 items-center ' >
                        <p className=' font-normal text-[15px] w-20 ' >Daily</p>
                        <p className=' font-normal text-[15px] ' >{cashFormat(data?.price, 0.25)}</p> 
                        <button onClick={()=> setTab(0)} className={tab === 0 ? ' w-[12px] h-[12px] rounded-full bg-[#069046] border-[1.5px] border-[#069046] ':' w-[12px] h-[12px] rounded-full border-[1.5px] border-black '} >

                        </button>
                    </div>
                    <div className=' flex justify-between my-2 items-center ' >
                        <p className=' font-normal text-[15px] w-20 ' >Weekly</p>
                        <p className=' font-normal text-[15px] ' >{cashFormat(data?.price, 0.5)}</p> 
                        <button onClick={()=> setTab(1)} className={tab === 1 ? ' w-[12px] h-[12px] rounded-full bg-[#069046] border-[1.5px] border-[#069046] ':' w-[12px] h-[12px] rounded-full border-[1.5px] border-black '} >

                        </button>
                    </div>
                    <div className=' flex justify-between my-2 items-center ' >
                        <p className=' font-normal text-[15px] w-20 ' >Monthly</p>
                        <p className=' font-normal text-[15px] ' >{cashFormat(data?.price, 0.8)}</p> 
                        <button onClick={()=> setTab(2)} className={tab === 2 ? ' w-[12px] h-[12px] rounded-full bg-[#069046] border-[1.5px] border-[#069046] ':' w-[12px] h-[12px] rounded-full border-[1.5px] border-black '} >

                        </button>
                    </div>
                    <div className=" mt-6 flex items-center " >
                        <button onClick={()=> submit()} className=' w-full mr-2 rounded-[4px] text-black border border-black font-semibold h-[40px] ' >
                            {loading ? "Loading..." : "Add items"}
                        </button>
                        <button className=' w-full ml-2 rounded-[4px] text-white bg-[#069046] h-[40px] ' >Pay Now</button>
                    </div>
                </div>
            </div>
            {data?.details && (
                <div className=' w-full bg-white py-[26px] px-[14px] lg:px-[43px] mt-6 lg:mt-8 ' >
                    <div className=' border-[#D9D9D9] border-b pb-2 mb-2 ' >
                        <p className=' font-bold ml-2 ' >Product details</p>
                    </div>
                    <p className=' font-normal text-justify text-[15px] ' >{data?.details}</p>
                </div>
            )}
            {data?.feature && (
                <div className=' w-full bg-white py-[26px] px-[14px] lg:px-[43px] mt-6 lg:mt-8 ' >
                    <div className=' border-[#D9D9D9] border-b pb-2 mb-2 ' >
                        <p className=' font-bold ml-2 ' >Feature</p>
                    </div>
                    <p className=' font-normal text-justify text-[15px] ' >{data?.feature}</p>
                </div>
            )}
            {data?.spec && (
                <div className=' w-full bg-white py-[26px] px-[14px] lg:px-[43px]  mt-6 lg:mt-8 ' >
                    <div className=' border-[#D9D9D9] border-b pb-2 mb-2 ' >
                        <p className=' font-bold ml-2 ' >Specification</p>
                    </div>
                    <p className=' font-normal text-justify text-[15px] ' >{data?.spec}</p>
                </div>
            )}
        </div>
    )
} 