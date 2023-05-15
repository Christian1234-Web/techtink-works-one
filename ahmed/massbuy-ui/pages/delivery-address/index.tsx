import React from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import AllDeliveryAddress from '../../components/DeliveryAddressComponents/AllDeliveryAddress'
import AddDeliveryAddress from '../../components/DeliveryAddressComponents/AddDeliveryAddress'

export default function Delivery() {

    const [isShown, setIsShown] = React.useState(false)

    return (
        <DashboardLayout menu={true}> 
            <div className='' >
                {!isShown && ( 
                    <AllDeliveryAddress add={setIsShown} />
                )}
                {isShown && ( 
                    <AddDeliveryAddress add={setIsShown} />
                )}
            </div>
        </DashboardLayout>
    )
} 