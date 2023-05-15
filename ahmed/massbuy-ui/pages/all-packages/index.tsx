import React from 'react'
import MenuLayout from '../../components/MenuLayout'
import Packages from '../../components/homepagecomponents/Packages'

export default function Index() {
    return (
        <MenuLayout menu={false} category={true} >
            <div className=' w-full mt-4 lg:mt-12 ' >
                <Packages title='Groceries' label={true} />
            </div>
        </MenuLayout>
    )
} 