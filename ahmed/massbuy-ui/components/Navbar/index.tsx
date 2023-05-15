import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Image, Input, useDisclosure } from '@chakra-ui/react'
import React from 'react' 
import SearchBar from './components/SearchBar'
import Router from 'next/router'
import CategoryMenu from '../homepagecomponents/CategoryMenu';
import SideBar from '../DashboardLayout/components/SideBar';

type props = {
    menu: boolean
}

export default function Navbar({menu}: props) {

    // const el: any = document.querySelector('html'); 
    const [lastScrollY, setLastScrollY] = React.useState(0);
    const [show, setShow] = React.useState(false)
    const [showModal, setShowModal] = React.useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

    React.useEffect(()=> {
        const el: any = document.querySelector('html'); 
        if(showModal){
            el.style.overflow = 'hidden';
            } else {
            el.style.overflow = 'auto';
        }
    }, [showModal]) 

    const controlNavbar = () => {
        if (typeof window !== 'undefined') { 
          if (window.scrollY > lastScrollY) { // if scroll down hide the navbar
            setShow(false); 
          } else { // if scroll up show the navbar
            setShow(true);  
          }  
          setLastScrollY(window.scrollY); 
        }
    };

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
          window.addEventListener('scroll', controlNavbar); 
          // cleanup function
          return () => {
            window.removeEventListener('scroll', controlNavbar);
          };
        }
    }, [lastScrollY]);   

    return (
        <nav className=' lg:loginShadow w-full flex px-[18px] lg:px-[35px] h-[70px] lg:h-[89px] justify-between items-center ' >
            <div className=' flex items-center ' >
                {menu && (
                    <button className=' lg:hidden mr-3' onClick={()=> onOpen()} >
                        <div className=' w-[25px] h-[2px] bg-black  ' />
                        <div className=' w-[25px] h-[2px] bg-black mt-[3px] ' />
                        <div className=' w-[25px] h-[2px] bg-black mt-[3px] ' />
                        {/* <div className=' w-[25px] h-[2px] bg-black mt-[3px] ' /> */}
                    </button>
                )}
                <button onClick={()=> Router.push("/")} className={menu ? ' hidden lg:flex items-center ': ' flex items-center '} >
                    <Image src="/images/logo.svg" alt='logo' className=' h-[12px] lg:h-[15px] ' />
                    <Image src="/images/massbuy.svg" className=' ml-1 h-[14px] lg:h-[18px] ' alt='logo' />
                </button>
            </div>
            <div className=' hidden lg:flex items-center mx-auto ' >
                <SearchBar />
                <button className=' w-[74px] h-[39px] rounded-[5px] font-medium bg-[#FE7062] text-white text-sm ml-2 ' >Search</button>
            </div>
            <div className=' hidden lg:flex items-center ml-auto mr-12 ' > 
                <button onClick={()=> Router.push("/login")} className=' text-sm font-semibold ' >Login/Sign up</button>
                <button onClick={()=> Router.push("/create-package")} className=' text-sm font-semibold ml-6 flex items-center ' > 
                    <Image src="/images/icon/12.svg" alt='logo' className=' h-[15px] mr-1 ' />
                    Create Package
                </button> 
                <button onClick={()=> Router.push("/cart")} className=' text-sm font-semibold ml-6 flex items-center ' >
                    <Image src="/images/icon/11.svg" alt='logo' className=' h-[15px] mr-1 ' />
                     Cart
                </button>
                <button className=' ml-6 ' > 
                    <Image src="/images/icon/10.svg" alt='logo' className=' h-[18px] ' />    
                </button> 
            </div>  
            <div className=' lg:hidden flex ml-auto ' >
                <button className=' ' > 
                    <Image src="/images/icon/search.svg" alt='logo' className=' h-[15px] mr-1 ' /> 
                </button> 
                <button className=' ml-6 ' > 
                    <Image src="/images/icon/cart.svg" alt='logo' className=' h-[15px] mr-1 ' /> 
                </button> 
                <button className=' ml-6 ' > 
                    <Image src="/images/icon/bell.svg" alt='logo' className=' h-[18px] ' />    
                </button> 
            </div>
            {show && ( 
                <div style={{boxShadow: "0px -1px 1px 0px #00000033"}} className=' text-xs lg:hidden text-[#434343] font-medium w-full bg-white left-0 right-0 px-[33px] flex justify-between items-center fixed bottom-0 h-[55px] ' >
                    <button className=' flex items-center flex-col ' >
                        <svg width="15" height="15" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 22V7.33333L11 0L22 7.33333V22H13.75V13.4444H8.25V22H0Z" fill="#E35C1B"/>
                        </svg>
                        <p className=' mt-[3px]' >Home</p>
                    </button>
                    <button onClick={()=> Router.push("/create-package")} className=' flex items-center flex-col ' >
                        <svg width="15" height="15" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 0C17.0748 0 22 4.92525 22 11C22 17.0748 17.0748 22 11 22C4.92525 22 0 17.0748 0 11C0 4.92525 4.92525 0 11 0ZM11 5.5C10.8339 5.50001 10.6734 5.56017 10.5481 5.66937C10.4229 5.77857 10.3415 5.92941 10.3189 6.094L10.3125 6.1875V10.3125H6.1875C6.01331 10.3126 5.84564 10.3787 5.71836 10.4976C5.59108 10.6166 5.51368 10.7794 5.50181 10.9531C5.48994 11.1269 5.54447 11.2987 5.6544 11.4339C5.76432 11.569 5.92144 11.6573 6.094 11.6811L6.1875 11.6875H10.3125V15.8125C10.3126 15.9867 10.3787 16.1544 10.4976 16.2816C10.6166 16.4089 10.7794 16.4863 10.9531 16.4982C11.1269 16.5101 11.2987 16.4555 11.4339 16.3456C11.569 16.2357 11.6573 16.0786 11.6811 15.906L11.6875 15.8125V11.6875H15.8125C15.9867 11.6874 16.1544 11.6213 16.2816 11.5024C16.4089 11.3834 16.4863 11.2206 16.4982 11.0469C16.5101 10.8731 16.4555 10.7013 16.3456 10.5661C16.2357 10.431 16.0786 10.3427 15.906 10.3189L15.8125 10.3125H11.6875V6.1875C11.6875 6.00516 11.6151 5.8303 11.4861 5.70136C11.3572 5.57243 11.1823 5.5 11 5.5Z" fill="#434343"/>
                        </svg>
                        <p className=' mt-[3px]' >Create Package</p>
                    </button>
                    <button onClick={()=> Router.push("/login")} className=' flex items-center flex-col ' >
                        <svg width="15" height="15" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.21053 5.21053C5.21053 8.08326 7.54832 10.4211 10.4211 10.4211C13.2938 10.4211 15.6316 8.08326 15.6316 5.21053C15.6316 2.33779 13.2938 0 10.4211 0C7.54832 0 5.21053 2.33779 5.21053 5.21053ZM19.6842 22H20.8421V20.8421C20.8421 16.3738 17.2052 12.7368 12.7368 12.7368H8.10526C3.63579 12.7368 0 16.3738 0 20.8421V22H19.6842Z" fill="#434343"/>
                        </svg>
                        <p className=' mt-[3px]' >Account</p>
                    </button>
                    <button onClick={()=> setShowModal(true)} className=' flex items-center flex-col ' >
                        <svg width="15" height="15" viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.97702 15.9833L0.532613 15.9968L0.458263 2.55255L2.90267 2.53904L2.97702 15.9833ZM11.5662 22.047L9.12183 22.0605L9.00017 0.0608323L11.4446 0.047314L11.5662 22.047ZM20.1081 19.5553L17.6637 19.5688L17.5894 6.12454L20.0338 6.11102L20.1081 19.5553Z" fill="#434343"/>
                        </svg>
                        <p className=' mt-[3px]' >Menu</p>
                    </button>
                </div>
            )}
            <div> 
                <Drawer
                    isOpen={isOpen}
                    placement='left'
                    onClose={onClose} 
                >
                    <DrawerOverlay />
                    <DrawerContent>
                    <DrawerCloseButton /> 
                    <DrawerBody> 
                        <SideBar />
                    </DrawerBody>

                    {/* <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                        Cancel
                        </Button>
                        <Button colorScheme='blue'>Save</Button>
                    </DrawerFooter> */}
                    </DrawerContent>
                </Drawer>
            </div>
            {showModal && (
                <div className=' fixed inset-0 z-50  ' > 
                    <CategoryMenu show={setShowModal} />
                </div>
            )}
        </nav>
    )
} 