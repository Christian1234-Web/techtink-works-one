import React, { Children } from 'react'
import Navbar from '../Navbar';
import Footer from '../Footer';
import ItemCategories from '../ItemCategories';

type Props = {
    children: React.ReactNode;  
    category: boolean,
    menu: boolean
};

export default function MenuLayout({ children, category, menu }: Props) {
    return (
        <div className=' w-full lg:pb-0 pb-[55px] overflow-x-hidden ' >
            <div  className=' w-full h-[70px] lg:h-[89px] ' >  
                <div className=' fixed bg-white z-[50] top-0 w-full ' >
                    <Navbar menu={menu} />
                </div>
            </div>
            {category && ( 
                <div className=' h-[50px] hidden lg:flex ' >
                    <div className=' fixed bg-white z-[50] top-[89px] w-full ' >
                        <ItemCategories />  
                    </div>
                </div>
            )}   
            <div className=' pt-0 w-full h-auto ' > 
                {children}
            </div>
            {!menu && (
                <Footer />
            )}
        </div>
    )
} 