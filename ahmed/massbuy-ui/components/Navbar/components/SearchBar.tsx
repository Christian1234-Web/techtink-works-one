import { Image, Input } from '@chakra-ui/react'
import React from 'react'

export default function SearchBar() {

    const [isShown, setIsShown] = React.useState(false)

    return (
        <div className='w-[480px] relative ' >
            <Input height="45px" border="1px solid #D9D9D9" borderRadius="5px" />
            {isShown && ( 
                <div style={{boxShadow: "0px 4px 4px 0px #00000040"}} className=' w-full max-h-[400px] overflow-y-auto px-7 py-2 absolute rounded-[5px] top-[48px] left-0 right-0 bg-white ' >
                    <div className=' my-3 flex items-center ' >
                        <div className=' w-[60px] h-[60px] border rounded-[5px] border-[#eeeded] mr-4 flex justify-center items-center ' >
                            <Image src='/images/items/g1.png' alt='G4' width="45px" />
                        </div>
                        <p className=' font-normal text-black ' >1 liter of groundnut oil</p>
                    </div>
                    <div className=' my-3 flex items-center ' >
                        <div className=' w-[60px] h-[60px] border rounded-[5px] border-[#eeeded] mr-4 flex justify-center items-center ' >
                            <Image src='/images/items/g1.png' alt='G4' width="45px" />
                        </div>
                        <p className=' font-normal text-black ' >1 liter of groundnut oil</p>
                    </div>
                    <div className=' my-3 flex items-center ' >
                        <div className=' w-[60px] h-[60px] border rounded-[5px] border-[#eeeded] mr-4 flex justify-center items-center ' >
                            <Image src='/images/items/g1.png' alt='G4' width="45px" />
                        </div>
                        <p className=' font-normal text-black ' >1 liter of groundnut oil</p>
                    </div>
                </div>
            )}
        </div>
    )
} 