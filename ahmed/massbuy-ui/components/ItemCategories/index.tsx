import React from 'react'
import { CategoryTab } from '../../assets/dataBank'
import IconComponent from './IconComponent'

export default function ItemCategories() {

    const [tab, setTab] = React.useState("Electronics")
    const clickHandler =(item: string)=> {
        setTab(item)
    }

    return (
        <div className=' w-full h-full flex items-center bg-[#D2301C] justify-center px-6 ' >
            {CategoryTab.map((item: string, index: number) => {
                return( 
                    <button onClick={()=> clickHandler(item)} key={index} className={item !== tab ? ' w-full flex items-center justify-center bg-[#D2301C] text-white h-[50px] ': ' w-full flex items-center justify-center h-[50px] bg-white text-[#E35C1B]  '} >
                        <IconComponent name={item} active={tab} />
                        <p className=' ml-3 font-bold text-[15px] ' >{item}</p>
                    </button>
                )
            })}
        </div>
    )
}
