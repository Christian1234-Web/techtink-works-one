import React from 'react'
import PageLabel from './components/PageLabel';
import MenuLayout from '../MenuLayout';
import SideBar from './components/SideBar';

type props = {
    children: React.ReactNode;   
    menu: boolean
};

export default function DashboardLayout({ children, menu }: props) { 
    return (
        <MenuLayout menu={menu} category={false} > 
            <div className=' w-full lg:flex flex-col hidden h-[80px]' >
                <div className=' fixed bg-white z-[50] top-[89px] w-full ' >
                    <PageLabel /> 
                </div>
            </div>
            <div className=' w-full flex px-4 lg:px-[108px] py-8 lg:py-12 bg-white lg:bg-[#F5F5F5] ' >
                <div className=' lg:flex flex-col hidden lg:w-fit ' >
                    <SideBar />
                </div>
                <div className=' w-full lg:pl-[35px] ' >
                    {children}
                </div>
            </div>
        </MenuLayout>
    )
}
