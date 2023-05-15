import React from 'react'
import { CategoryData } from '../../../assets/dataBank' 
import { Image } from '@chakra-ui/react' 

export default function IconComponent(props: any) {
    return(
        <>
            {
                CategoryData.map((item: string, index: number) => {
                    if(item === props.name) {
                        return( 
                            <Image key={item} src={"/images/icon/"+(index+1)+".svg"} boxSize="15px" alt={item} />
                        )
                    }
                })
            }
        </>
    )
} 