import { useDisclosure, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Modal, Image } from '@chakra-ui/react'
import React from 'react'

type props = {
    isOpen: boolean
    setIsOpen: any
}

export default function PaymentModal({isOpen, setIsOpen}: props ) { 

    const [paymentMethod, setPaymentMethod] = React.useState(0)

    const clickHandler =(item: any)=> {
        if(paymentMethod === item) { 
            setPaymentMethod(0)
        } else { 
            setPaymentMethod(item)
        }
    }
    
    return (  
        <Modal onClose={setIsOpen} size="2xl" isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader className=' text-center mt-6' >Select any payment option</ModalHeader>
                {/* <ModalCloseButton /> */}
                <ModalBody className=' flex flex-col items-center ' > 
                    <div className=' px-10 w-full ' > 
                        <p className=' font-normal ' >Use one of the payment option below to pay ₦ 8,333.33 to Massbuy Ltd</p>
                        <div className=' pt-7 pb-7 w-full flex justify-between ' >
                            <div className=' flex items-center ' >
                                <button onClick={()=> clickHandler(1)} className=' w-5 h-5 rounded-full flex p-[3px] justify-center items-center border border-black mr-4 ' >
                                    {paymentMethod === 1 && (
                                        <div className=' w-full h-full rounded-full bg-black ' />
                                    )}
                                </button>
                                <div className=' w-5' >
                                    <Image src='/images/icon/wallet.svg' alt='wallet' height="14px" />
                                </div>
                                <p className=' ml-5 font-normal text-[15px] ' >Pay from wallet</p>
                            </div>
                            <p className=' font-bold text-lg text-[#0088FE] ' >Balance: <span>₦0</span></p>
                        </div>
                        <div className=' flex pb-7 items-center ' >
                            <button onClick={()=> clickHandler(2)} className=' w-5 h-5 rounded-full flex p-[3px] justify-center items-center border border-black mr-4 ' >
                                {paymentMethod === 2 && (
                                    <div className=' w-full h-full rounded-full bg-black ' />
                                )}
                            </button>
                            <div className=' w-5' >
                                <Image src='/images/icon/card.svg' alt='card' height="14px" />
                            </div>
                            <p className=' ml-5 font-normal text-[15px] ' >Pay online with paystack</p>
                        </div>
                        <div className=' flex pb-7 items-center ' >
                            <button onClick={()=> clickHandler(3)} className=' w-5 h-5 rounded-full flex p-[3px] justify-center items-center border border-black mr-4 ' >
                                {paymentMethod === 3 && (
                                    <div className=' w-full h-full rounded-full bg-black ' />
                                )}
                            </button>
                            <div className=' w-5' >
                                <Image src='/images/icon/bank.svg' alt='bank' height="14px" /> 
                            </div>
                            <p className=' ml-5 font-normal text-[15px] ' >Bank transfer, deposit & POS </p>
                        </div> 
                    </div>
                        <button onClick={()=> setIsOpen(false)} className=' mt-8 rounded-md w-[200px] text-[15] bg-[#069046] h-[40px] font-semibold text-white ' >Continue</button> 
                </ModalBody>
                <ModalFooter>
                {/* <Button onClick={()=> setIsOpen(false)}>Close</Button> */}
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
} 