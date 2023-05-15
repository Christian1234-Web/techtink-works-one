import { Image } from '@chakra-ui/react'
import React from 'react'

type props = {
    title: string,
    body: string
}

export default function Index({title, body}: props) {
    return (
        <div className=' w-full flex flex-col py-[66px] items-center ' >
            <Image src='/images/icon/case.svg' width="105px" alt='case' />
            <p className=' font-bold text-xl mt-3 ' >No Active Order.</p>
            <p className=' font-normal text-xs text-center ' >You have not made any purchase recently.</p>
        </div>
    )
} 