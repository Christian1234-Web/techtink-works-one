import { Image, useToast } from '@chakra-ui/react'
import Router, { useRouter } from 'next/router'
import React, { useCallback, useEffect } from 'react'
import toast from "react-hot-toast";
import { getCategories, getProducts } from '../../../services';
import { cashFormat } from '../../utils/cashFormat';
import CategoryLabel from '../../CategoryLabel';

type props ={
    title: string, 
    category: string,
    label: string,
}

export default function SingleItem({title, category, label}: any) {

    const [isHover, setIsHover] = React.useState(-1) 
    const navigate = useRouter()
    const [data, setData] = React.useState([] as any) 

    // React.useEffect(() => {  
    //     (async () => {
    //         try {
    //         const response = await getProducts({
    //             category: category._id
    //         });  
            
    //             console.log(response, 'rs')
    //         setData(response);
    //         } catch (err) {
    //         toast.error("Error occured");
    //         }
    //     })(); 
    // }, [category]);
    const fetchCategory = useCallback(async () => {
        try {
            const response = await getProducts({
                category: category._id
            });
             
            // console.log(response, 'rs')
            setData(response);
        } catch (err) {
            toast.error("Error occured");
        }
    }, [category]);

    const clickHandler = (item: any) => {
        console.log(item); 
        navigate.push("/product-details")
        localStorage.setItem("product", item)
    }

    useEffect(() => {
        fetchCategory();
    }, [fetchCategory]);
    return (
        <> 
            {data.length !== 0 && ( 
                <div className=' w-full ' > 
                    <CategoryLabel color='790252' type='single' label={label} title={category?.title} /> 
                    <div className=' w-full grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-5 px-4 lg:px-8 py-4 lg:py-12' >
                        {data?.map((item: any, index: number)=> {
                            return( 
                                <div onClick={()=> clickHandler(item._id)} key={index} onMouseOver={()=> setIsHover(index)} onMouseOut={()=> setIsHover(-1)} style={isHover === index ? {boxShadow: "0px 0px 10px 0px #E35C1B4D"}:{boxShadow: "0px 0px 2px 0px #00000040"}} role="button" className=' w-full lg:py-0 pl-[20px] px-2 py-2 pt-3 lg:h-[170px] cursor-pointer rounded-[5px] flex lg:flex-row flex-col lg:items-center ' >
                                    <div className=' w-fit ' >
                                        <div className=' lg:w-[156px] w-full lg:h-full h-[150px] ' >
                                            <Image src={item?.image} className=" w-full lg:object-contain object-cover lg:h-full  h-[150px] " alt={item?.name} />
                                        </div>
                                    </div>
                                    <div className=' h-full flex flex-col justify-center lg:mt-0 mt-2 lg:ml-[33px] ' >
                                        <p className=' font-medium lg:text-base text-[13px]' >{item?.itemName.length > 20 ? (item?.itemName).slice(0, 20)+"...": item?.itemName}</p>
                                        <p className='  font-bold text-[13px] lg:text-lg ' >{cashFormat(item?.price)}</p>
                                        <p className=' font-bold text-[13px] lg:text-lg text-[#E35C1B] ' >5.5<span className=' ml-2 font-normal text-base text-black ' >daily</span> </p>
                                    </div>
                                </div> 
                            )
                        })}
                    </div>
                </div>
            )}
        </>
    )
} 