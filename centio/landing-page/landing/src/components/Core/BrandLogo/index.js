import React from 'react'
export default function BrandLogo({logoWhite=false,...rest}){
return(
<>
    {logoWhite ? <img src="image/logo/logo-white.png" alt="brand logo" {...rest}/>:<img src="image/logo/logo-dark.png" alt="brand logo" {...rest}/>}
</>
)
}