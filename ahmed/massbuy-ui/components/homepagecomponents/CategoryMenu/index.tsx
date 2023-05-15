import React from 'react'
import { CategoryData } from '../../../assets/dataBank'
import IconComponent from '../IconComponent' 

type props = {
    show: Function
}

export default function CategoryMenu({show}: props) {
    return (
        <div style={{boxShadow: "0px 0px 2px 0px #00000040"}} className=' w-[80%] lg:relative fixed bottom-[55px] right-0 lg:w-[240px] bg-white lg:h-[390px] rounded-[10px] flex flex-col pt-0 pl-6 lg:pb-[12px] pb-2 p-[12px] ' >
            {CategoryData.map((item: string) => {
                return(
                    <button onClick={()=> show(false)} key={item} className=' flex text-[15px] items-center py-4 ' >
                        <IconComponent name={item} />
                        <p className={item === "All Categories"  ? ' ml-4 text-[#E35C1B] ' : ' ml-4'} >{item}</p>
                    </button>
                )
            })} 
        </div>
    )
}
