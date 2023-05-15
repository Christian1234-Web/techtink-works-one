import React from 'react'
import { Image } from '@chakra-ui/react'
import { type } from 'os'
import CategoryLabel from '../../CategoryLabel'
import Router from 'next/router' 

type props = {
    label: boolean
    title: string
}

export default function Packages({label, title}: props) {

    const [isHover, setIsHover] = React.useState(-1)

    const Items = [ "one", "two", "three", "four", "one", "two", "three", "four" ]
    
    return (
        <div className=' w-full ' > 
            <CategoryLabel color='D2301C' label={label} title={title} />

            <div className=' w-full flex overflow-x-auto lg:grid grid-cols-1 lg:grid-cols-4 gap-7 px-4 lg:px-8 py-4 lg:py-12 ' > 
                {Items.map((item: any, index: number)=> {
                    return( 
                        <div key={index} onMouseOver={()=> setIsHover(index)} onMouseOut={()=> setIsHover(-1)} style={isHover === index ? {boxShadow: "0px 0px 10px 0px #E35C1B4D"}:{boxShadow: "0px 0px 2px 0px #00000040"}} className=' w-[500px] lg:w-full rounded-[5px] ' >
                            <div className=' border-b border-[#D9D9D9]  w-[250px] lg:w-full h-[43px] flex justify-between items-center px-4 lg:px-5 ' >
                                <p className=' font-semibold text-sm lg:text-lg' >Food Stuff</p> 
                                <p className=' font-bold  text-sm lg:text-lg text-[#E35C1B] ' >5.5 <span className=' ml-2 font-normal  text-black ' >daily</span> </p>
                            </div>
                            <div className=' w-full px-6 py-2 grid lg:grid-cols-1   ' >
                                <div className=' w-full flex items-center py-4 ' > 
                                    <Image src="/images/items/g1.png" boxSize="49px" alt="g1" /> 
                                    <div className=' ml-6 ' >
                                        <p className=' font-normal text-sm ' >Groundnut oil</p>
                                        <p className=' font-bold ' >2,000</p>
                                    </div>
                                </div>
                                <div className=' w-full flex items-center py-4 ' > 
                                    <Image src="/images/items/g2.png" boxSize="49px" alt="g1" /> 
                                    <div className=' ml-6 ' >
                                        <p className=' font-normal text-sm ' >Tin Tomatoes</p>
                                        <p className=' font-bold ' >2,000</p>
                                    </div>
                                </div>
                                <div className=' w-full flex items-center py-4 ' > 
                                    <Image src="/images/items/g3.png" boxSize="49px" alt="g1" /> 
                                    <div className=' ml-6 ' >
                                        <p className=' font-normal text-sm ' >Maggi</p>
                                        <p className=' font-bold ' >2,000</p>
                                    </div>
                                </div>
                                <div className=' w-full flex items-center py-4 ' > 
                                    <Image src="/images/items/g4.png" boxSize="49px" alt="g1" /> 
                                    <div className=' ml-6 ' >
                                        <p className=' font-normal text-sm ' >Peak Milk</p>
                                        <p className=' font-bold ' >2,000</p>
                                    </div>
                                </div>
                            </div>
                            <div className=' w-full px-6 py-5 ' > 
                                <button onClick={()=> Router.push("/product-details")} className={isHover !== index ? ' w-full text-[#D2301C] border-[#D2301C] border font-semibold text-sm h-[45px] rounded-[5px] ': ' w-full text-white bg-[#FE7062] font-semibold text-sm h-[45px] rounded-[5px]  '} >View Package</button>
                            </div>
                        </div> 
                    )
                })}
            </div>
        </div>
    )
} 