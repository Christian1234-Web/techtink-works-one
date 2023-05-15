import React from 'react'
import { Image, Radio, Select } from '@chakra-ui/react'

export default function PackageDetail() {

    const [itemNumber, setItwmNumber] = React.useState(1)

    return (
        <div className=' w-full ' > 
            <div className=' w-full bg-white  ' >
                <div className=' w-full flex items-center border-b py-3 px-6 border-[#D9D9D9] ' >
                    <p className=' font-semibold text-[15px] ' >Christmas</p>
                    <p className=' ml-12 text-[#E35C1B] text-[13px] font-bold ' >25 - <span className=' font-normal text-[15px] text-black ' >Daily</span></p>
                    <button className=' ml-12 border border-[#E35C1B] text-[#E35C1B] bg-white text-[13px] h-[26px] w-[120px] ' >
                        Edit Package
                    </button>
                    <button className=' ml-6 bg-[#E35C1B] text-white text-[13px] h-[26px] w-[152px] ' >
                        Add Package To Cart
                    </button>
                </div>
                <div className=' w-full flex items-center justify-around px-10 py-6' > 
                    <div className=' w-full flex justify-center ' > 
                        <div className=' w-[300px] h-[300px] overflow-y-auto px-6 py-2 ' >
                                <div className=' w-full flex py-4 ' > 
                                    <Image src="/images/items/g1.png" boxSize="49px" alt="g1" /> 
                                    <div className=' ml-6 ' >
                                        <p className=' font-normal text-sm ' >Groundnut oil</p>
                                        <p className=' font-bold ' >2,000</p>
                                    </div>
                                </div>
                                <div className=' w-full flex py-4 ' > 
                                    <Image src="/images/items/g2.png" boxSize="49px" alt="g1" /> 
                                    <div className=' ml-6 ' >
                                        <p className=' font-normal text-sm ' >Tin Tomatoes</p>
                                        <p className=' font-bold ' >2,000</p>
                                    </div>
                                </div>
                                <div className=' w-full flex py-4 ' > 
                                    <Image src="/images/items/g3.png" boxSize="49px" alt="g1" /> 
                                    <div className=' ml-6 ' >
                                        <p className=' font-normal text-sm ' >Maggi</p>
                                        <p className=' font-bold ' >2,000</p>
                                    </div>
                                </div>
                                <div className=' w-full flex py-4 ' > 
                                    <Image src="/images/items/g4.png" boxSize="49px" alt="g1" /> 
                                    <div className=' ml-6 ' >
                                        <p className=' font-normal text-sm ' >Peak Milk</p>
                                        <p className=' font-bold ' >2,000</p>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <div className=' w-full flex items-center ' >
                        <Image src='/images/items/g1.png' className=' ' alt="TopOne" width="207px" />
                        <div className=' ml-8 ' >
                            <p className=' font-medium ' >1 liter of groundnut oil</p>
                            <p className=' text-lg font-bold ' >100,000</p>  
                            <p className=' text-[#E35C1B] text-lg font-bold ' >5.5 <span className=' font-normal text-[15px] text-black ' >daily</span></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className=' w-full bg-white py-[26px] px-[43px] mt-8 ' >
                <div className=' border-[#D9D9D9] border-b pb-2 mb-2 ' >
                    <p className=' font-bold ml-2 ' >Product details</p>
                </div>
                <p className=' font-normal text-justify text-[15px] ' >All-screen design. Beauty all round.
                    iPad Air lets you immerse yourself in whatever you’re reading, watching or creating. The 10.9-inch Liquid Retina display features advanced technologies like True Tone, P3 wide colour and an anti-reflective coating.(1)
                    Touch ID is built into the top button, so you can use your fingerprint to unlock your iPad, sign in to apps and make payments securely with Apple Pay. And iPad Air comes in five gorgeous colours.</p>
            </div>
            <div className=' w-full bg-white py-[26px] px-[43px] mt-8 ' >
                <div className=' border-[#D9D9D9] border-b pb-2 mb-2 ' >
                    <p className=' font-bold ml-2 ' >Feature</p>
                </div>
                <p className=' font-normal text-justify text-[15px] ' >All-screen design. Beauty all round.
                    iPad Air lets you immerse yourself in whatever you’re reading, watching or creating. The 10.9-inch Liquid Retina display features advanced technologies like True Tone, P3 wide colour and an anti-reflective coating.(1)
                    Touch ID is built into the top button, so you can use your fingerprint to unlock your iPad, sign in to apps and make payments securely with Apple Pay. And iPad Air comes in five gorgeous colours.</p>
            </div>
            <div className=' w-full bg-white py-[26px] px-[43px] mt-8 ' >
                <div className=' border-[#D9D9D9] border-b pb-2 mb-2 ' >
                    <p className=' font-bold ml-2 ' >Specification</p>
                </div>
                <p className=' font-normal text-justify text-[15px] ' >All-screen design. Beauty all round.
                    iPad Air lets you immerse yourself in whatever you’re reading, watching or creating. The 10.9-inch Liquid Retina display features advanced technologies like True Tone, P3 wide colour and an anti-reflective coating.(1)
                    Touch ID is built into the top button, so you can use your fingerprint to unlock your iPad, sign in to apps and make payments securely with Apple Pay. And iPad Air comes in five gorgeous colours.</p>
            </div>
        </div>
    )
} 