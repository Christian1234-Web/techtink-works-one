import React from 'react'
import MenuLayout from '../../components/MenuLayout'
import PackageDetail from './component/PackageDetail'
import OtherProduct from '../../components/OtherProduct'

export default function Index() {
    return (
        <MenuLayout menu={false} category={true} >
            <div className=' w-full bg-[#F5F5F5] pl-[32px] pr-[32px] ' > 
                <div className=' w-full  text-black   pt-6 pb-4  ' >
                    <p className=' font-semibold text-[#979494] ' >Home <span className=' mx-2 font-bold ' >{" > "} </span> Special items <span className=' mx-2 font-bold ' >{" > "} </span>  <span className='' >Christmas</span></p> 
                </div>
                <div className=' w-full flex pb-12 ' >
                    <div className=' w-full pr-5 ' >
                        <PackageDetail />
                    </div>
                    <div className='w-fit' >
                        <div className=' w-[400px] overflow-y-auto ' >
                            <OtherProduct />
                        </div>
                    </div>
                </div>
            </div>
        </MenuLayout>
    )
} 