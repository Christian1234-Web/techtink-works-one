import React from 'react'
import { CategoryData } from '../../../assets/dataBank'
import IconComponent from '../IconComponent'
import { Image } from '@chakra-ui/react'

export default function HeroSection() {

    return (
        <div className=' flex lg:flex-row flex-col w-full lg:px-[32px] pb-[8px] px-3 lg:pb-[32px]   ' >
            <div className=' w-fit hidden lg:block ' >
                <div style={{boxShadow: "0px 0px 2px 0px #00000040"}} className=' w-[240px]  h-[390px] rounded-[10px] flex flex-col pt-0 pl-6  p-[12px] ' >
                    {CategoryData.map((item: string) => {
                        return(
                            <button key={item} className=' flex text-[15px] items-center mt-[15px] ' >
                                <IconComponent name={item} />
                                <p className={item === "All Categories"  ? ' ml-4 text-[#E35C1B] ' : ' ml-4'} >{item}</p>
                            </button>
                        )
                    })} 
                </div>
            </div>
            <div className=' w-full sm:h-[250px] h-[100px] lg:h-[390px] lg:pl-[23px] ' > 
                <Image alt="Heroimage" src="/images/slider/1.png" className=' w-full sm:h-[250px] h-[100px] lg:h-[390px] object-cover rounded-[10px]  ' />
            </div>
            <div className=' w-full lg:mt-0 mt-[8px] lg:w-fit sm:h-[250px] h-[100px] lg:h-[390px] lg:pl-[23px] ' >
                <div className=' w-full flex lg:flex-col flex-row lg:w-[250px] ' > 
                    <Image alt="Heroimage" src="/images/slider/2.png" className=' w-full sm:h-[250px] h-[100px] lg:h-[185px] lg:mr-0 mr-1 object-cover rounded-[10px]  ' />
                    <Image alt="Heroimage" src="/images/slider/3.png" className=' w-full sm:h-[250px] h-[100px] lg:h-[185px] lg:ml-0 ml-1 lg:mt-[20px] object-cover rounded-[10px]  ' />
                </div>
            </div>
        </div>
    )
} 