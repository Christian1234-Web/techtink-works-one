import { useRouter } from 'next/router'
import React from 'react'
import Link from 'next/link';

type props = {
    color: string,
    title: string,
    label: boolean,
    type?: string
}

export default function CategoryLabel({color, title, label, type} : props) {

    const navigate = useRouter()

    const clickHandler =()=>{
        if(type === "single"){
            navigate.push("/all-products")
            localStorage.setItem("product_id", title)
        } else {
            navigate.push("/all-packages")
        }
    }

    return (
        <div className=' w-full ' > 
            {!label && ( 
                <div className={` w-full h-[60px] flex text-white justify-between items-center bg-[#${color}] lg:pl-[32px] px-6 lg:pr-[55px] `} >
                    <p className=' font-bold lg:text-2xl ' >{title.toUpperCase()}</p>
                    <button onClick={()=> clickHandler()} className=' font-semibold ' >See all {" >"}</button>
                </div>
            )}
            {label && ( 
                <div className=' w-full  text-black  lg:pl-[32px] lg:pt-4 px-6 lg:pr-[55px] ' >
                    <p className=' font-medium lg:flex hidden ' >
                    <Link href="/">Home</Link>
                        <span className=' mx-2 ' >{" > "} </span> <span className=' text-[#E35C1B] ' >{title}</span></p>
                    <p className=' font-bold text-2xl lg:mt-4  ' >{title.toUpperCase()}</p>
                </div>
            )}
        </div>
    )
} 