import React from 'react'
import MenuLayout from '../../components/MenuLayout'
import OtherProduct from '../../components/OtherProduct'
import CartComponent from './components/CartComponent'

export default function Index() {
    return (
        <MenuLayout menu={false} category={true} >
            <div className=' w-full bg-white lg:bg-[#F5F5F5] pl-4 pr-4 lg:pl-[32px] lg:pr-[32px] ' > 
                <div className=' w-full  text-black lg:flex hidden pt-6 pb-4  ' >
                    <p className=' font-semibold text-[#979494] ' >Home <span className=' mx-2 font-bold ' >{" > "} </span> Groceries <span className=' mx-2 font-bold ' >{" > "} </span>  <span className='' >Christmas</span></p> 
                </div>
                <div className=' w-full flex pb-12 ' >
                    <div className=' w-full lg:pr-5 ' >
                        <CartComponent />
                    </div>
                    <div className=' lg:flex flex-col hidden w-fit' >
                        <div className=' w-[400px] overflow-y-auto ' >
                            <OtherProduct />
                        </div>
                    </div>
                </div>
            </div>
        </MenuLayout>
    )
} 