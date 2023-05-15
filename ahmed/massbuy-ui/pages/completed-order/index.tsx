import React from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import OrderSummary from '../../components/OrderComponents/OrderSummary'

export default function Index() {

    const [viewDetail, setViewDetail] = React.useState(false)
    
    return (
        <DashboardLayout menu={true} >
            <div className=' w-full rounded-[10px] bg-white ' > 
                <OrderSummary detail={setViewDetail}/> 
            </div>
        </DashboardLayout>
    )
} 