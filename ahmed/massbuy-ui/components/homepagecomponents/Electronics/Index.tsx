import React from 'react'
import { Image } from '@chakra-ui/react'
import CategoryLabel from '../../CategoryLabel'
import { getProducts } from '../../../services'
import { toast } from 'react-hot-toast'
import { cashFormat } from '../../utils/cashFormat'
 
type props = {
    label: boolean,
    category: string
}

export default function Electronic({label, category}: props) {

    const [isHover, setIsHover] = React.useState(-1)

    const [data, setData] = React.useState([] as any) 

    const Items = [
        {
            name: "Fridge",
            image: "/images/items/e1.png"
        },
        {
            name: "Smart Phone",
            image: "/images/items/e2.png"
        },
        {
            name: "Iron",
            image: "/images/items/e3.png"
        },
        {
            name: "Iron",
            image: "/images/items/e4.png"
        },
        {
            name: "Iron",
            image: "/images/items/e4.png"
        },
    ] 

    React.useEffect(() => {  
        (async () => {
            try {
            const response = await getProducts({
                category: category
            });  
            console.log(response,'data')
            // setData(response);
            } catch (err) { 
                toast.error("Error occured");
            }
            // setLoading(false);
        })(); 
    }, [category]);

    return (
        <div className=' w-full ' >
            {/* <div className=' w-full h-[60px] flex text-white justify-between items-center bg-[#790252] pl-[32px] pr-[55px] ' >
                <p className=' font-bold text-2xl ' >Electronic</p>
                <button className=' font-semibold ' >See all {" >"}</button>
            </div> */}

            {/* <CategoryLabel color='790252' label={label} title="Electronic" /> */}
            <div className=' w-full grid grid-cols-2 lg:grid-cols-5 gap-5 px-4 lg:px-8 py-6 lg:py-12' >
                {data?.map((item: any, index: number)=> {
                    return( 
                        <div key={index} onMouseOver={()=> setIsHover(index)} onMouseOut={()=> setIsHover(-1)} style={isHover === index ? {boxShadow: "0px 0px 10px 0px #E35C1B4D"}:{boxShadow: "0px 0px 2px 0px #00000040"}} className=' w-full rounded-[5px] px-[11px] py-[15px]  ' >
                            <Image src={item?.image}  className=' object-contain h-[189px] lg:h-[242px] ' alt={item?.name} />
                            <div className='mt-4 lgml-2 ' >
                                <p className=' font-medium text-sm ' >{item?.itemName}</p>
                                <p className='  font-bold ' >{cashFormat(item?.price)}</p>
                                <p className=' font-bold text-[#E35C1B] ' >5.5<span className=' ml-2 font-normal text-base text-black ' >daily</span> </p>
                            </div>
                        </div> 
                    )
                })}
            </div>
        </div>
    )
}  